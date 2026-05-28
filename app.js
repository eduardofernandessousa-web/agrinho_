// app.js - Lógica matemática de simulação local, menus e internacionalização

let isRunning = false;
let motorFundido = false;
let segs = 0;
let horasAcumuladas = 0;
let dieselL = 0;
let aguaL = 0;
let maxAgua = 1500;
let cargaKg = 0;
let lat = -23.3100; 
let lon = -51.4100;
let hectares = 0;
let sacasFracionadas = 0; 
let custoTotal = 0;
let ganhoBruto = 0;
let lucroLiquido = 0;
let temp = 85;
let clima = 0; 
let modAtivo = null;
let idiomaAtivo = 'pt';

let objGrafico = null;
let historicoTempo = [];
let historicoLucro = [];

// CONTROLE E ALTERNÂNCIA DE ABAS EXCLUSIVAS (SPA)
function mudarAba(idAba) {
    // Esconde todas as seções que possuem a classe de conteúdo de aba
    const todasAbas = document.querySelectorAll('.aba-conteudo');
    todasAbas.forEach(aba => {
        aba.style.display = 'none';
    });

    // Faz aparecer exclusivamente a aba que foi clicada no menu
    const abaAlvo = document.getElementById(idAba);
    if (abaAlvo) {
        if (idAba === 'aba-simulador' || idAba === 'aba-parana') {
            abaAlvo.style.display = 'block';
        } else {
            abaAlvo.style.display = 'block'; // Mantém o display block padrão
        }
    }
    
    // Fecha o menu hambúrguer para limpar o visual
    toggleMenu();
}

function toggleMenu() {
    const menu = document.getElementById("menu-lateral");
    const overlay = document.getElementById("overlay-menu");
    if (menu && overlay) {
        menu.classList.toggle("ativo");
        if (menu.classList.contains("ativo")) {
            overlay.style.display = "block";
            setTimeout(() => overlay.classList.add("ativo"), 10);
        } else {
            overlay.classList.remove("ativo");
            setTimeout(() => overlay.style.display = "none", 300);
        }
    }
}

function alternarTema() {
    const html = document.documentElement;
    const atual = html.getAttribute("data-theme");
    const novo = actual === "dark" ? "light" : "dark";
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
    }
    carregarDadosIniciais();
}

function carregarDadosIniciais() {
    if (!modAtivo && typeof frota !== 'undefined' && frota.trator && frota.trator[0]) {
        modAtivo = frota.trator[0];
    }

    const inDiesel = document.getElementById("in-diesel");
    const inAgua = document.getElementById("in-agua");
    const inCarga = document.getElementById("in-carga");
    
    dieselL = inDiesel ? parseFloat(inDiesel.value) : (modAtivo ? modAtivo.tanque : 300);
    aguaL = inAgua ? parseFloat(inAgua.value) : 1500;
    maxAgua = aguaL > 0 ? aguaL : 1500; 
    cargaKg = inCarga ? parseFloat(inCarga.value) : 500;
    
    if (modAtivo && dieselL > modAtivo.tanque) {
        dieselL = modAtivo.tanque;
        if (inDiesel) inDiesel.value = dieselL;
    }
    
    custoTotal = 0; ganhoBruto = 0; lucroLiquido = 0; segs = 0; horasAcumuladas = 0; hectares = 0; sacasFracionadas = 0; temp = 85;
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

    const logMsg = idiomaAtivo === 'pt' ? ">> Link IoT Estabelecido. Parâmetros sincronizados." : ">> IoT Link Established. Parameters synchronized.";
    registrarLog(logMsg);
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
    if(!isRunning) {
        const logMsg = idiomaAtivo === 'pt' ? `>> SIMULAÇÃO PAUSADA. Saldo Líquido Final: R$ ${lucroLiquido.toFixed(2)}` : `>> SIMULATION PAUSED. Final Net Balance: R$ ${lucroLiquido.toFixed(2)}`;
        registrarLog(logMsg);
    }
}

