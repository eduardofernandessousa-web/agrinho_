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

// CONTROLE DO MENU HAMBÚRGUER
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
    }
    carregarDadosIniciais();
}

function carregarDadosIniciais() {
    const inDiesel = document.getElementById("in-diesel");
    const inAgua = document.getElementById("in-agua");
    const inCarga = document.getElementById("in-carga");
    
    dieselL = inDiesel ? parseFloat(inDiesel.value) : 300;
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
                label: 'Lucro Líquido / Net Profit (R$)',
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

    let consumoBaseHora = modAtivo ? (modAtivo.tanque * 0.02) : 12; 
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
        const msgFusao = idiomaAtivo === 'pt' ? "❌ CRÍTICO: Temperatura atingiu 102°C! Motor fundido." : "❌ CRITICAL: Temperature reached 102°C! Engine blown.";
        registrarLog(msgFusao);
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
    let pctD = modAtivo ? (dieselL / modAtivo.tanque) * 100 : 100;
    document.getElementById("val-diesel-pct").innerText = Math.max(0, Math.round(pctD));
    document.getElementById("bar-diesel").style.width = Math.max(0, pctD) + "%";
    
    document.getElementById("val-agua-l").innerText = Math.max(0, aguaL).toFixed(1);
    let pctA = (aguaL / maxAgua) * 100;
    document.getElementById("val-agua-pct").innerText = Math.max(0, Math.round(pctA));
    document.getElementById("bar-agua").style.width = Math.max(0, pctA) + "%";

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
                setTimeout(() => {
                    box.style.display = "none";
                }, 500);
            }, 5000);
        }
    }, 30);
}

