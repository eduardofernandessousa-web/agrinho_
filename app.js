let isRunning = false;
let km = 120.50;
let hectares = 0.00;
let dieselAtual = 0, aguaAtual = 0, cargaAtual = 0;
let motorQueimou = false;
let co2Total = 0, custoAcumuladoDinheiro = 0, segundosTrabalhados = 0, sacasColhidasTotal = 0;
let tempMotor = 85;

// Estado Clima base (0: Sol, 1: Chuva, 2: Geada)
let climaEstado = 0; 
let latBase = -23.3100, lonBase = -51.4100; // Rolândia/PR

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
    if(!log) return;
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
    
    segundosTrabalhados = 0; hectares = 0; sacasColhidasTotal = 0; tempMotor = 85; co2Total = 0; custoAcumuladoDinheiro = 0;
    document.getElementById("val-ha").innerText = "0.00";
    registrarLog("Dados IoT carregados com sucesso.", "ok");
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
    custoAcumuladoDinheiro += 500; // Custo do mecânico no Paraná
    registrarLog(dicionario[idiomaAtivo].msgManutencao, "info");
}

function simular() {
    if (!isRunning || motorQueimou) return;
    segundosTrabalhados++;
    
    const txts = dicionario[idiomaAtivo];
    const pesoExtra = cargaAtual / 1000; 
    let vBase = 8 + (Math.random() * 2 - 1); // km/h
    
    // EFEITO CLIMA AVANÇADO
    if(climaEstado === 1) { // Chuva
        vBase *= 0.55; // Redução severa na terra roxa
        if(catAtiva === 'pulverizador') vBase = 0; // Proibido pulverizar na chuva
    } else if(climaEstado === 2) { // Geada
        vBase *= 0.8;
    }
    
    if(dieselAtual <= 0) vBase = 0;
    document.getElementById("val-vel").innerText = vBase.toFixed(1);

    // MOVIMENTO, GPS E HECTARES
    let distKm = vBase / 3600;
    km += distKm;
    
    // Simulação GPS Rolândia
    latBase += (distKm * 0.0001);
    lonBase += (distKm * 0.00008);
    document.getElementById("val-lat").innerText = latBase.toFixed(4);
    document.getElementById("val-lon").innerText = lonBase.toFixed(4);

    // Cálculo Hectares: Largura de trabalho x Distância
    let larguraTrabalhoHa = catAtiva === 'pulverizador' ? 30 : (catAtiva === 'colheitadeira' ? 12 : 5);
    let areaTrabalhadaSg = (larguraTrabalhoHa * (vBase * 1000 / 3600)) / 10000;
    hectares += areaTrabalhadaSg;
    document.getElementById("val-ha").innerText = hectares.toFixed(3);

    // CONSUMO, CO2 E ALERTA PATINAGEM
    let dieselConsumidoSg = (0.006 + (pesoExtra * 0.0015));
    dieselAtual -= dieselConsumidoSg;
    if(dieselAtual < 0) dieselAtual = 0;
    
    // Risco Patinagem: Pesado + Chuva + Sorte azarada
    if(cargaAtual > (modAtivo.carga * 0.85) && climaEstado === 1 && Math.random() < 0.08) {
        registrarLog(txts.msgPatinagem, "danger");
    }

    // COLHEITA
    if(catAtiva === 'colheitadeira' && vBase > 0) {
        cargaAtual += 6;
        if(segundosTrabalhados % 5 === 0) sacasColhidasTotal++;
        if(cargaAtual > modAtivo.carga) cargaAtual = modAtivo.carga;
    }
    document.getElementById("val-sacas-cont").innerText = sacasColhidasTotal;

    // FINANCEIRO E ECO (CO2)
    let precoDieselAtu = parseFloat(document.getElementById("in-preco-diesel").value) || 6.10;
    custoAcumuladoDinheiro += (dieselConsumidoSg * precoDieselAtu);
    document.getElementById("val-custo").innerText = Math.round(custoAcumuladoDinheiro);
    
    co2Total += (dieselConsumidoSg * 2.61);
    document.getElementById("val-co2").innerText = co2Total.toFixed(2);

    // TEMPERATURA E QUEIMA
    tempMotor += (pesoExtra * 0.03); // Peso frita motor
    if(climaEstado === 0) tempMotor += 0.01; // Sol quente
    if(vBase === 0) tempMotor -= 0.08; // Parada esfria
    
    document.getElementById("val-temp").innerText = Math.round(tempMotor);
    document.getElementById("bar-temp").style.width = Math.min(100, (tempMotor/120)*100) + "%";
    
    const sTemp = document.getElementById("status-temp");
    if(tempMotor > 95) {
        sTemp.innerText = txts.statusRisco; sTemp.style.color = "#e74c3c";
    } else {
        sTemp.innerText = txts.statusEstavel; sTemp.style.color = "#2ecc71";
    }

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