const dicionario = {
    pt: {
        logo: "AGROSTREAM // TELEMETRIA", velocidade: "Velocidade", odometro: "Odômetro Total:",
        combustivel: "Combustível", consumo: "Consumo", pressao: "Pressão dos Pneus",
        temperatura: "Temperaturas dos Líquidos", co2: "Emissões de CO₂", pegada: "Pegada Ecológica de Operação",
        agendaTit: "Programação de Jornada de Trabalho", agendaIni: "Início:", agendaFim: "Término:",
        shutdownTit: "⚠️ VEÍCULO SUPERAQUECIDO ⚠️", shutdownTxt: "A telemetria detectou temperatura superior a 102°C nos fluídos. Motor desligado remotamente para contenção de danos físicos e segurança.",
        tiTitulo: "Como Funciona a Captura de Dados Remota?", tiDesc: "A telemetria de precisão conecta o ecossistema do campo através de três camadas vitais:",
        p1t: "1. Coleta Física (Sensores IoT)", p1x: "Sensores eletrônicos nos sistemas térmicos, pneumáticos e mecânicos realizam a leitura via barramento CAN.",
        p2t: "2. Transmissão Remota", p2x: "Os dados digitais são transmitidos via conexões de longo alcance (4G Rural ou Satélite) para nuvens seguras.",
        p3t: "3. Análise em Tempo Real", p3x: "Métricas de consumo, quilometragem e segurança evitam quebras e reduzem a pegada de carbono.",
        espTratorTit: "Força de Tração / RPM", espTratorSub: "Rotação Ativa do Motor",
        espColheTit: "Carga do Graneleiro", espColheSub: "kg carregados", espColheAlerta: "💥 TANQUE GRANELEIRO CHEIO! 💥",
        espPulvTit: "Pressão das Barras de Vazão", espPulvSub: "Nível do Tanque de Calda"
    },
    en: {
        logo: "AGROSTREAM // TELEMETRY", velocidade: "Speed", odometro: "Total Odometer:",
        combustivel: "Fuel", consumo: "Consumption", pressao: "Tyre Pressure",
        temperatura: "Fluid Temperatures", co2: "CO₂ Emissions", pegada: "Ecological Operating Footprint",
        agendaTit: "Work Shift Scheduling", agendaIni: "Start:", agendaFim: "End:",
        shutdownTit: "⚠️ VEHICLE OVERHEATED ⚠️", shutdownTxt: "Telemetry detected fluid temperatures above 102°C. Engine remotely disabled for physical damage containment and safety.",
        tiTitulo: "How Does Remote Data Capture Work?", tiDesc: "Precision telemetry connects the field ecosystem through three vital layers:",
        p1t: "1. Physical Collection (IoT)", p1x: "Electronic sensors in thermal, pneumatic and mechanical systems read data via CAN Bus.",
        p2t: "2. Remote Transmission", p2x: "Digital data packets travel via long-range networks (Rural 4G or Satellite) straight to secure cloud architecture.",
        p3t: "3. Real-Time Analytics", p3x: "Operational metrics like fuel intake, millage and emergency logs optimize fleets and stop failure.",
        espTratorTit: "Traction Force / RPM", espTratorSub: "Active Engine Rotation",
        espColheTit: "Grain Tank Capacity", espColheSub: "kg loaded", espColheAlerta: "💥 GRAIN TANK FULL! 💥",
        espPulvTit: "Spray Boom Flow Pressure", espPulvSub: "Chemical Mix Tank Level"
    },
    es: {
        logo: "AGROSTREAM // TELEMETRÍA", velocidade: "Velocidad", odometro: "Odómetro Total:",
        combustivel: "Combustible", consumo: "Consumo", pressao: "Presión de Neumáticos",
        temperatura: "Temperaturas de Líquidos", co2: "Emisiones de CO₂", pegada: "Huella Ecológica Operativa",
        agendaTit: "Programación de Jornada Laboral", agendaIni: "Inicio:", agendaFim: "Término:",
        shutdownTit: "⚠️ VEHÍCULO RECALENTADO ⚠️", shutdownTxt: "La telemetría detectó temperaturas de fluidos superiores a 102°C. Motor apagado remotamente para contención de daños mecánicos.",
        tiTitulo: "¿Cómo Funciona la Captura de Datos Remota?", tiDesc: "La telemetría de precisión conecta el ecosistema de campo a través de tres capas vitales:",
        p1t: "1. Captura Física (IoT)", p1x: "Los sensores electrónicos en los sistemas térmicos, neumáticos y mecánicos leen los datos a través de CAN Bus.",
        p2t: "2. Transmisión Remota", p2x: "Los paquetes de datos se transmiten mediante redes de largo alcance (4G Rural o Satélite) hacia nubes seguras.",
        p3t: "3. Análisis en Tiempo Real", p3x: "Las métricas de consumo, kilometraje y alertas de seguridad evitan costosas roturas de maquinaria.",
        espTratorTit: "Fuerza de Tracción / RPM", espTratorSub: "Rotación Activa del Motor",
        espColheTit: "Capacidad del Tolva", espColheSub: "kg cargados", espColheAlerta: "💥 ¡TOLVA COMPLETA! 💥",
        espPulvTit: "Presión de Barra de Flujo", espPulvSub: "Nivel de Tanque del Mezcla"
    },
    fr: {
        logo: "AGROSTREAM // TÉLÉMÉTRIE", velocidade: "Vitesse", odometro: "Odomètre Total:",
        combustivel: "Carburant", consumo: "Consommation", pressao: "Pression des Pneus",
        temperatura: "Températures des Fluides", co2: "Émissions de CO₂", pegada: "Empreinte Écologique Opérationnelle",
        agendaTit: "Planification des Quarts de Travail", agendaIni: "Début:", agendaFim: "Fin:",
        shutdownTit: "⚠️ VÉHICULE SURCHAUFFÉ ⚠️", shutdownTxt: "La télémétrie a détecté des fluides supérieurs à 102°C. Moteur arrêté à distance pour la sécurité e préservation mécanique.",
        tiTitulo: "Comment Fonctionne la Capture de Données?", tiDesc: "La télémétrie de précision connecte l'écosystème du champ via trois couches fondamentales :",
        p1t: "1. Collecte Physique (IoT)", p1x: "Des capteurs électroniques placés dans les systèmes thermiques et pneumatiques lisent les données via CAN Bus.",
        p2t: "2. Transmission à Distance", p2x: "Les paquets de données voyagent par des réseaux longue portée (4G Rurale ou Satellite) vers le cloud.",
        p3t: "3. Analyse en Temps Réel", p3x: "Les algorithmes organisent la consommation, le kilométrage et génèrent des alertes de sécurité.",
        espTratorTit: "Force de Traction / RPM", espTratorSub: "Rotation Active du Moteur",
        espColheTit: "Capacité de la Trémie", espColheSub: "kg chargés", espColheAlerta: "💥 TRÉMIE PLEINE! 💥",
        espPulvTit: "Pression de Rampe de Flux", espPulvSub: "Niveau du Réservoir Bouillie"
    }
};

