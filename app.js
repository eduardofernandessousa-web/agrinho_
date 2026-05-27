let isRunning = false;
let motorFundido = false;
let segs = 0;
let dieselL = 0, cargaKg = 0;
let lat = -23.3100, lon = -51.4100;
let hectares = 0, custoTotal = 0, ganhoBruto = 0, lucroLiquido = 0, sacas = 0, co2Total = 0;
let temp = 85, clima = 0;

function toggleAjuda() {
    const p = document.getElementById("painel-ajuda");
    p.style.display = p.style.display === "none" ? "block" : "none";
}

// NOVO SISTEMA DE IDIOMA BASEADO EM DATA-ATTRIBUTES (A prova de falhas)
function mudarIdioma(lang) {
    idiomaAtivo = lang;
    const elementos = document.querySelectorAll("[data-i18n]");
    elementos.forEach(el => {
        const chave = el.getAttribute("data-i18n");
        if (dicionario[lang] && dicionario[lang][chave]) {
            el.innerText = dicionario[lang][chave];
        }
    });
    registrarLog(`SISTEMA: Idioma alterado para [${lang.toUpperCase()}]`);
}

function registrarLog(msg) {
    const log = document.getElementById("log-box");
    if(!log) return;
    const h = new Date().toLocaleTimeString();
    log.innerHTML += `<br>[${h}] ${msg}`;
    log.scrollTop = log.scrollHeight;
}

function trocarCategoria(cat) {
    const sel = document.getElementById("sel-modelo");
    sel.innerHTML = "";
    frota[cat].forEach((m, i) => {
        sel.innerHTML += `<option value="${i}">${m.nome}</option>`;
    });
    mudarModelo(0);
}

function mudarModelo(idx) {
    const cat = document.getElementById("sel-tipo").value;
    modAtivo = frota[cat][idx];
    document.getElementById("max-diesel").innerText = modAtivo.tanque;
    atualizarUI();
}

function carregarDadosIniciais() {
    dieselL = parseFloat(document.getElementById("in-diesel").value) || 300;
    cargaKg = parseFloat(document.getElementById("in-carga").value) || 1000;
    custoTotal = 0; ganhoBruto = 0; lucroLiquido = 0; segs = 0; hectares = 0; sacas = 0; temp = 85; co2Total = 0;
    registrarLog(">> Link IoT Estabelecido. Barramento CAN Ativo.");
    atualizarUI();
}

function toggleSimulacao() {
    if(motorFundido) return;
    isRunning = !isRunning;
    const btn = document.getElementById("btn-start");
    btn.innerText = isRunning ? "⏸ STOP" : "▶ START";
    btn.style.background = isRunning ? "#e74c3c" : "#2ecc71";
}

function mudarClima() {
    clima = clima === 0 ? 1 : 0;
    document.getElementById("val-clima").innerText = clima === 0 ? "SOL" : "CHUVA";
    registrarLog(clima === 1 ? "⚠️ Sensor: Chuva detectada no PR. Patinagem de pneu ativa." : "Sensor: Clima Seco.");
}

function simular() {
    if (!isRunning || motorFundido) return;
    segs++;

    const pDiesel = parseFloat(document.getElementById("in-p-diesel").value) || 6.10;
    const pSaca = parseFloat(document.getElementById("in-p-saca").value) || 128.00;
    const cat = document.getElementById("sel-tipo").value;

    let vel = clima === 0 ? 12 : 5; 
    if (cat === 'pulverizador' && clima === 1) vel = 0; // Pulverização para na chuva
    vel += (Math.random() - 0.5);
    
    if(dieselL <= 0) { 
        vel = 0; 
        registrarLog("❌ Alerta de Telemetria: Pane Seca."); 
        toggleSimulacao(); 
    }
    document.getElementById("val-vel").innerText = Math.max(0, vel).toFixed(1);

    // MOVIMENTAÇÃO GPS DINÂMICA REAL
    let deslocamento = vel / 3600;
    lat += (deslocamento * 0.0001);
    lon += (deslocamento * 0.00008);
    document.getElementById("val-lat").innerText = lat.toFixed(4);
    document.getElementById("val-lon").innerText = lon.toFixed(4);

    // HECTARES TRABALHADOS
    let largura = cat === 'pulverizador' ? 28 : (cat === 'colheitadeira' ? 10 : 4);
    hectares += (deslocamento * largura) / 10;
    document.getElementById("val-ha").innerText = hectares.toFixed(2);

    // EMISSÃO DE CO2 E CONSUMO
    let consumoSg = 0.004 + (cargaKg / 100000);
    dieselL -= consumoSg;
    co2Total += (consumoSg * 2.61); // 2.61 kg de CO2 por litro queimado

    // BALANÇO FINANCEIRO DINÂMICO
    custoTotal += (consumoSg * pDiesel) + 0.01;
    if(vel > 0) {
        if(cat === 'colheitadeira') {
            cargaKg += 3;
            if(segs % 5 === 0) sacas++;
        } else {
            if(segs % 10 === 0) sacas++;
        }
    }
    ganhoBruto = sacas * pSaca;
    lucroLiquido = ganhoBruto - custoTotal;

    // MOTOR TÉRMICO
    temp += (cargaKg / 22000);
    if(clima === 0) temp += 0.01; else temp -= 0.04;
    if(vel === 0) temp -= 0.1;

    if(temp >= 102) {
        motorFundido = true;
        document.getElementById("modal-calor").style.display = "flex";
        toggleSimulacao();
    }

    atualizarUI();
}

function atualizarUI() {
    document.getElementById("val-custo").innerText = custoTotal.toFixed(2);
    document.getElementById("val-ganho").innerText = ganhoBruto.toFixed(2);
    
    const txtLucro = document.getElementById("val-lucro");
    txtLucro.innerText = lucroLiquido.toFixed(2);
    document.getElementById("container-lucro").style.color = lucroLiquido >= 0 ? "#27ae60" : "#c0392b";

    document.getElementById("val-diesel-l").innerText = Math.max(0, dieselL).toFixed(1);
    let pctD = (dieselL / modAtivo.tanque) * 100;
    document.getElementById("val-diesel-pct").innerText = Math.max(0, Math.round(pctD));
    document.getElementById("bar-diesel").style.width = Math.max(0, pctD) + "%";

    document.getElementById("val-temp").innerText = Math.round(temp);
    document.getElementById("bar-temp").style.width = Math.min(100, (temp/120)*100) + "%";
    
    document.getElementById("val-co2").innerText = co2Total.toFixed(2);
    document.getElementById("bar-co2").style.width = Math.min(100, (co2Total / 5) * 100) + "%";

    document.getElementById("val-carga-kg").innerText = Math.round(cargaKg);
    document.getElementById("bar-carga").style.width = Math.min(100, (cargaKg/modAtivo.carga)*100) + "%";
    document.getElementById("val-sacas").innerText = sacas;
}

window.onload = () => {
    trocarCategoria('trator');
    setInterval(simular, 1000);
};