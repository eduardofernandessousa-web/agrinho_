// BANCO DE DADOS DE IDIOMAS
const dicionario = {
    pt: {
        logo: "AGROSTREAM // TELEMETRIA", velocidade: "Velocidade", statusDesempenho: "Desempenho em tempo real",
        combustivel: "Combustível", consumo: "Consumo", pressao: "Pressão dos Pneus",
        temperatura: "Temperaturas dos Líquidos", oleo: "Óleo Hidráulico", co2: "Emissões de CO₂",
        pegada: "Pegada Ecológica de Operação", tiTitulo: "Como Funciona a Captura de Dados Remota?",
        tiDesc: "A telemetria de precisão conecta o ecossistema do campo diretamente às decisões gerenciais de forma instantânea através de três camadas vitais:",
        p1t: "1. Coleta Física (Sensores IoT)", p1x: "Sensores eletrônicos espalhados nos sistemas térmicos, pneumáticos e de combustível realizam a leitura direta via protocolo de Rede CAN da máquina.",
        p2t: "2. Transmissão Remota", p2x: "Os dados convertidos em pacotes digitais são transmitidos via conexões de longo alcance (Rádio UHF, 4G/5G Rural ou Satélite) diretamente do campo para nuvens seguras.",
        p3t: "3. Análise em Tempo Real", p3x: "Algoritmos organizam métricas como consumo em L/h, pressões em PSI/bar e alertas urgentes, permitindo controle absoluto de frotas e redução de quebras.",
        espTratorTit: "Força de Tração / RPM", espTratorSub: "Rotação Ativa do Motor",
        espColheTit: "Carga do Graneleiro", espColheSub: "kg carregados", espColheAlerta: "TANQUE CHEIO - SOLICITAR TRANSBORDO!",
        espPulvTit: "Pressão das Barras de Vazão", espPulvSub: "Nível do Tanque de Calda"
    },
    en: {
        logo: "AGROSTREAM // TELEMETRY", velocidade: "Speed", statusDesempenho: "Real-time performance",
        combustivel: "Fuel", consumo: "Consumption", pressao: "Tyre Pressure",
        temperatura: "Fluid Temperatures", oleo: "Hydraulic Oil", co2: "CO₂ Emissions",
        pegada: "Ecological Operating Footprint", tiTitulo: "How Does Remote Data Capture Work?",
        tiDesc: "Precision telemetry instantly connects the field ecosystem directly to management decisions through three vital layers:",
        p1t: "1. Physical Collection (IoT)", p1x: "Electronic sensors placed in thermal, pneumatic, and fuel systems read data directly via the vehicle's CAN Bus network.",
        p2t: "2. Remote Transmission", p2x: "Data packets travel via long-range networks (UHF Radio, Rural 4G/5G, or Satellite) straight from the machinery to secure cloud architecture.",
        p3t: "3. Real-Time Analytics", p3x: "Algorithms map operational metrics such as L/h intake, PSI/bar levels, and instant danger flags, stopping failures before they block crops.",
        espTratorTit: "Traction Force / RPM", espTratorSub: "Active Engine Rotation",
        espColheTit: "Grain Tank Capacity", espColheSub: "kg loaded", espColheAlerta: "TANK FULL - REQUEST OFFLOADING!",
        espPulvTit: "Spray Boom Flow Pressure", espPulvSub: "Chemical Mix Tank Level"
    },
    es: {
        logo: "AGROSTREAM // TELEMETRÍA", velocidade: "Velocidad", statusDesempenho: "Rendimiento en tiempo real",
        combustivel: "Combustible", consumo: "Consumo", pressao: "Presión de Neumáticos",
        temperatura: "Temperaturas de Líquidos", oleo: "Aceite Hidráulico", co2: "Emisiones de CO₂",
        pegada: "Huella Ecológica Operativa", tiTitulo: "¿Cómo Funciona la Captura de Datos Remota?",
        tiDesc: "La telemetría de precisión conecta instantáneamente el ecosistema de campo con las decisiones de gestión a través de tres capas vitales:",
        p1t: "1. Captura Física (IoT)", p1x: "Los sensores electrónicos integrados en los sistemas térmicos, neumáticos y de combustible leen los datos a través de la Red CAN Bus.",
        p2t: "2. Transmisión Remota", p2x: "Los paquetes de datos se transmiten mediante ondas de largo alcance (Radio UHF, 4G/5G Rural o Satélite) desde los campos hacia nubes seguras.",
        p3t: "3. Análisis en Tempo Real", p3x: "Los algoritmos procesan métricas críticas de L/h, presiones PSI/bar y alarmas operativas para optimizar flotas y evitar costosas roturas mecánicas.",
        espTratorTit: "Fuerza de Tracción / RPM", espTratorSub: "Rotación Activa del Motor",
        espColheTit: "Capacidad del Tolva", espColheSub: "kg cargados", espColheAlerta: "¡TOLVA LLENA - SOLICITAR DESCARGA!",
        espPulvTit: "Presión de Barra de Flujo", espPulvSub: "Nivel de Tanque del Mezcla"
    },
    fr: {
        logo: "AGROSTREAM // TÉLÉMÉTRIE", velocidade: "Vitesse", statusDesempenho: "Performance en temps réel",
        combustivel: "Carburant", consumo: "Consommation", pressao: "Pression des Pneus",
        temperatura: "Températures des Fluides", oleo: "Huile Hydraulique", co2: "Émissions de CO₂",
        pegada: "Empreinte Écologique Opérationnelle", tiTitulo: "Comment Fonctionne la Capture de Données à Distance?",
        tiDesc: "La télémétrie de précision connecte instantanément l'écosystème du champ aux décisions stratégiques via trois couches fondamentales :",
        p1t: "1. Collecte Physique (IoT)", p1x: "Des capteurs électroniques placés dans les systèmes thermiques, pneumatiques et de carburant lisent les données via le réseau CAN Bus.",
        p2t: "2. Transmission à Distance", p2x: "Les paquets de données voyagent par ondes longue portée (Radio UHF, 4G/5G Rurale ou Satellite) directement depuis les champs vers des serveurs cloud sécurisés.",
        p3t: "3. Analyse en Temps Réel", p3x: "Des algorithmes cartographient la consommation en L/h, la pression en PSI/bar et génèrent des alertes pour maximiser la disponibilité des engins.",
        espTratorTit: "Force de Traction / RPM", espTratorSub: "Rotation Active du Moteur",
        espColheTit: "Capacité de la Trémie", espColheSub: "kg chargés", espColheAlerta: "TRÉMIE PLEINE - DEMANDER LE TRANSBORDEMENT!",
        espPulvTit: "Pression de Rampe de Flux", espPulvSub: "Niveau du Réservoir Bouillie"
    }
};

