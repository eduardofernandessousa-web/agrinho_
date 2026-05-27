// Estado do Sistema e Telemetria
let isRunning = false;
let motorFundido = false;
let segs = 0;
let horasAcumuladas = 0;
let dieselL = 0;
let cargaKg = 0;
let lat = -23.3100; // Coordenadas baseadas no Norte do PR
let lon = -51.4100;
let hectares = 0;
let custoTotal = 0;
let ganhoBruto = 0;
let lucroLiquido = 0;
let sacas = 0;
let co2Total = 0;
let temp = 85;
let clima = 0; // 0 = Sol, 1 = Chuva
let modAtivo = null;
let idiomaAtivo = 'pt';

// Gerenciamento de Gráfico
let objGrafico = null;
let historicoTempo = [];
let historicoLucro = [];

/**
 * Controla a visibilidade do bloco de manual
 */
function toggleAjuda() {
    const p = document.getElementById("painel-ajuda");
    if (p) p.style.display = p.style.display === "none" ? "block" : "none";
}

/**
 * Traduz os elementos da tela consultando o config.js
 */
function mudarIdioma(lang) {
    idiomaAtivo = lang;
    const elementos = document.querySelectorAll("[data-i18n]");
    elementos.forEach(el => {
        const chave = el.getAttribute("data-i18n");
        if (typeof dicionario !== 'undefined' && dicionario[lang] && dicionario[lang][chave]) {
            el.innerText = dicionario[lang][chave];
        }
    });
    registrarLog(`SISTEMA: Idioma alterado para [${lang.toUpperCase()}]`);
}

/**
 * Alterna entre esquemas de cores e recalibra o contraste do gráfico
 */
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
    registrarLog(`SISTEMA: Tema alterado para [${novo.toUpperCase()}]`);
}

/**
 * Loga as transações e telemetria no console interno inferior
 */
function registrarLog(msg) {
    const log = document.getElementById("log-box");
    if (!log) return;
    const h = new Date().toLocaleTimeString();
    log.innerHTML += `<br>[${h}] ${msg}`;
    log.scrollTop = log.scrollHeight;
}

/**
 * Carrega a frota baseado no tipo de maquinário selecionado
 */
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

/**
 * Define o modelo ativo e calibra a capacidade do tanque
 */
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

/**
 * Inicializa a operação injetando cargas e limpando dados residuais
 */
function carregarDadosIniciais() {
    const inDiesel = document.getElementById("in-diesel");
    const inCarga = document.getElementById("in-carga");
    
    dieselL = inDiesel ? parseFloat(inDiesel.value) : 250;
    cargaKg = inCarga ? parseFloat(inCarga.value) : 2000;
    
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

    registrarLog(">> Link IoT Estabelecido. Parâmetros sincronizados com sucesso.");
    atualizarUI();
}

/**
 * Ativa ou pausa o loop da simulação
 */
function toggleSimulacao() {
    if (motorFundido) return;
    isRunning = !isRunning;
    const btn = document.getElementById("btn-start");
    if (btn) {
        btn.innerText = isRunning ? "⏸ STOP" : "▶ START";
        btn.style.background = isRunning ? "#e74c3c" : "#2ecc71";
    }
}

/**
 * Modifica as restrições climáticas ambientais
 */
function mudarClima() {
    clima = clima === 0 ? 1 : 0;
    const valClima = document.getElementById("val-clima");
    if (valClima) valClima.innerText = clima === 0 ? "SOL" : "CHUVA";
    registrarLog(clima === 1 ? "⚠️ Sensor: Chuva detectada no PR. Patinagem de pneu ativa." : "Sensor: Clima Seco.");
}

/**
 * Monta o gráfico de telemetria Chart.js na inicialização do DOM
 */
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
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
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

/**
 * Loop principal de simulação matemática (Executado a cada 1000ms)
 */
