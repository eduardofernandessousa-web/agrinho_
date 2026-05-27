let isRunning = false;
let km = 120.50;
let dieselAtual = 0;
let aguaAtual = 0;
let cargaAtual = 0;
let motorQueimou = false;
let co2Total = 0;

let segundosTrabalhados = 0;
let sacasColhidasTotal = 0;
let custoAcumuladoDinheiro = 0;

let latBase = -23.3100;
let lonBase = -51.4100;

// Nova função para abrir/fechar as instruções clicando no botão
function toggleInstrucoes() {
    const painel = document.getElementById("painel-instrucoes");
    if (painel.style.display === "none") {
        painel.style.display = "block";
    } else {
        painel.style.display = "none";
    }
}

function mudarIdioma(lang) {
    idiomaAtivo = lang;
    const txts = dicionario[lang];
    
    for (let id in txts) {
        let el = document.getElementById("txt-" + id);
        if (el) {
            el.innerHTML = txts[id];
        }
    }
    
    document.getElementById("status-tag").innerText = isRunning ? txts.statusRodando : txts.statusParada;
    document.getElementById("tit-agua").innerText = (catAtiva === 'pulverizador') ? txts.titCalda : txts.titAgua;
    document.getElementById("lbl-liquido-nome").innerText = (catAtiva === 'pulverizador') ? txts.lblCalda : txts.lblAgua;
    document.getElementById("lbl-status-carga").innerText = modAtivo.txtCarga[idiomaAtivo];
    
    registrarLog("Language switched to: " + lang.toUpperCase(), "ok");
}

function registrarLog(msg, tipo = "info") {
    const logContainer = document.getElementById("log-mensagens");
    if(!logContainer) return;
    const classe = `log-${tipo}`;
    const agora = new Date();
    const horaFormatada = agora.toTimeString().split(' ')[0];
    
    logContainer.innerHTML += `<br><span class="sub-info">[${horaFormatada}]</span> <span class="${classe}">[${tipo.toUpperCase()}]</span> ${msg}`;
    logContainer.scrollTop = logContainer.scrollHeight;
}

function trocarCategoria(c) {
    catAtiva = c;
    const sel = document.getElementById("seletor-modelo");
    if(!sel) return;
    sel.innerHTML = "";
    frota[c].forEach((m, index) => {
        let o = document.createElement("option");
        o.value = index; o.innerText = m.nome;
        sel.appendChild(o);
    });
    mudarModelo(0);
}

function mudarModelo(index) {
    modAtivo = frota[catAtiva][index];
    document.getElementById("max-diesel").innerText = modAtivo.tanque;
    document.getElementById("max-agua").innerText = modAtivo.agua;
    
    const txts = dicionario[idiomaAtivo];
    document.getElementById("tit-agua").innerText = (catAtiva === 'pulverizador') ? txts.titCalda : txts.titAgua;
    document.getElementById("lbl-liquido-nome").innerText = (catAtiva === 'pulverizador') ? txts.lblCalda : txts.lblAgua;
    document.getElementById("lbl-status-carga").innerText = modAtivo.txtCarga[idiomaAtivo];
    
    document.getElementById("val-carga-max").innerText = modAtivo.carga;
    atualizarPainelUI();
}

function carregarDadosIniciais() {
    dieselAtual = parseFloat(document.getElementById("in-diesel").value) || 0;
    aguaAtual = parseFloat(document.getElementById("in-agua").value) || 0;
    cargaAtual = parseFloat(document.getElementById("in-carga").value) || 0;
    
    const txts = dicionario[idiomaAtivo];

    if(cargaAtual > modAtivo.carga) {
        cargaAtual = modAtivo.carga;
        document.getElementById("in-carga").value = modAtivo.carga;
        registrarLog("Overload adjusted to max limit: " + modAtivo.carga + "kg", "warn");
    }

    segundosTrabalhados = 0;
    sacasColhidasTotal = 0;
    custoAcumuladoDinheiro = 0;
    co2Total = 0;
    document.getElementById("val-tempo-job").innerText = "00:00:00";
    document.getElementById("val-sacas-cont").innerText = "0";

    atualizarPainelUI();
    registrarLog(`${txts.logCargaOk} ${dieselAtual}L Diesel, ${aguaAtual}L, ${cargaAtual}kg.`, "ok");
    alert(txts.alertCarga);
}

