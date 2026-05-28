// app.js

let isRunning = false;
let motorFundido = false;
let segs = 0;
let horasAcumuladas = 0;
let dieselL = 0;
let cargaKg = 0;
let lat = -23.3100; 
let lon = -51.4100;
let hectares = 0;
let custoTotal = 0;
let ganhoBruto = 0;
let lucroLiquido = 0;
let sacas = 0;
let co2Total = 0;
let temp = 85;
let clima = 0; 
let modAtivo = null;
let idiomaAtivo = 'pt';

let objGrafico = null;
let historicoTempo = [];
let historicoLucro = [];

let passoAtual = 0;
let timeoutDigitacao = null;
const falasAssistente = [
    "Olá! Seja bem-vindo ao AGROSTREAM. Eu sou o seu assistente de campo. Você sabe o que é a Telemetria de Máquinas Agrícolas? É uma tecnologia de ponta que conecta sensores IoT instalados nos tratores, colheitadeiras e pulverizadores. Esses sensores coletam dados em tempo real sobre o motor, consumo de combustível, velocidade e localização GPS, transmitindo tudo via satélite ou redes celulares diretamente para o computador ou celular do produtor.",
    "E por que isso é tão revolucionário para o nosso estado? O Paraná é um dos gigantes do agronegócio, mas nossos produtores enfrentam desafios diários: a variação do preço do óleo diesel, janelas de plantio e colheita muito apertadas devido ao clima e a necessidade de proteger nossa rica 'terra roxa' contra a compactação do solo. Sem dados, o gerenciamento da fazenda vira um jogo de adivinhação de alto custo.",
    "É aqui que a telemetria transforma o campo! Com ela, o produtor paranaense consegue rastrear desperdícios de combustível, identificar falhas mecânicas antes que o motor quebre na lavoura, monitorar a eficiência de cada hectare trabalhado e reduzir drasticamente a pegada de carbono. Isso gera uma agricultura de precisão muito mais sustentável e lucrativa, blindando o caixa da propriedade contra crises de mercado.",
    "Este site que você está vendo é um Gêmeo Digital. Desenvolvemos este simulador justamente para demonstrar, de forma visual e prática, como essas variáveis operam juntas. Ajuste os preços da saca de soja para R$ 125 e do diesel para R$ 7, configure a carga e clique em START. Acompanhe o gráfico e veja a telemetria financeira acontecer em tempo real de forma lucrativa!"
];

function toggleAjuda() {
    const p = document.getElementById("painel-ajuda");
    if (p) p.style.display = p.style.display === "none" ? "block" : "none";
}

function mudarIdioma(lang) {
    idiomaAtivo = lang;
    const elementos = document.querySelectorAll("[data-i18n]");
    elementos.forEach(el => {
        const chave = el.getAttribute("data-i18n");
        if (typeof dicionario !== 'undefined' && dicionario[lang] && dicionario[lang][chave]) {
            el.innerText = dicionario[lang][chave];
        }
    });
}

function alternarTema() {
    const html = document.documentElement;
    const atual = html.getAttribute("data-theme");
    const novo = atual === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", novo);
    
    if (objGrafico) {
        const corTexto = novo === "dark" ? "#888888" : "#333333";
        const corGrade = novo === "dark" ? "rgba(128, 128, 128, 0.15)" : "rgba(0, 0, 0, 0.05)";
        objGrafico.options.scales.x.ticks.color = corTexto;
        objGrafico.options.scales.y.ticks.color = corTexto;
        objGrafico.options.scales.y.grid.color = corGrade;
        objGrafico.update();
    }
}

function registrarLog(msg) {
    const log = document.getElementById("log-box");
    if (!log) return;
    const h = new Date().toLocaleTimeString();
    log.innerHTML += `<br>[${h}] ${msg}`;
    log.scrollTop = log.scrollHeight;
}

function trocarCategoria(cat) {
    const sel = document.getElementById("sel-modelo");
    if (!sel) return;
    sel.innerHTML = "";
    if (typeof frota !== 'undefined' && frota[cat]) {
        frota[cat].forEach((m, i) => {
            sel.innerHTML += `<option value="${i}">${m.nome}</option>`;
        });
    }
    mudarModelo(0);
}