function simular() {
    if (!isRunning || motorFundido) return;

    if (dieselL <= 0) { 
        dieselL = 0;
        registrarLog("❌ Alerta de Telemetria: Pane Seca detectada."); 
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
    
    const pDiesel = inPDiesel ? parseFloat(inPDiesel.value) : 6.10;
    const pSaca = inPSaca ? parseFloat(inPSaca.value) : 128.00;
    const cat = selTipo ? selTipo.value : 'trator';

    let vel = clima === 0 ? 12 : 5; 
    if (cat === 'pulverizador' && clima === 1) vel = 0; 
    vel += (Math.random() - 0.5); 
    if (vel < 0) vel = 0;
    
    const valVel = document.getElementById("val-vel");
    if (valVel) valVel.innerText = vel.toFixed(1);

    let deslocamento = vel / 3600; 
    if (vel > 0) {
        lat += (deslocamento * 0.0001);
        lon += (deslocamento * 0.00008);
        
        let largura = cat === 'pulverizador' ? 28 : (cat === 'colheitadeira' ? 10 : 4);
        hectares += (deslocamento * largura) / 10;
    }
    
    const valLat = document.getElementById("val-lat");
    const valLon = document.getElementById("val-lon");
    if (valLat) valLat.innerText = lat.toFixed(4);
    if (valLon) valLon.innerText = lon.toFixed(4);

    const valHa = document.getElementById("val-ha");
    if (valHa) valHa.innerText = hectares.toFixed(2);

    // Matemática do Diesel por Hora Realista
    let consumoBaseHora = modAtivo ? (modAtivo.tanque * 0.05) : 30; 
    let efeitoCarga = (cargaKg / 5000) * 10; 
    let consumoPorHoraRealista = consumoBaseHora + efeitoCarga;
    
    if (vel === 0) {
        consumoPorHoraRealista = 3.0; // Consumo residual em marcha lenta
    }

    let consumoDesteCiclo = consumoPorHoraRealista * passoHora;

    dieselL -= consumoDesteCiclo;
    if (dieselL < 0) dieselL = 0;

    co2Total += (consumoDesteCiclo * 2.61); 
    custoTotal += (consumoDesteCiclo * pDiesel);

    if (vel > 0) {
        sacas = Math.floor(hectares * 65);
    }
    
    ganhoBruto = sacas * pSaca;
    lucroLiquido = ganhoBruto - custoTotal;

    temp += (cargaKg / 22000);
    if (clima === 0) temp += 0.01; else temp -= 0.04;
    if (vel === 0) temp -= 0.1;

    const sTemp = document.getElementById("status-temp");
    if (temp >= 102) {
        temp = 102;
        motorFundido = true;
        if (sTemp) { sTemp.innerText = "CRÍTICO"; sTemp.style.color = "#c0392b"; }
        const modCalor = document.getElementById("modal-calor");
        if (modCalor) modCalor.style.display = "flex";
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
    
    if (objGrafico) {
        objGrafico.update();
    }

    atualizarUI();
}

/**
 * Atualiza e formata os dados visuais na tela de modo seguro
 */
function atualizarUI() {
    const valCusto = document.getElementById("val-custo");
    const valGanho = document.getElementById("val-ganho");
    const valLucro = document.getElementById("val-lucro");
    const contLucro = document.getElementById("container-lucro");
    const valDieselL = document.getElementById("val-diesel-l");
    const valDieselPct = document.getElementById("val-diesel-pct");
    const barDiesel = document.getElementById("bar-diesel");
    const valTemp = document.getElementById("val-temp");
    const barTemp = document.getElementById("bar-temp");
    const valCo2 = document.getElementById("val-co2");
    const barCo2 = document.getElementById("bar-co2");
    
    const valHoras = document.getElementById("val-horas");
    const valSacasProd = document.getElementById("val-sacas-prod");

    if (valHoras) valHoras.innerText = horasAcumuladas.toFixed(1);
    if (valSacasProd) valSacasProd.innerText = sacas;

    if (valCusto) valCusto.innerText = custoTotal.toFixed(2);
    if (valGanho) valGanho.innerText = ganhoBruto.toFixed(2);
    if (valLucro) valLucro.innerText = lucroLiquido.toFixed(2);
    if (contLucro) contLucro.style.color = lucroLiquido >= 0 ? "#27ae60" : "#c0392b";

    if (valDieselL) valDieselL.innerText = Math.max(0, dieselL).toFixed(1);
    
    let pctD = modAtivo ? (dieselL / modAtivo.tanque) * 100 : 100;
    if (valDieselPct) valDieselPct.innerText = Math.max(0, Math.round(pctD));
    if (barDiesel) barDiesel.style.width = Math.max(0, pctD) + "%";

    if (valTemp) valTemp.innerText = Math.round(temp);
    if (barTemp) barTemp.style.width = Math.min(100, (temp / 120) * 100) + "%";
    
    if (valCo2) valCo2.innerText = co2Total.toFixed(2);
    if (barCo2) barCo2.style.width = Math.min(100, (co2Total / 5) * 100) + "%";
}

// Configurações de Boot do sistema
window.onload = () => {
    criarGrafico(); 
    trocarCategoria('trator');
    mudarIdioma('pt');
    setInterval(simular, 1000);
};