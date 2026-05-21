let isRunning = false;
let km = 120.50;
let dieselAtual = 0;
let aguaAtual = 0;
let cargaAtual = 0;
let motorQueimou = false;

function carregarDadosIniciais() {
    dieselAtual = parseFloat(document.getElementById("in-diesel").value) || 0;
    aguaAtual = parseFloat(document.getElementById("in-agua").value) || 0;
    cargaAtual = parseFloat(document.getElementById("in-carga").value) || 0;
    
    // Alinha os dados inseridos nas barras do painel na hora
    atualizarPainelUI();
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
}

function atualizarPainelUI() {
    // Atualização de Combustível
    document.getElementById("val-diesel-l").innerText = dieselAtual.toFixed(1);
    let pDiesel = modAtivo.tanque > 0 ? (dieselAtual / modAtivo.tanque) * 100 : 0;
    pDiesel = Math.min(100, Math.max(0, pDiesel));
    document.getElementById("val-diesel-pct").innerText = Math.round(pDiesel);
    document.getElementById("bar-diesel").style.width = pDiesel + "%";

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
    v += (Math.random() * 1.5 - 0.75); // Flutuação real de velocidade
    if (v < 0) v = 0;
    document.getElementById("val-vel").innerText = v.toFixed(1);

    // Avanço de KM e simulação matemática de GPS
    km += (v / 3600);
    document.getElementById("val-km").innerText = km.toFixed(2);
    document.getElementById("val-gps").innerText = `Lat: -23.${(3142+km*10).toFixed(0)} | Lon: -51.${(4125+km*10).toFixed(0)}`;

    // Gasto dos Fluidos sob esforço de carga
    dieselAtual -= (0.005 + (pesoExtra * 0.002));
    aguaAtual -= 0.003;
    if(dieselAtual < 0) dieselAtual = 0;
    if(aguaAtual < 0) aguaAtual = 0;

    // Se a máquina estiver andando, a colheitadeira colhe grãos (aumenta carga)
    if(catAtiva === 'colheitadeira' && v > 0) {
        cargaAtual += Math.round(cultura === "milho" ? 5 : 3);
        if(cargaAtual > modAtivo.carga) cargaAtual = modAtivo.carga;
    }

    atualizarPainelUI();

    // Temperatura do motor simulada por carga
    let temp = 82 + (pesoExtra * 2) + (Math.random() * 15);
    document.getElementById("val-temp").innerText = Math.round(temp);
    document.getElementById("bar-temp").style.width = Math.min(100, (temp/120)*100) + "%";

    const sTemp = document.getElementById("status-temp");
    if(temp > 98) {
        sTemp.innerText = "🚨 ALTO RISCO";
        sTemp.style.color = "#e74c3c";
    } else {
        sTemp.innerText = "ESTÁVEL";
        sTemp.style.color = "#2ecc71";
    }

    if(temp >= 102) {
        motorQueimou = true;
        document.getElementById("aviso-calor").style.display = "block";
        toggleSimulacao();
    }
}

function resetarMotor() {
    motorQueimou = false;
    document.getElementById("aviso-calor").style.display = "none";
    document.getElementById("val-temp").innerText = "85";
    document.getElementById("bar-temp").style.width = "60%";
}

setInterval(simular, 1000);