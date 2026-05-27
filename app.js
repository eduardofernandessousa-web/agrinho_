let isRunning = false;
let motorFundido = false;
let segs = 0;
let dieselL = 0, cargaKg = 0;
let lat = -23.3100, lon = -51.4100; // Rolândia/PR
let hectares = 0, custoTotal = 0, ganhoBruto = 0, lucroLiquido = 0, sacas = 0, co2Total = 0;
let temp = 85, clima = 0;

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
    registrarLog(`Idioma alterado para: ${lang.toUpperCase()}`);
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
    registrarLog(">> Dados carregados no Barramento CAN. Sistema pronto.");
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
    registrarLog(clima === 1 ? "⚠️ IoT Warn: Chuva no Paraná detectada. Velocidade adaptada para segurança." : "Clima Estabilizado.");
}

function simular() {
    if (!isRunning || motorFundido) return;
    segs++;

    const pDiesel = parseFloat(document.getElementById("in-p-diesel").value) || 6.10;
    const pSaca = parseFloat(document.getElementById("in-p-saca").value) || 128.00;
    const cat = document.getElementById("sel-tipo").value;

    // MOTOR FÍSICO DE VELOCIDADE
    let vel = clima === 0 ? 12 : 6; // Corta velocidade na chuva (Solo escorregadio)
    if (cat === 'pulverizador' && clima === 1) vel = 0; // Pulverizador não trabalha na chuva!
    vel += (Math.random() * 1 - 0.5); 
    if(dieselL <= 0) { vel = 0; registrarLog("⚠️ Pane Seca! Tanque de Combustível Esgotado."); toggleSimulacao(); }
    document.getElementById("val-vel").innerText = vel.toFixed(1);

    // SISTEMA CORDENADAS GPS DINÂMICO REALISTA (Deslocamento baseado na velocidade)
    let distKm = vel / 3600;
    lat += (distKm * 0.00009);
    lon += (distKm * 0.00007);
    document.getElementById("val-lat").innerText = lat.toFixed(4);
    document.getElementById("val-lon").innerText = lon.toFixed(4);

    // HECTARES TRABALHADOS
    let larguraTrabalho = cat === 'pulverizador' ? 28 : (cat === 'colheitadeira' ? 10 : 4);
    hectares += (distKm * larguraTrabalho) / 10;
    document.getElementById("val-ha").innerText = hectares.toFixed(2);

    // EQUAÇÃO DE CONSUMO E EMISSÃO DE CO2
    let consumoSg = 0.004 + (cargaKg / 120000);
    dieselL -= consumoSg;
    co2Total += (consumoSg * 2.61); // 2.61kg de CO2 por litro queimado

    // SISTEMA FINANCEIRO CORRIGIDO E DINÂMICO
    custoTotal += (consumoSg * pDiesel) + 0.02; // Combustível + depreciação operacional por segundo
    
    if(vel > 0) {
        if(cat === 'colheitadeira') {
            cargaKg += 5;
            if(segs % 6 === 0) sacas++;
        } else {
            // Tratores e pulverizadores geram sacas indiretas pela eficiência da área
            if(segs % 12 === 0) sacas++;
        }
    }
    
    ganhoBruto = sacas * pSaca;
    lucroLiquido = ganhoBruto - custoTotal;

    // SISTEMA DE CALOR
    temp += (cargaKg / 25000);
    if(clima === 0) temp += 0.01; else temp -= 0.03; // Chuva refrigera o bloco
    if(vel === 0) temp -= 0.1; // Parado esfria

    if(temp >= 102) {
        motorFundido = true;
        document.getElementById("modal-calor").style.display = "flex";
        toggleSimulacao();
    }

    atualizarUI();
}

function atualizarUI() {
    // Financeiro
    document.getElementById("val-custo").innerText = custoTotal.toFixed(2);
    document.getElementById("val-ganho").innerText = ganhoBruto.toFixed(2);
    const elLucro = document.getElementById("val-lucro");
    elLucro.innerText = lucroLiquido.toFixed(2);
    elLucro.style.color = lucroLiquido >= 0 ? "#2ecc71" : "#e74c3c";

    // Combustível
    document.getElementById("val-diesel-l").innerText = Math.max(0, dieselL).toFixed(1);
    let pctD = (dieselL / modAtivo.tanque) * 100;
    document.getElementById("val-diesel-pct").innerText = Math.max(0, Math.round(pctD));
    document.getElementById("bar-diesel").style.width = Math.max(0, pctD) + "%";

    // Temperatura
    document.getElementById("val-temp").innerText = Math.round(temp);
    document.getElementById("bar-temp").style.width = Math.min(100, (temp/120)*100) + "%";
    
    // CO2 Sustentabilidade
    document.getElementById("val-co2").innerText = co2Total.toFixed(2);
    document.getElementById("bar-co2").style.width = Math.min(100, (co2Total / 10) * 100) + "%";

    // Produção
    document.getElementById("val-carga-kg").innerText = Math.round(cargaKg);
    document.getElementById("bar-carga").style.width = (cargaKg/modAtivo.carga)*100 + "%";
    document.getElementById("val-sacas").innerText = sacas;
}

window.onload = () => {
    trocarCategoria('trator');
    setInterval(simular, 1000);
};