function formatarTempo(totalSegundos) {
    let hrs = Math.floor(totalSegundos / 3600);
    let mins = Math.floor((totalSegundos % 3600) / 60);
    let segs = totalSegundos % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
}

function toggleSimulacao() {
    if(motorQueimou) return;
    isRunning = !isRunning;
    const btn = document.getElementById("btn-start");
    const tag = document.getElementById("status-tag");
    const txts = dicionario[idiomaAtivo];
    
    btn.innerText = isRunning ? "⏸ STOP" : "▶ START";
    btn.style.background = isRunning ? "#e74c3c" : "#27ae60";
    tag.innerText = isRunning ? txts.statusRodando : txts.statusParada;
    tag.style.color = isRunning ? "#2ecc71" : "#e74c3c";
    
    if(isRunning) {
        registrarLog(`${txts.logIotStart} ${modAtivo.nome}.`, "info");
    } else {
        const precoSaca = parseFloat(document.getElementById("in-preco-saca").value) || 0;
        let faturamentoBruto = sacasColhidasTotal * precoSaca;
        let lucroLiquido = faturamentoBruto - custoAcumuladoDinheiro;

        registrarLog(txts.titResumo, "info");
        registrarLog(`${txts.resTempo} ${formatarTempo(segundosTrabalhados)}`, "ok");
        registrarLog(txts.resColheito.replace("{X}", sacasColhidasTotal), "ok");
        registrarLog(`${txts.resGasto} ${Math.round(custoAcumuladoDinheiro)}`, "danger");
        registrarLog(`${txts.resLucro} ${Math.round(lucroLiquido)}`, lucroLiquido >= 0 ? "ok" : "danger");
    }
}

function atualizarCulturaLog() {
    const cult = document.getElementById("sel-cultura").value;
    const txts = dicionario[idiomaAtivo];
    registrarLog(`${txts.logCulturaAlt} ${cult.toUpperCase()}.`, "info");
}

function atualizarPainelUI() {
    document.getElementById("val-diesel-l").innerText = dieselAtual.toFixed(1);
    let pDiesel = modAtivo.tanque > 0 ? (dieselAtual / modAtivo.tanque) * 100 : 0;
    pDiesel = Math.min(100, Math.max(0, pDiesel));
    document.getElementById("val-diesel-pct").innerText = Math.round(pDiesel);
    document.getElementById("bar-diesel").style.width = pDiesel + "%";

    document.getElementById("val-agua-l").innerText = aguaAtual.toFixed(1);
    let pAgua = modAtivo.agua > 0 ? (aguaAtual / modAtivo.agua) * 100 : 0;
    pAgua = Math.min(100, Math.max(0, pAgua));
    document.getElementById("val-agua-pct").innerText = Math.round(pAgua);
    document.getElementById("bar-agua").style.width = pAgua + "%";

    document.getElementById("val-carga-kg").innerText = Math.round(cargaAtual);
    document.getElementById("val-carga-max").innerText = modAtivo.carga;
    let pCarga = modAtivo.carga > 0 ? (cargaAtual / modAtivo.carga) * 100 : 0;
    document.getElementById("bar-carga").style.width = Math.min(100, pCarga) + "%";
}