function mudarModelo(idx) {
    const selTipo = document.getElementById("sel-tipo");
    if (!selTipo) return;
    const cat = selTipo.value;
    if (typeof frota !== 'undefined' && frota[cat] && frota[cat][idx]) {
        modAtivo = frota[cat][idx];
        const maxD = document.getElementById("max-diesel");
        if (maxD) maxD.innerText = modAtivo.tanque;
    }
    atualizarUI();
}

function carregarDadosIniciais() {
    const inDiesel = document.getElementById("in-diesel");
    const inCarga = document.getElementById("in-carga");
    
    dieselL = inDiesel ? parseFloat(inDiesel.value) : 300;
    cargaKg = inCarga ? parseFloat(inCarga.value) : 500;
    
    if (modAtivo && dieselL > modAtivo.tanque) {
        dieselL = modAtivo.tanque;
        if (inDiesel) inDiesel.value = dieselL;
    }
    
    custoTotal = 0; ganhoBruto = 0; lucroLiquido = 0; segs = 0; horasAcumuladas = 0; hectares = 0; sacas = 0; temp = 85; co2Total = 0;
    motorFundido = false;
    
    const modCalor = document.getElementById("modal-calor");
    if (modCalor) modCalor.style.display = "none";

    historicoTempo = ["0.0h"];
    historicoLucro = [0];
    if (objGrafico) {
        objGrafico.data.labels = historicoTempo;
        objGrafico.data.datasets[0].data = historicoLucro;
        objGrafico.update();
    }

    registrarLog(">> link IoT Estabelecido. Parâmetros sincronizados.");
    atualizarUI();
}

function toggleSimulacao() {
    if (motorFundido) return;
    isRunning = !isRunning;
    const btn = document.getElementById("btn-start");
    if (btn) {
        btn.innerText = isRunning ? "⏸ STOP" : "▶ START";
        btn.style.background = isRunning ? "#e74c3c" : "#2ecc71";
    }
}

function mudarClima() {
    clima = clima === 0 ? 1 : 0;
    const valClima = document.getElementById("val-clima");
    if (valClima) valClima.innerText = clima === 0 ? "SOL" : "CHUVA";
}