function mudarClima() {
    clima = clima === 0 ? 1 : 0;
    const valClima = document.getElementById("val-clima");
    if (valClima) {
        if (idiomaAtivo === 'pt') {
            valClima.innerText = clima === 0 ? "SOL" : "CHUVA";
        } else {
            valClima.innerText = clima === 0 ? "SUNNY" : "RAINY";
        }
    }
    const logMsg = idiomaAtivo === 'pt' ? `>> Sensor Climático: Alterado para ${clima === 0 ? 'SOL' : 'CHUVA'}.` : `>> Weather Sensor: Changed to ${clima === 0 ? 'SUNNY' : 'RAINY'}.`;
    registrarLog(logMsg);
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
        const msgSeca = idiomaAtivo === 'pt' ? "❌ Alerta Telemetria: PANE SECA! O combustível acabou." : "❌ Telemetry Alert: FUEL OUTAGE! Running on empty.";
        registrarLog(msgSeca); 
        toggleSimulacao(); 
        atualizarUI();
        return; 
    }

    segs++;
    const passoHora = 0.005; 
    horasAcumuladas += passoHora;

    const inPDiesel = document.getElementById("in-p-diesel");
    const inPSaca = document.getElementById("in-p-saca");
    const selTipo = document.getElementById("sel-tipo");
    const selCultura = document.getElementById("sel-cultura");
    
    const pDiesel = inPDiesel ? parseFloat(inPDiesel.value) : 7.00;
    const pSaca = inPSaca ? parseFloat(inPSaca.value) : 125.00;
    const cat = selTipo ? selTipo.value : 'trator';
    const cultura = selCultura ? selCultura.value : 'soja';

    let velBase = 10;
    if (cat === 'colheitadeira') velBase = 7;
    if (cat === 'pulverizador') velBase = 15;

    let vel = clima === 0 ? velBase : (velBase * 0.4); 
    vel += (Math.random() - 0.5); 
    if (vel < 0) vel = 0;
    
    document.getElementById("val-vel").innerText = vel.toFixed(1);

    let larguraTrabalho = cat === 'pulverizador' ? 28 : (cat === 'colheitadeira' ? 10 : 4);
    let rendimentoHora = (vel * larguraTrabalho) / 10; 
    document.getElementById("val-rendimento").innerText = rendimentoHora.toFixed(1);

    let haDesteCiclo = 0;
    if (vel > 0) {
        lat += ((vel / 3600) * 0.0001);
        lon += ((vel / 3600) * 0.00008);
        
        haDesteCiclo = rendimentoHora * passoHora;
        hectares += haDesteCiclo;
        
        let sacasPorHa = 65; 
        if(cultura === 'milho') sacasPorHa = 110;
        if(cultura === 'trigo') sacasPorHa = 50;

        sacasFracionadas += (haDesteCiclo * sacasPorHa);
        
        if (aguaL > 0) {
            let consumoAgua = cat === 'pulverizador' ? (haDesteCiclo * 50) : (haDesteCiclo * 2);
            aguaL -= consumoAgua;
            if(aguaL < 0) aguaL = 0;
        }
    }
    
    document.getElementById("val-lat").innerText = lat.toFixed(4);
    document.getElementById("val-lon").innerText = lon.toFixed(4);
    document.getElementById("val-ha").innerText = hectares.toFixed(2);

    let consumoBaseHora = modAtivo && modAtivo.consumoNominal ? modAtivo.consumoNominal : 15; 
    let efeitoCarga = (cargaKg / 2000) * 3; 
    let consumoPorHoraRealista = consumoBaseHora + efeitoCarga;
    if (clima === 1) consumoPorHoraRealista *= 1.3; 
    if (vel === 0) consumoPorHoraRealista = 2.0; 

    let consumoDesteCiclo = consumoPorHoraRealista * passoHora;
    dieselL -= consumoDesteCiclo;
    if (dieselL < 0) dieselL = 0;

    custoTotal += (consumoDesteCiclo * pDiesel);

    let sacasInteiras = Math.floor(sacasFracionadas);
    ganhoBruto = sacasInteiras * pSaca;
    lucroLiquido = ganhoBruto - custoTotal;

    let tempAlvo = 85 + (cargaKg / 200);
    if (clima === 0) tempAlvo += 5; else tempAlvo -= 8;
    
    if (temp < tempAlvo) temp += 0.5;
    if (temp > tempAlvo) temp -= 0.3;
    if (vel === 0) tempAlvo = 70;

    const sTemp = document.getElementById("status-temp");
    if (temp >= 102) {
        temp = 102;
        motorFundido = true;
        if (sTemp) { 
            sTemp.innerText = idiomaAtivo === 'pt' ? "CRÍTICO" : "CRITICAL"; 
            sTemp.style.color = "#c0392b"; 
        }
        document.getElementById("modal-calor").style.display = "flex";
        
        if (typeof dicionarioErrosCAN !== 'undefined') {
            registrarLog("❌ ERRO INTERNO REDE CAN: SPN_110_FMI_0 -> Motor Superaquecido.");
        }
        toggleSimulacao();
    } else if (temp > 93) {
        if (sTemp) { 
            sTemp.innerText = idiomaAtivo === 'pt' ? "ALERTA TÉRMICO" : "THERMAL ALERT"; 
            sTemp.style.color = "#d35400"; 
        }
    } else {
        if (sTemp) { 
            sTemp.innerText = idiomaAtivo === 'pt' ? "ESTÁVEL" : "STABLE"; 
            sTemp.style.color = "#27ae60"; 
        }
    }

    if (segs % 15 === 0 && isRunning && typeof dicionarioErrosCAN !== 'undefined') {
        const chaves = Object.keys(dicionarioErrosCAN);
        const chaveAleatoria = chaves[Math.floor(Math.random() * chaves.length)];
        const erro = dicionarioErrosCAN[chaveAleatoria];
        registrarLog(`⚠️ CAN-BUS [${erro.code}]: ${erro.desc}`);
    }

    historicoTempo.push(horasAcumuladas.toFixed(2) + "h");
    historicoLucro.push(parseFloat(lucroLiquido.toFixed(2)));

    if (historicoTempo.length > 20) {
        historicoTempo.shift();
        historicoLucro.shift();
    }
    if (objGrafico) objGrafico.update();

    atualizarUI();
}

