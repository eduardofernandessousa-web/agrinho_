let isRunning = false;
let motorFundido = false;
let segs = 0;
let dieselL = 0, cargaKg = 0;
let lat = -23.3100, lon = -51.4100;
let hectares = 0, custoTotal = 0, sacas = 0;
let temp = 85, clima = 0; // 0: Sol, 1: Chuva

function toggleAjuda() {
    const p = document.getElementById("painel-ajuda");
    p.style.display = p.style.display === "none" ? "block" : "none";
}

function mudarIdioma(lang) {
    idiomaAtivo = lang;
    const t = dicionario[lang];
    for (let id in t) {
        let el = document.getElementById("txt-" + id);
        if (el) el.innerText = t[id];
    }
}

function registrarLog(msg) {
    const log = document.getElementById("log-box");
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
    dieselL = parseFloat(document.getElementById("in-diesel").value);
    cargaKg = parseFloat(document.getElementById("in-carga").value);
    custoTotal = 0; segs = 0; hectares = 0; sacas = 0; temp = 85;
    registrarLog(">> Dados IoT carregados. Sistema pronto.");
    atualizarUI();
}

function toggleSimulacao() {
    if(motorFundido) return;
    isRunning = !isRunning;
    const btn = document.getElementById("btn-start");
    btn.innerText = isRunning ? "⏸ STOP" : "▶ START";
    document.getElementById("status-tag").innerText = isRunning ? dicionario[idiomaAtivo].statusRodando : dicionario[idiomaAtivo].statusParada;
    
    if(!isRunning) gerarRelatorioFinal();
}

function mudarClima() {
    clima = clima === 0 ? 1 : 0;
    document.getElementById("val-clima").innerText = clima === 0 ? "SOL" : "CHUVA";
    registrarLog(clima === 1 ? "ALERTA: Chuva detectada no PR. Solo escorregadio." : "Clima estável.");
}

function simular() {
    if (!isRunning || motorFundido) return;
    segs++;

    const pDiesel = parseFloat(document.getElementById("in-p-diesel").value);
    const pSaca = parseFloat(document.getElementById("in-p-saca").value);
    const cat = document.getElementById("sel-tipo").value;

    let vel = clima === 0 ? 9 : 5;
    vel += (Math.random() - 0.5);
    document.getElementById("val-vel").innerText = vel.toFixed(1);

    // GPS REALISTA
    let distKm = vel / 3600;
    lat += (distKm * 0.0001);
    lon += (distKm * 0.00008);
    document.getElementById("val-lat").innerText = lat.toFixed(4);
    document.getElementById("val-lon").innerText = lon.toFixed(4);

    // HECTARES
    let largura = cat === 'pulverizador' ? 30 : 10;
    hectares += (distKm * largura) / 10;
    document.getElementById("val-ha").innerText = hectares.toFixed(2);

    // FINANCEIRO E CONSUMO
    let consumoSg = 0.005 + (cargaKg / 100000);
    dieselL -= consumoSg;
    custoTotal += (consumoSg * pDiesel) + (0.05); // Diesel + Desgaste

    // PRODUÇÃO
    if(cat === 'colheitadeira') {
        cargaKg += 4;
        if(segs % 10 === 0) sacas++;
    }

    // CALOR
    temp += (cargaKg / 20000);
    if(clima === 0) temp += 0.01; else temp -= 0.02;

    if(temp >= 102) {
        motorFundido = true;
        document.getElementById("modal-calor").style.display = "flex";
        toggleSimulacao();
    }

    atualizarUI();
}

function atualizarUI() {
    document.getElementById("val-custo").innerText = custoTotal.toFixed(2);
    document.getElementById("val-diesel-l").innerText = Math.max(0, dieselL).toFixed(1);
    let pctD = (dieselL / modAtivo.tanque) * 100;
    document.getElementById("val-diesel-pct").innerText = Math.max(0, Math.round(pctD));
    document.getElementById("bar-diesel").style.width = pctD + "%";

    document.getElementById("val-temp").innerText = Math.round(temp);
    document.getElementById("bar-temp").style.width = (temp/120)*100 + "%";
    
    document.getElementById("val-carga-kg").innerText = Math.round(cargaKg);
    document.getElementById("bar-carga").style.width = (cargaKg/modAtivo.carga)*100 + "%";
    document.getElementById("val-sacas").innerText = sacas;
}

function gerarRelatorioFinal() {
    const pSaca = parseFloat(document.getElementById("in-p-saca").value);
    let ganho = sacas * pSaca;
    let lucro = ganho - custoTotal;
    
    registrarLog("--- FECHAMENTO DE SESSÃO ---");
    registrarLog(`Área: ${hectares.toFixed(2)} ha | Sacas: ${sacas}`);
    registrarLog(`Custo Total: R$ ${custoTotal.toFixed(2)}`);
    registrarLog(`Lucro Líquido: R$ ${lucro.toFixed(2)}`);
}

window.onload = () => {
    trocarCategoria('trator');
    setInterval(simular, 1000);
};