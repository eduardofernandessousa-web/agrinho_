let isRunning = false;
let km = 120.50;
let dieselAtual = 0;
let aguaAtual = 0;
let cargaAtual = 0;
let motorQueimou = false;
let co2Total = 0;

// Variáveis para tempo e sacas adicionadas de forma robusta
let segundosTrabalhados = 0;
let sacasColhidasTotal = 0;
let custoAcumuladoDinheiro = 0;

let latBase = -23.3100;
let lonBase = -51.4100;

function registrarLog(msg, tipo = "info") {
    const logContainer = document.getElementById("log-mensagens");
    const classe = `log-${tipo}`;
    const agora = new Date();
    const horaFormatada = agora.toTimeString().split(' ')[0];
    
    logContainer.innerHTML += `<br><span class="sub-info">[${horaFormatada}]</span> <span class="${classe}">[${tipo.toUpperCase()}]</span> ${msg}`;
    logContainer.scrollTop = logContainer.scrollHeight;
}

function carregarDadosIniciais() {
    dieselAtual = parseFloat(document.getElementById("in-diesel").value) || 0;
    aguaAtual = parseFloat(document.getElementById("in-agua").value) || 0;
    cargaAtual = parseFloat(document.getElementById("in-carga").value) || 0;
    
    if(cargaAtual > modAtivo.carga) {
        cargaAtual = modAtivo.carga;
        document.getElementById("in-carga").value