function simular() {
    if (!isRunning || motorQueimou) return;

    segundosTrabalhados++;
    document.getElementById("val-tempo-job").innerText = formatarTempo(segundosTrabalhados);

    const cultura = document.getElementById("sel-cultura").value;
    const pesoExtra = cargaAtual / 1000; 
    const txts = dicionario[idiomaAtivo];

    const PRECO_DIESEL = parseFloat(document.getElementById("in-preco-diesel").value) || 6.10;
    const PRECO_INSUMO = 0.05; 

    let v = cultura === "soja" ? 8 : cultura === "milho" ? 6 : 9;
    v += (Math.random() * 1.2 - 0.6); 
    if (v < 0) v = 0;
    document.getElementById("val-vel").innerText = v.toFixed(1);

    let distAndada = (v / 3600); 
    km += distAndada;
    document.getElementById("val-km").innerText = km.toFixed(2);

    latBase += (distAndada * 0.0001);
    lonBase += (distAndada * 0.0001);
    document.getElementById("val-gps").innerText = `Lat: ${latBase.toFixed(4)} | Lon: ${lonBase.toFixed(4)}`;

    let gastoDieselSegundo = (0.004 + (pesoExtra * 0.002));
    let gastoAguaSegundo = catAtiva === 'pulverizador' ? 0.18 : 0.003; 
    
    dieselAtual -= gastoDieselSegundo;
    aguaAtual -= gastoAguaSegundo;
    if(dieselAtual < 0) dieselAtual = 0;
    if(aguaAtual < 0) aguaAtual = 0;

    if(catAtiva === 'colheitadeira' && v > 0) {
        let rendimentoKg = cultura === "milho" ? 6 : cultura === "soja" ? 4 : 3;
        cargaAtual += rendimentoKg;
        
        if(segundosTrabalhados % 5 === 0) { 
            sacasColhidasTotal += Math.round(cultura === "milho" ? 2 : 1);
            document.getElementById("val-sacas-cont").innerText = sacasColhidasTotal;
        }
        if(cargaAtual >= modAtivo.carga) {
            cargaAtual = modAtivo.carga;
        }
    } else if(v > 0 && segundosTrabalhados % 10 === 0) {
        sacasColhidasTotal += 1;
        document.getElementById("val-sacas-cont").innerText = sacasColhidasTotal;
    }

    let custoHoraBase = catAtiva === 'trator' ? 120 : catAtiva === 'colheitadeira' ? 240 : 180;
    let consumoDieselHora = gastoDieselSegundo * 3600;
    let consumoAguaHora = gastoAguaSegundo * 3600;
    let custoDinamic = (consumoDieselHora * PRECO_DIESEL) + (consumoAguaHora * PRECO_INSUMO) + custoHoraBase;
    
    custoAcumuladoDinheiro += (custoDinamic / 3600);
    document.getElementById("val-custo").innerText = Math.round(custoDinamic);
    document.getElementById("bar-custo").style.width = Math.min(100, (custoDinamic/500)*100) + "%";
    
    const txtCusto = document.getElementById("status-custo");
    if(custoDinamic > (custoHoraBase + 120)) {
        txtCusto.innerText = txts.statusDispendiosa;
        txtCusto.style.color = "#e67e22";
    } else {
        txtCusto.innerText = txts.statusEficiente;
        txtCusto.style.color = "#2ecc71";
    }

    let co2EmitidoSegundo = gastoDieselSegundo * 2.6;
    co2Total += co2EmitidoSegundo;
    document.getElementById("val-co2").innerText = co2Total.toFixed(2);
    document.getElementById("bar-eco").style.width = Math.min(100, (co2Total / 50) * 100) + "%";

    const txtEco = document.getElementById("status-eco");
    if (co2Total > 25) {
        txtEco.innerText = txts.statusAltaEmissao;
        txtEco.style.color = "#e67e22";
    } else if (co2Total > 0) {
        txtEco.innerText = txts.statusControlada;
        txtEco.style.color = "#2ecc71";
    }

    atualizarPainelUI();

    let temp = 82 + (pesoExtra * 0.4) + (Math.random() * 3);
    document.getElementById("val-temp").innerText = Math.round(temp);
    document.getElementById("bar-temp").style.width = Math.min(100, (temp/120)*100) + "%";

    const sTemp = document.getElementById("status-temp");
    if(temp > 98) {
        sTemp.innerText = txts.statusRisco;
        sTemp.style.color = "#e74c3c";
    } else {
        sTemp.innerText = txts.statusEstavel;
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
    segundosTrabalhados = 0;
    sacasColhidasTotal = 0;
    custoAcumuladoDinheiro = 0;
    co2Total = 0;
    const txts = dicionario[idiomaAtivo];
    registrarLog(txts.logReset, "ok");
}

window.addEventListener('DOMContentLoaded', () => {
    trocarCategoria('trator');
    mudarIdioma('pt');
    setInterval(simular, 1000);
});