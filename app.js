let isRunning = false;
let km = 120.50;
let hectares = 0.00;
let dieselAtual = 0, aguaAtual = 0, cargaAtual = 0;
let motorQueimou = false;
let co2Total = 0, custoAcumuladoDinheiro = 0, segundosTrabalhados = 0, sacasColhidasTotal = 0;
let tempMotor = 85;

// Clima (0: Sol, 1: Chuva, 2: Geada)
let climaEstado = 0; 

function toggleInstrucoes() {
    const p = document.getElementById("painel-instrucoes");
    p.style.display = p.style.display === "none" ? "block" : "none";
}

function mudarIdioma(lang) {
    idiomaAtivo = lang;
    const txts = dicionario[lang];
    for (let id in txts) {
        let el = document.getElementById("txt-" + id);
        if (el) el.innerHTML = txts[id];
    }
    atualizarNomeClima();
    registrarLog("Language: " + lang.toUpperCase(), "ok");
}

function registrarLog(msg, tipo = "info") {
    const log = document.getElementById("log-mensagens");
    const hora = new Date().toTimeString().split(' ')[0];
    log.innerHTML += `<br><span style="opacity:0.7">[${hora}]</span> <span class="log-${tipo}">[${tipo.toUpperCase()}]</span> ${msg}`;
    log.scrollTop = log.scrollHeight;
}

function trocarCategoria(c) {
    catAtiva = c;
    const sel = document.getElementById("seletor-modelo");
    sel.innerHTML = "";
    frota[c].forEach((m, i) => { sel.innerHTML += `<option value="${i}">${m.nome}</option>`; });
    mudarModelo(0);
}

function mudarModelo(index) {
    modAtivo = frota[catAtiva][index];
    document.getElementById("max-diesel").innerText = modAtivo.tanque;
    document.getElementById("val-carga-max").innerText = modAtivo.carga;
}

function carregarDadosIniciais() {
    dieselAtual = parseFloat(document.getElementById("in-diesel").value) || 0;
    cargaAtual = parseFloat(document.getElementById("in-carga").value) || 0;
    if(cargaAtual > modAtivo.carga) cargaAtual = modAtivo.carga;
    
    segundosTrabalhados = 0; hectares = 0; sacasColhidasTotal = 0; tempMotor = 85;
    document.getElementById("val-ha").innerText = "0.00";
    registrarLog("Dados carregados com sucesso.", "ok");
}

function toggleSimulacao() {
    if(motorQueimou) return;
    isRunning = !isRunning;
    const btn = document.getElementById("btn-start");
    btn.innerText = isRunning ? "⏸ STOP" : "▶ START";
    btn.style.background = isRunning ? "#e74c3c" : "#27ae60";
    document.getElementById("status-tag").innerText = isRunning ? dicionario[idiomaAtivo].statusRodando : dicionario[idiomaAtivo].statusParada;
}

function mudarClimaManualmente() {
    climaEstado = (climaEstado + 1) % 3;
    atualizarNomeClima();
    if(climaEstado === 1) registrarLog(dicionario[idiomaAtivo].msgChuvaAlerta, "warn");
}

function atualizarNomeClima() {
    const txts = dicionario[idiomaAtivo];
    const nomes = [txts.climaSol, txts.climaChuva, txts.climaGeada];
    document.getElementById("val-clima").innerText = nomes[climaEstado];
}

function chamarManutencao() {
    if(!isRunning || motorQueimou) return;
    tempMotor -= 15;
    if(tempMotor < 85) tempMotor = 85;
    custoAcumuladoDinheiro += 500; // Custo do mecânico
    registrarLog(dicionario[idiomaAtivo].msgManutencao, "info");
}

function simular() {
    if (!isRunning || motorQueimou) return;
    segundosTrabalhados++;
    
    const txts = dicionario[idiomaAtivo];
    const pesoExtra = cargaAtual / 1000; 
    let vBase = 8 + (Math.random() * 2 - 1);
    
    // Efeito Clima
    if(climaEstado === 1) { // Chuva
        vBase *= 0.6; // Solo escorregadio
        if(catAtiva === 'pulverizador') vBase = 0; // Não pulveriza na chuva
    } else if(climaEstado === 2) { // Geada
        vBase *= 0.8;
    }
    
    if(dieselAtual <= 0) vBase = 0;
    document.getElementById("val-vel").innerText = vBase.toFixed(1);

    // Movimento e Hectares
    let dist = vBase / 3600;
    km += dist;
    document.getElementById("val-km").innerText = km.toFixed(2);
    
    let larguraTrabalho = catAtiva === 'pulverizador' ? 30 : (catAtiva === 'colheitadeira' ? 12 : 5);
    hectares += (dist * larguraTrabalho) / 10; // Fator de conversão simples para simulação
    document.getElementById("val-ha").innerText = hectares.toFixed(3);

    // Consumo e Patinagem
    dieselAtual -= (0.005 + (pesoExtra * 0.001));
    if(dieselAtual < 0) dieselAtual = 0;
    
    if(cargaAtual > (modAtivo.carga * 0.9) && climaEstado === 1 && Math.random() < 0.1) {
        registrarLog(txts.msgPatinagem, "danger");
    }

    // Colheita
    if(catAtiva === 'colheitadeira' && vBase > 0) {
        cargaAtual += 5;
        if(segundosTrabalhados % 5 === 0) sacasColhidasTotal++;
        if(cargaAtual > modAtivo.carga) cargaAtual = modAtivo.carga;
    }
    document.getElementById("val-sacas-cont").innerText = sacasColhidasTotal;

    // Financeiro e Eco
    let custoSegundo = ((0.005 * 3600) * 6.10) / 3600;
    custoAcumuladoDinheiro += custoSegundo;
    document.getElementById("val-custo").innerText = Math.round(custoAcumuladoDinheiro);
    co2Total += (0.005 * 2.6);
    document.getElementById("val-co2").innerText = co2Total.toFixed(2);

    // Temperatura
    tempMotor += (pesoExtra * 0.02);
    if(climaEstado === 0) tempMotor += 0.01;
    if(vBase === 0) tempMotor -= 0.05;
    
    document.getElementById("val-temp").innerText = Math.round(tempMotor);
    document.getElementById("bar-temp").style.width = Math.min(100, (tempMotor/120)*100) + "%";

    if(tempMotor >= 102) {
        motorQueimou = true;
        document.getElementById("aviso-calor").style.display = "block";
        toggleSimulacao();
    }

    // UI Updates
    document.getElementById("val-diesel-l").innerText = dieselAtual.toFixed(1);
    document.getElementById("val-diesel-pct").innerText = Math.round((dieselAtual/modAtivo.tanque)*100);
    document.getElementById("bar-diesel").style.width = (dieselAtual/modAtivo.tanque)*100 + "%";
    document.getElementById("val-carga-kg").innerText = Math.round(cargaAtual);
    document.getElementById("bar-carga").style.width = (cargaAtual/modAtivo.carga)*100 + "%";
}

function resetarMotor() {
    motorQueimou = false;
    document.getElementById("aviso-calor").style.display = "none";
    tempMotor = 85;
    registrarLog(dicionario[idiomaAtivo].txtBtnReiniciar, "ok");
}

window.addEventListener('DOMContentLoaded', () => {
    trocarCategoria('trator'); mudarIdioma('pt');
    setInterval(simular, 1000);
});