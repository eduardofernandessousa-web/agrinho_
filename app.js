let isRunning = false;
let km = 120.50;
let dieselAtual = 0;
let aguaAtual = 0;
let cargaAtual = 0;
let motorQueimou = false;

// Função Auxiliar para Inserir Logs em Tempo Real na Tela
function registrarLog(msg, tipo = "info") {
    const logContainer = document.getElementById("log-mensagens");
    const classe = `log-${tipo}`;
    const agora = new Date();
    const horaFormatada = agora.toTimeString().split(' ')[0]; // HH:MM:SS
    
    logContainer.innerHTML += `<br><span class="sub-info">[${horaFormatada}]</span> <span class="${classe}">[${tipo.toUpperCase()}]</span> ${msg}`;
    logContainer.scrollTop = logContainer.scrollHeight; // Rola automaticamente para baixo
}

function carregarDadosIniciais() {
    dieselAtual = parseFloat(document.getElementById("in-diesel").value) || 0;
    aguaAtual = parseFloat(document.getElementById("in-agua").value) || 0;
    cargaAtual = parseFloat(document.getElementById("in-carga").value) || 0;
    
    atualizarPainelUI();
    registrarLog(`Carga configurada com sucesso: ${dieselAtual}L Diesel, ${aguaAtual}L Água, ${cargaAtual}kg carga.`, "ok");
    alert("Carga registrada na telemetria! Clique em START.");
}

function toggleSimulacao() {
    if(motorQueimou) return;
    isRunning = !isRunning;
    const btn = document.getElementById("btn-start");
    const tag = document.getElementById("status-tag");
    
    btn.innerText = isRunning ? "⏸ STOP" : "▶ START";
    btn.style.background = isRunning ? "#e74c3c" : "#27ae60";
    tag.innerText = isRunning ? "RODANDO" : "PARADA";
    tag.style.color = isRunning ? "#2ecc71" : "#e74c3c";
    
    if(isRunning) {
        registrarLog(`Transmissão de dados IoT iniciada para ${modAtivo.nome}.`, "info");
    } else {
        registrarLog("Simulação colocada em modo estático (Pause).", "warn");
    }
}

function atualizarCulturaLog() {
    const cult = document.getElementById("sel-cultura").value;
    registrarLog(`Cultura alterada no painel. Novo foco operacional: Alvo - ${cult.toUpperCase()}.`, "info");
}

function atualizarPainelUI() {
    // Atualização de Combustível
    document.getElementById("val-diesel-l").innerText = dieselAtual.toFixed(1);
    let pDiesel = modAtivo.tanque > 0 ? (dieselAtual / modAtivo.tanque) * 100 : 0;
    pDiesel = Math.min(100, Math.max(0, pDiesel));
    document.getElementById("val-diesel-pct").innerText = Math.round(pDiesel);
    document.getElementById("bar-diesel").style.width = pDiesel + "%";

    // Alerta de Combustível Baixo no Log
    if(dieselAtual > 0 && pDiesel < 15 && pDiesel > 14) {
        registrarLog("Tanque de combustível abaixo de 15%. Planejar reabastecimento.", "warn");
    }

    // Atualização de Água / Calda
    document.getElementById("val-agua-l").innerText = aguaAtual.toFixed(1);
    let pAgua = modAtivo.agua > 0 ? (aguaAtual / modAtivo.agua) * 100 : 0;
    pAgua = Math.min(100, Math.max(0, pAgua));
    document.getElementById("val-agua-pct").innerText = Math.round(pAgua);
    document.getElementById("bar-agua").style.width = pAgua + "%";

    // Atualização de Carga Peso
    document.getElementById("val-carga-kg").innerText = cargaAtual;
    let pCarga = modAtivo.carga > 0 ? (cargaAtual / modAtivo.carga) * 100 : 0;
    document.getElementById("bar-carga").style.width = Math.min(100, pCarga) + "%";
}