let idiomaAtual = 'pt';
let maquinaAtual = 'trator';

function mudarMaquina(tipo) {
    maquinaAtual = tipo;
    document.querySelectorAll('.aba-btn').forEach(btn => btn.classList.remove('ativo'));
    document.getElementById(`aba-${tipo}`).classList.add('ativo');
    mudarIdioma(idiomaAtual);
}

function mudarIdioma(lang) {
    idiomaAtual = lang;
    const dict = dicionario[lang];

    document.getElementById("txt-logo").innerText = dict.logo;
    document.getElementById("lbl-velocidade").innerText = dict.velocidade;
    document.getElementById("lbl-status-desempenho").innerText = dict.statusDesempenho;
    document.getElementById("lbl-combustivel").innerText = dict.combustivel;
    document.getElementById("lbl-consumo").innerText = dict.consumo;
    document.getElementById("lbl-pressao").innerText = dict.pressao;
    document.getElementById("lbl-temperatura").innerText = dict.temperatura;
    document.getElementById("lbl-oleo").innerText = dict.oleo;
    document.getElementById("lbl-co2").innerText = dict.co2;
    document.getElementById("lbl-pegada-carbono").innerText = dict.pegada;
    document.getElementById("lbl-ti-titulo").innerText = dict.tiTitulo;
    document.getElementById("lbl-ti-desc").innerText = dict.tiDesc;
    document.getElementById("lbl-passo1-tit").innerText = dict.p1t;
    document.getElementById("lbl-passo1-txt").innerText = dict.p1x;
    document.getElementById("lbl-passo2-tit").innerText = dict.p2t;
    document.getElementById("lbl-passo2-txt").innerText = dict.p2x;
    document.getElementById("lbl-passo3-tit").innerText = dict.p3t;
    document.getElementById("lbl-passo3-txt").innerText = dict.p3x;

    const cardEsp = document.getElementById("card-especifico");
    const barraEspContainer = cardEsp.querySelector(".barra-progresso");
    
    cardEsp.classList.remove("alerta-cheio");
    barraEspContainer.style.display = "block";

    if (maquinaAtual === 'trator') {
        document.getElementById("lbl-especifico-titulo").innerText = dict.espTratorTit;
        document.getElementById("lbl-especifico-sub").innerText = dict.espTratorSub;
    } else if (maquinaAtual === 'colheitadeira') {
        document.getElementById("lbl-especifico-titulo").innerText = dict.espColheTit;
        document.getElementById("lbl-especifico-sub").innerText = dict.espColheSub;
    } else if (maquinaAtual === 'pulverizador') {
        document.getElementById("lbl-especifico-titulo").innerText = dict.espPulvTit;
        document.getElementById("lbl-especifico-sub").innerText = dict.espPulvSub;
    }
}

function alternarTema() {
    const html = document.documentElement;
    const btn = document.getElementById("btn-tema");
    if (html.getAttribute("data-theme") === "light") {
        html.setAttribute("data-theme", "dark");
        btn.innerText = "☀️ Light";
    } else {
        html.setAttribute("data-theme", "light");
        btn.innerText = "🌙 Dark";
    }
}

// Inicializa o idioma padrão ao carregar
window.onload = () => { mudarIdioma('pt'); };