const modelosMaquinas = {
    trator: [
        { id: "t_john_8r", nome: "John Deere 8R 410", tanqueMax: 710, liqMotorMax: 40, liqOleoMax: 105 },
        { id: "t_case_magnum", nome: "Case IH Magnum 400", tanqueMax: 680, liqMotorMax: 38, liqOleoMax: 100 },
        { id: "t_massey_8700", nome: "Massey Ferguson 8700S", tanqueMax: 630, liqMotorMax: 35, liqOleoMax: 95 }
    ],
    colheitadeira: [
        { id: "c_case_9250", nome: "Case IH Axial-Flow 9250", tanqueMax: 1130, liqMotorMax: 65, liqOleoMax: 180 },
        { id: "c_john_s700", nome: "John Deere S790", tanqueMax: 1250, liqMotorMax: 72, liqOleoMax: 190 },
        { id: "c_new_cr10", nome: "New Holland CR 10.90", tanqueMax: 1300, liqMotorMax: 75, liqOleoMax: 210 }
    ],
    pulverizador: [
        { id: "p_jacto_uniport", nome: "Jacto Uniport 4530", tanqueMax: 400, liqMotorMax: 28, liqOleoMax: 85 },
        { id: "p_stara_imperador", nome: "Stara Imperador 4000", tanqueMax: 450, liqMotorMax: 32, liqOleoMax: 90 }
    ]
};