// SISTEMA DE INTERNACIONALIZAÇÃO (PT/EN) EXIGIDO
function mudarIdioma(lang) {
    idiomaAtivo = lang;
    const d = {
        pt: {
            sub: "Premium v5.0", oqueTit: "🛰️ O que é Telemetria de Máquinas Agrícolas?",
            oqueP: "A telemetria de máquinas agrícolas é a tecnologia que permite coletar, processar e transmitir dados operacionais de tratores, colheitadeiras e pulverizadores à distância e em tempo real...",
            prTit: "🌾 Como Isso Ajuda o Agronegócio no Paraná?",
            prP: "O Paraná é um dos maiores pilares agrícolas do Brasil, destacando-se pela altíssima produtividade em solos ricos como a 'terra roxa'...",
            siteTit: "🖥️ Para que Serve Este Site?",
            siteP: "Este site funciona como um Gêmeo Digital (Digital Twin) educativo. Ele foi projetado para simular o comportamento de uma frota agrícola real operando sob diferentes cargas e condições climáticas do Paraná...",
            manual: "❓ Manual Prático do Simulador", m1:"1. Configurar", mp1:"Selecione o modelo da máquina e insira o peso da carga inicial.",
            m2:"2. Inicializar", mp2:"Clique no botão 'Aplicar Carga' e depois em '▶ START'.", m3:"3. Clima", mp3:"Altere para Chuva para ver as rodas patinarem e o consumo subir.",
            m4:"4. Segurança", mp4:"Cuidado com cargas excessivas ou o motor vai fundir a 102°C.",
            montagem: "🔧 Como Funcionaria a Montagem do Sistema no Veículo?", subM: "Arquitetura de Instalação Física de Hardware e Integração de Sensores",
            term: "🖥️ Terminal de Telemetria", c1: "Configuração Inicial", cult: "Cultura:", dIn: "⛽ Diesel Inicial (L):", aIn: "💧 Água (L):", cgIn: "Carga (kg):",
            ctIn: "⛽ Custo Diesel (R$/L):", prIn: "🌾 Preço Saca (R$):", btnAp: "✅ APLICAR CARGA", c2: "Posicionamento & Clima", hrs: "⏱️ Horas Operação:", vl: "⚡ Velocidade Atual:",
            rd: "🚜 Rendimento:", ar: "Área Coberta:", sc: "🌾 Sacas Produzidas:", btnCl: "Alterar Clima", c3: "Balanço Financeiro", gst: "Gastos acumulados:", gnh: "Ganho Bruto:",
            sld: "SALDO LÍQUIDO ATUAL", graf: "Gráfico de Lucro Líquido em Tempo Real", s1: "Nível Combustível", s2: "Nível de Água / Calda", s3: "Temperatura Motor",
            logTit: "Log de Eventos IoT (Barramento CAN)", mH1: "❌ MOTOR FUNDIDO!", mHp: "O sensor acusou temperatura acima de 102°C por excesso de carga ou velocidade inadequada.", mHb: "Resetar Maquinário"
        },
        en: {
            sub: "Premium v5.0 Pro", oqueTit: "🛰️ What is Agricultural Machine Telemetry?",
            oqueP: "Agricultural machine telemetry is the technology that allows collecting, processing, and transmitting operational data from tractors, combines, and sprayers remotely and in real time...",
            prTit: "🌾 How Does This Help Agribusiness in Paraná?",
            prP: "Paraná is one of the largest agricultural pillars in Brazil, stands out for its high productivity in rich soils like 'terra roxa'...",
            siteTit: "🖥️ What is the Purpose of This Website?",
            siteP: "This website works as an educational Digital Twin. It was designed to simulate the behavior of a real agricultural fleet operating under different loads and weather conditions in Paraná...",
            manual: "❓ Simulator Practical Manual", m1:"1. Configure", mp1:"Select the machine model and input the initial cargo load.",
            m2:"2. Initialize", mp2:"Click on 'Apply Cargo' button and then click '▶ START'.", m3:"3. Weather", mp3:"Change to Rain to watch the wheels slip and consumption rise.",
            m4:"4. Safety", mp4:"Beware of excessive loads or the engine will blow at 102°C.",
            montagem: "🔧 How Would the System Be Mounted on the Vehicle?", subM: "Physical Hardware Installation Architecture and Sensor Integration",
            term: "🖥️ Telemetry Terminal", c1: "Initial Configuration", cult: "Crop type:", dIn: "⛽ Initial Diesel (L):", aIn: "💧 Water (L):", cgIn: "Load weight (kg):",
            ctIn: "⛽ Diesel Cost (R$/L):", prIn: "🌾 Bag Price (R$):", btnAp: "✅ APPLY CARGO", c2: "Positioning & Weather", hrs: "⏱️ Operating Hours:", vl: "⚡ Current Speed:",
            rd: "🚜 Yield Rate:", ar: "Covered Area:", sc: "🌾 Produced Bags:", btnCl: "Change Weather", c3: "Financial Balance", gst: "Accumulated Expenses:", gnh: "Gross Earnings:",
            sld: "CURRENT NET BALANCE", graf: "Real-Time Net Profit Graph", s1: "Fuel Level", s2: "Water / Spray Mixture Level", s3: "Engine Temperature",
            logTit: "IoT Event Log (CAN-BUS Network)", mH1: "❌ ENGINE BLOWN!", mHp: "The sensor reported a temperature above 102°C due to excessive load or inappropriate speed.", mHb: "Reset Machinery"
        }
    };

    document.getElementById("lbl-subtitulo").innerText = d[lang].sub;
    document.getElementById("tit-oque-e").innerText = d[lang].oqueTit;
    document.getElementById("tit-parana").innerText = d[lang].prTit;
    document.getElementById("tit-site").innerText = d[lang].siteTit;
    document.getElementById("tit-manual").innerText = d[lang].manual;
    document.getElementById("m-tit1").innerText = d[lang].m1;
    document.getElementById("m-p1").innerText = d[lang].mp1;
    document.getElementById("m-tit2").innerText = d[lang].m2;
    document.getElementById("m-p2").innerText = d[lang].mp2;
    document.getElementById("m-tit3").innerText = d[lang].m3;
    document.getElementById("m-p3").innerText = d[lang].mp3;
    document.getElementById("m-tit4").innerText = d[lang].m4;
    document.getElementById("m-p4").innerText = d[lang].mp4;
    document.getElementById("tit-montagem").innerText = d[lang].montagem;
    document.getElementById("sub-montagem").innerText = d[lang].subM;
    document.getElementById("tit-terminal").innerText = d[lang].term;
    document.getElementById("lbl-c1-tit").innerText = d[lang].c1;
    document.getElementById("lbl-cultura").innerText = d[lang].cult;
    document.getElementById("lbl-diesel-in").innerText = d[lang].dIn;
    document.getElementById("lbl-agua-in").innerText = d[lang].aIn;
    document.getElementById("lbl-carga-in").innerText = d[lang].cgIn;
    document.getElementById("lbl-custo-in").innerText = d[lang].ctIn;
    document.getElementById("lbl-preco-in").innerText = d[lang].prIn;
    document.getElementById("btn-aplicar-carga").innerText = d[lang].btnAp;
    document.getElementById("lbl-c2-tit").innerText = d[lang].c2;
    document.getElementById("lbl-horas").innerText = d[lang].hrs;
    document.getElementById("lbl-vel").innerText = d[lang].vl;
    document.getElementById("lbl-rend").innerText = d[lang].rd;
    document.getElementById("lbl-area").innerText = d[lang].ar;
    document.getElementById("lbl-sacas").innerText = d[lang].sc;
    document.getElementById("lbl-btn-clima").innerText = d[lang].btnCl;
    document.getElementById("lbl-c3-tit").innerText = d[lang].c3;
    document.getElementById("lbl-gastos").innerText = d[lang].gst;
    document.getElementById("lbl-ganho").innerText = d[lang].gnh;
    document.getElementById("lbl-saldo-tit").innerText = d[lang].sld;
    document.getElementById("lbl-grafico-tit").innerText = d[lang].graf;
    document.getElementById("lbl-s1").innerText = d[lang].s1;
    document.getElementById("lbl-s2").innerText = d[lang].s2;
    document.getElementById("lbl-s3").innerText = d[lang].s3;
    document.getElementById("lbl-log-tit").innerText = d[lang].logTit;
    document.getElementById("lbl-modal-tit").innerText = d[lang].mH1;
    document.getElementById("lbl-modal-p").innerText = d[lang].mHp;
    document.getElementById("lbl-modal-btn").innerText = d[lang].mHb;

    const logLang = lang === 'pt' ? `>> Sistema: Idioma alterado para [${lang.toUpperCase()}].` : `>> System: Language updated to [${lang.toUpperCase()}].`;
    registrarLog(logLang);
}

window.onload = () => {
    criarGrafico(); 
    trocarCategoria('trator'); 
    setInterval(simular, 1000);
    inicializarAssistenteTemporario();
    registrarLog("SISTEMA: Barramento CAN J1939 mapeado localmente.");
};