function simular() {
    if (!isRunning || motorQueimou) return;

    const cultura = document.getElementById("sel-cultura").value;
    const pesoExtra = cargaAtual / 1000; 

    // Velocidade regulada por tipo de colheita escolhida
    let v = cultura === "soja" ? 8 : cultura === "milho" ? 6 : 10;
    v += (Math.random() * 1.5 - 0.75); 
    if (v < 0) v = 0;
    document.getElementById("val-vel").innerText = v.toFixed(1);

    // Avanço de KM e GPS simulado
    km += (v / 3600);
    document.getElementById("val-km").innerText = km.toFixed(2);
    document.getElementById("val-gps").innerText = `Lat: -23.${(3142+km*10).toFixed(0)} | Lon: -51.${(4125+km*10).toFixed(0)}`;

    // Gasto dos Fluidos sob esforço de carga
    let gastoDiesel = (0.005 + (pesoExtra * 0.002));
    dieselAtual -= gastoDiesel;
    aguaAtual -= 0.003;
    if(dieselAtual < 0) dieselAtual = 0;
    if(aguaAtual < 0) aguaAtual = 0;

    // Se for colheitadeira, colhe grãos dinamicamente e aumenta o peso
    if(catAtiva === 'colheitadeira' && v > 0) {
        let graosColhidos = Math.round(cultura === "milho" ? 5 : 3);
        cargaAtual += graosColhidos;
        if(cargaAtual >= modAtivo.carga) {
            cargaAtual = modAtivo.carga;
            if(Math.random() < 0.1) registrarLog("Graneleiro atingiu a capacidade máxima autorizada!", "warn");
        }
    }

    // RECURSO NOVO 2: CÁLCULO FINANCEIRO DINÂMICO (R$/h)
    let custoHoraBase = catAtiva === 'trator' ? 120 : catAtiva === 'colheitadeira' ? 240 : 180;
    // Multiplica o custo se estiver gastando muito diesel devido ao peso pesado da carga
    let custoDinamic = custoHoraBase + (gastoDiesel * 15000) + (cultura === 'milho' ? 30 : 0);
    document.getElementById("val-custo").innerText = Math.round(custoDinamic);
    document.getElementById("bar-custo").style.width = Math.min(100, (custoDinamic/400)*100) + "%";
    
    const txtCusto = document.getElementById("status-custo");
    if(custoDinamic > (custoHoraBase * 1.3)) {
        txtCusto.innerText = "⚠️ OPERAÇÃO DISPENDIOSA (Carga Alta)";
        txtCusto.style.color = "#e67e22";
    } else {
        txtCusto.innerText = "📉 GESTÃO FINANCEIRA EFICIENTE";
        txtCusto.style.color = "#2ecc71";
    }

    atualizarPainelUI();

    // Temperatura suave baseada em física real
    let temp = 82 + (pesoExtra * 0.5) + (Math.random() * 4);
    document.getElementById("val-temp").innerText = Math.round(temp);
    document.getElementById("bar-temp").style.width = Math.min(100, (temp/120)*100) + "%";

    const sTemp = document.getElementById("status-temp");
    if(temp > 98) {
        sTemp.innerText = "🚨 ALTO RISCO";
        sTemp.style.color = "#e74c3c";
        if(Math.random() < 0.15) registrarLog("Alerta térmico! Alta taxa de compressão no bloco.", "danger");
    } else {
        sTemp.innerText = "ESTÁVEL";
        sTemp.style.color = "#2ecc71";
    }

    if(temp >= 102) {
        motorQueimou = true;
        document.getElementById("aviso-calor").style.display = "block";
        registrarLog("SHUTDOWN REMOTO ATIVADO: Superaquecimento crítico detectado.", "danger");
        toggleSimulacao();
    }
}

function resetarMotor() {
    motorQueimou = false;
    document.getElementById("aviso-calor").style.display = "none";
    document.getElementById("val-temp").innerText = "85";
    document.getElementById("bar-temp").style.width = "60%";
    registrarLog("Sistema reinicializado após manutenção preventiva.", "ok");
}

setInterval(simular, 1000);