function atualizarUI() {
    document.getElementById("val-horas").innerText = horasAcumuladas.toFixed(2);
    document.getElementById("val-sacas-prod").innerText = Math.floor(sacasFracionadas);
    document.getElementById("val-custo").innerText = custoTotal.toFixed(2);
    document.getElementById("val-ganho").innerText = ganhoBruto.toFixed(2);
    document.getElementById("val-lucro").innerText = lucroLiquido.toFixed(2);
    
    const containerLucro = document.getElementById("container-lucro");
    if(containerLucro) {
        containerLucro.style.color = lucroLiquido >= 0 ? "#27ae60" : "#c0392b";
    }
    
    document.getElementById("val-diesel-l").innerText = Math.max(0, dieselL).toFixed(1);
    let maxTanque = modAtivo && modAtivo.tanque ? modAtivo.tanque : 300;
    let pctD = (dieselL / maxTanque) * 100;
    document.getElementById("val-diesel-pct").innerText = Math.max(0, Math.round(pctD));
    document.getElementById("bar-diesel").style.width = Math.min(100, Math.max(0, pctD)) + "%";
    
    document.getElementById("val-agua-l").innerText = Math.max(0, aguaL).toFixed(1);
    let pctA = (aguaL / maxAgua) * 100;
    document.getElementById("val-agua-pct").innerText = Math.max(0, Math.round(pctA));
    document.getElementById("bar-agua").style.width = Math.min(100, Math.max(0, pctA)) + "%";

    document.getElementById("val-temp").innerText = Math.round(temp);
    document.getElementById("bar-temp").style.width = Math.min(100, (temp / 120) * 100) + "%";
}

function inicializarAssistenteTemporario() {
    const box = document.getElementById("assistente-container");
    const textoEl = document.getElementById("texto-assistente");
    if (!box || !textoEl) return;

    const mensagem = "Olá, banca examinadora! Sejam bem-vindos ao AGROSTREAM. Este simulador interativo exibe em tempo real o comportamento de redes veiculares CAN e sensores IoT aplicados ao agronegócio do Paraná. Bons testes!";
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < mensagem.length) {
            textoEl.textContent += mensagem.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                box.style.opacity = "0";
                box.style.transform = "translateY(20px)";
                setTimeout(() => {box.style.display = "none";}, 500);
            }, 5000);
        }
    }, 30);
}

function mudarIdioma(lang) {
    idiomaAtivo = lang;
    // Lógica simplificada de internacionalização das abas principais
    if(lang === 'pt') {
        document.getElementById("lbl-subtitulo").innerText = "Premium v5.0";
    } else {
        document.getElementById("lbl-subtitulo").innerText = "Premium v5.0 Pro";
    }
}

window.onload = () => {
    criarGrafico(); 
    trocarCategoria('trator'); 
    setInterval(simular, 1000);
    inicializarAssistenteTemporario();
    registrarLog("SISTEMA: Barramento CAN J1939 mapeado dinamicamente.");
};