function criarGrafico() {
    const canvas = document.getElementById('grafico-telemetria');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    objGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicoTempo,
            datasets: [{
                label: 'Lucro Líquido (R$)',
                data: historicoLucro,
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { display: false }, ticks: { color: '#888888' } },
                y: { grid: { color: 'rgba(128, 128, 128, 0.15)' }, ticks: { color: '#888888' } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

function simular() {
    if (!isRunning || motorFundido) return;

    if (dieselL <= 0) { 
        dieselL = 0;
        registrarLog("❌ Alerta: Pane Seca detectada."); 
        toggleSimulacao(); 
        atualizarUI();
        return; 
    }

    segs++;
    const passoHora = 0.1; 
    horasAcumuladas += passoHora;

    const inPDiesel = document.getElementById("in-p-diesel");
    const inPSaca = document.getElementById("in-p-saca");
    const selTipo = document.getElementById("sel-tipo");
    
    const pDiesel = inPDiesel ? parseFloat(inPDiesel.value) : 7.00;
    const pSaca = inPSaca ? parseFloat(inPSaca.value) : 125.00;
    const cat = selTipo ? selTipo.value : 'trator';

    let vel = clima === 0 ? 12 : 5; 
    if (cat === 'pulverizador' && clima === 1) vel = 0; 
    vel += (Math.random() - 0.5); 
    if (vel < 0) vel = 0;
    
    const valVel = document.getElementById("val-vel");
    if (valVel) valVel.innerText = vel.toFixed(1);

    let deslocamento = vel / 3600; 
    let largura = cat === 'pulverizador' ? 28 : (cat === 'colheitadeira' ? 10 : 4);

    if (vel > 0) {
        lat += (deslocamento * 0.0001);
        lon += (deslocamento * 0.00008);
        hectares += ((deslocamento * largura) / 10) * 8.5;
        sacas += Math.floor(Math.random() * 3) + 3; 
    }
    
    document.getElementById("val-lat").innerText = lat.toFixed(4);
    document.getElementById("val-lon").innerText = lon.toFixed(4);
    document.getElementById("val-ha").innerText = hectares.toFixed(2);

    let consumoBaseHora = modAtivo ? (modAtivo.tanque * 0.015) : 8; 
    let efeitoCarga = (cargaKg / 5000) * 1.2; 
    let consumoPorHoraRealista = consumoBaseHora + efeitoCarga;
    if (vel === 0) consumoPorHoraRealista = 1.5; 

    let consumoDesteCiclo = consumoPorHoraRealista * passoHora;
    dieselL -= consumoDesteCiclo;
    if (dieselL < 0) dieselL = 0;

    co2Total += (consumoDesteCiclo * 2.61); 
    custoTotal += (consumoDesteCiclo * pDiesel);

    ganhoBruto = sacas * pSaca;
    lucroLiquido = ganhoBruto - custoTotal;

    temp += (cargaKg / 25000);
    if (clima === 0) temp += 0.01; else temp -= 0.04;
    if (vel === 0) temp -= 0.1;

    const sTemp = document.getElementById("status-temp");
    if (temp >= 102) {
        temp = 102;
        motorFundido = true;
        if (sTemp) { sTemp.innerText = "CRÍTICO"; sTemp.style.color = "#c0392b"; }
        document.getElementById("modal-calor").style.display = "flex";
        toggleSimulacao();
    } else if (temp > 93) {
        if (sTemp) { sTemp.innerText = "ALERTA TÉRMICO"; sTemp.style.color = "#d35400"; }
    } else {
        if (sTemp) { sTemp.innerText = "ESTÁVEL"; sTemp.style.color = "#27ae60"; }
    }

    historicoTempo.push(horasAcumuladas.toFixed(1) + "h");
    historicoLucro.push(parseFloat(lucroLiquido.toFixed(2)));

    if (historicoTempo.length > 30) {
        historicoTempo.shift();
        historicoLucro.shift();
    }
    if (objGrafico) objGrafico.update();

    atualizarUI();
}

function atualizarUI() {
    document.getElementById("val-horas").innerText = horasAcumuladas.toFixed(1);
    document.getElementById("val-sacas-prod").innerText = sacas;
    document.getElementById("val-custo").innerText = custoTotal.toFixed(2);
    document.getElementById("val-ganho").innerText = ganhoBruto.toFixed(2);
    document.getElementById("val-lucro").innerText = lucroLiquido.toFixed(2);
    document.getElementById("container-lucro").style.color = lucroLiquido >= 0 ? "#27ae60" : "#c0392b";
    document.getElementById("val-diesel-l").innerText = Math.max(0, dieselL).toFixed(1);
    
    let pctD = modAtivo ? (dieselL / modAtivo.tanque) * 100 : 100;
    document.getElementById("val-diesel-pct").innerText = Math.max(0, Math.round(pctD));
    document.getElementById("bar-diesel").style.width = Math.max(0, pctD) + "%";
    document.getElementById("val-temp").innerText = Math.round(temp);
    document.getElementById("bar-temp").style.width = Math.min(100, (temp / 120) * 100) + "%";
    document.getElementById("val-co2").innerText = co2Total.toFixed(2);
    document.getElementById("bar-co2").style.width = Math.min(100, (co2Total / 5) * 100) + "%";
}

// ENGINE DE DIGITAÇÃO ROBUSTA COM RETENÇÃO DE ESPAÇOS (textContent)
function digitarTexto(texto, elemento, velocidade = 15) {
    let i = 0;
    elemento.textContent = ""; 
    if (timeoutDigitacao) clearInterval(timeoutDigitacao); 

    timeoutDigitacao = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
        } else {
            clearInterval(timeoutDigitacao);
        }
    }, velocidade);
}

function proximoPassoAssistente() {
    passoAtual++;
    const txt = document.getElementById("texto-assistente");
    const btn = document.getElementById("btn-assistente");
    const container = document.getElementById("assistente-container");

    if (passoAtual < falasAssistente.length) {
        digitarTexto(falasAssistente[passoAtual], txt);
        if (passoAtual === falasAssistente.length - 1) {
            btn.innerText = "Entendido! 👍";
        }
    } else {
        container.style.display = "none";
        registrarLog("SISTEMA: Introdução concluída.");
    }
}

window.onload = () => {
    criarGrafico(); 
    trocarCategoria('trator');
    mudarIdioma('pt');
    setInterval(simular, 1000);
    
    const txt = document.getElementById("texto-assistente");
    if (txt) digitarTexto(falasAssistente[0], txt);
};