let idiomaAtual = 'pt';
let maquinaAtual = 'trator';
let modeloSelecionado = modelosMaquinas.trator[0];

function mudarMaquina(tipo) {
    maquinaAtual = tipo;
    document.querySelectorAll('.aba-btn').forEach(btn => btn.classList.remove('ativo'));
    document.getElementById(`aba-${tipo}`).classList.add('ativo');
    
    // Atualiza a lista de modelos no Select
    const seletorMod = document.getElementById("seletor-modelo");
    seletorMod.innerHTML = "";
    modelosMaquinas[tipo].forEach(mod => {
        let opt = document.createElement("option");
        opt.value = mod.id;
        opt.innerText = mod.nome;
        seletorMod.appendChild(opt);
    });
    
    modeloSelecionado = modelosMaquinas[tipo][0];
    mudarIdioma(idiomaAtual);
}

function mudarModelo(idModelo) {
    modeloSelecionado = modelosMaquinas[maquinaAtual].find(m => m.id === idModelo);
}

function mudarIdioma(lang) {
    idiomaAtual = lang;
    const dict = dicionario[lang];

    document.getElementById("txt-logo").innerText = dict.logo;
    document.getElementById("lbl-velocidade").innerText = dict.velocidade;
    document.getElementById("lbl-odometro").innerText = dict.odometro;
    document.getElementById("lbl-combustivel").innerText = dict.combustivel;
    document.getElementById("lbl-consumo").innerText = dict.consumo;
    document.getElementById("lbl-pressao").innerText = dict.pressao;
    document.getElementById("lbl-temperatura").innerText = dict.temperatura;
    document.getElementById("lbl-co2").innerText = dict.co2;
    document.getElementById("lbl-pegada-carbono").innerText = dict.pegada;
    document.getElementById("lbl-agenda-tit").innerText = dict.agendaTit;
    document.getElementById("lbl-agenda-inicio").innerText = dict.agendaIni;
    document.getElementById("lbl-agenda-fim").innerText = dict.agendaFim;
    document.getElementById("lbl-shutdown-tit").innerText = dict.shutdownTit;
    document.getElementById("lbl-shutdown-txt").innerText = dict.shutdownTxt;
    document.getElementById("lbl-ti-titulo").innerText = dict.tiTitulo;
    document.getElementById("lbl-ti-desc").innerText = dict.tiDesc;
    document.getElementById("lbl-passo1-tit").innerText = dict.p1t;
    document.getElementById("lbl-passo1-txt").innerText = dict.p1x;
    document.getElementById("lbl-passo2-tit").innerText = dict.p2t;
    document.getElementById("lbl-passo2-txt").innerText = dict.p2x;
    document.getElementById("lbl-passo3-tit").innerText = dict.p3t;
    document.getElementById("lbl-passo3-txt").innerText = dict.p3x;

    const cardEsp = document.getElementById("card-especifico");
    cardEsp.classList.remove("alerta-cheio");

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
    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
        btn.innerText = "🌙 Dark Mode";
    } else {
        html.setAttribute("data-theme", "dark");
        btn.innerText = "☀️ Light Mode";
    }
}

// Inicializa a primeira vez
window.addEventListener('DOMContentLoaded', () => {
    mudarMaquina('trator');
});