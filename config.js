const frota = {
    trator: [
        { nome: "John Deere 8R 410", tanque: 710, agua: 45, carga: 5000 },
        { nome: "Massey Ferguson 8700S", tanque: 630, agua: 38, carga: 4500 },
        { nome: "Case IH Magnum 400", tanque: 678, agua: 40, carga: 4800 },
        { nome: "New Holland T9.560", tanque: 1160, agua: 50, carga: 9000 },
        { nome: "Valtra T250 CVTO", tanque: 420, agua: 30, carga: 3800 }
    ],
    colheitadeira: [
        { nome: "New Holland CR 10.90", tanque: 1300, agua: 90, carga: 14500 },
        { nome: "Case IH Axial-Flow 9250", tanque: 1130, agua: 85, carga: 12000 },
        { nome: "John Deere S7 900", tanque: 1250, agua: 85, carga: 14100 },
        { nome: "Claas Lexion 8900", tanque: 1500, agua: 100, carga: 18000 },
        { nome: "Fendt Ideal 9T", tanque: 1250, agua: 90, carga: 17100 }
    ],
    pulverizador: [
        { nome: "Jacto Uniport 4530", tanque: 400, agua: 3000, carga: 3500 },
        { nome: "Stara Imperador 4000", tanque: 450, agua: 4000, carga: 4000 }
    ]
};

let catAtiva = 'trator';
let modAtivo = frota.trator[0];
let idiomaAtivo = 'pt';

const dicionario = {
    pt: {
        titBoasVindas: "🛰️ O que é Telemetria de Máquinas Agrícolas?",
        pIntro1: "A telemetria é o sistema nervoso da Agricultura de Precisão. Através de sensores e GPS conectados, tratores e colheitadeiras enviam dados mecânicos em tempo real para a nuvem. No Estado do Paraná, um dos maiores polos do agronegócio e cooperativismo global, essa tecnologia é fundamental. Monitorar o maquinário evita a compactação da rica terra roxa paranaense, otimiza janelas de plantio e garante eficiência.",
        pIntro2: "O AGROSTREAM é um Gêmeo Digital (Digital Twin). Ele simula o ambiente dinâmico do campo para prever custos, analisar consumo de diesel, monitorar falhas operacionais e o impacto ambiental.",
        btnAjudaTexto: "Como funciona o simulador? (Clique para ver)",
        titComoFunciona: "Passo a Passo da Simulação:",
        passo1Tit: "1. Escolha a máquina. O sistema calculará peso, consumo e área coberta.", passo2Tit: "2. Clima: Se chover, pulverizadores param e o solo escorrega.", passo3Tit: "3. Temperatura: Se passar de 95°C, solicite manutenção!", passo4Tit: "4. Aplique a carga e clique em START.",
        titPainelSim: "🖥️ Painel Integrado de Telemetria", lblStatusSim: "SIMULAÇÃO:",
        titSetup: "Configuração", lblCultura: "Cultura:", lblDiesel: "Diesel (L):", lblCargaIni: "Carga (kg):", lblDieselPreco: "⛽ Diesel (R$/L):", lblSacaPreco: "🌾 Saca (R$):", btnAplicar: "✅ APLICAR CARGA",
        titMovimento: "Operação & Clima", lblOdo: "ODÔMETRO:", lblArea: "ÁREA:", lblClima: "CLIMA ATUAL:",
        titDiesel: "Tanque Diesel", titTemp: "Temperatura Motor", btnManutencao: "🔧 CHAMAR OFICINA (-15°C)",
        titArmazem: "Carga & Produtividade", lblSacasColhidas: "🚜 SACAS:", titFinancas: "Financeiro", titEco: "Sustentabilidade", titLog: "Histórico IoT",
        climaSol: "☀️ ENSOLARADO", climaChuva: "🌧️ CHOVENDO", climaGeada: "❄️ GEADA",
        msgChuvaAlerta: "Alerta IoT: Chuva detectada no Paraná. Velocidade reduzida, risco de patinagem.",
        msgManutencao: "Oficina Móvel acionada! Motor resfriado em 15°C. Custo: R$500.",
        msgPatinagem: "ALERTA: Patinagem detectada. Solo sofrendo compactação severa!",
        statusParada: "PARADA", statusRodando: "RODANDO", txtCalorTitulo: "🚨 MOTOR FUNDIDO 🚨", txtCalorSub: "Temperatura passou de 102°C.", txtBtnReiniciar: "REINICIAR SISTEMA"
    },
    en: {
        titBoasVindas: "🛰️ What is Agricultural Telemetry?",
        pIntro1: "Telemetry is the nervous system of Precision Agriculture. Through connected sensors and GPS, tractors send real-time data to the cloud. In Paraná State, a global agribusiness hub, this technology is vital. Monitoring machinery prevents compaction of the rich purple soil and optimizes planting windows.",
        pIntro2: "AGROSTREAM is a Digital Twin. It simulates the dynamic field environment to forecast costs, analyze diesel consumption, and monitor environmental impact.",
        btnAjudaTexto: "How does the simulator work?", titComoFunciona: "Simulation Guide:",
        passo1Tit: "1. Choose the machine.", passo2Tit: "2. Weather: Rain stops sprayers.", passo3Tit: "3. Temp: Call maintenance if >95°C!", passo4Tit: "4. Apply load and START.",
        titPainelSim: "🖥️ Telemetry Dashboard", lblStatusSim: "SIMULATION:",
        titSetup: "Setup", lblCultura: "Crop:", lblDiesel: "Diesel (L):", lblCargaIni: "Load (kg):", lblDieselPreco: "⛽ Diesel ($/L):", lblSacaPreco: "🌾 Bag ($):", btnAplicar: "✅ APPLY LOAD",
        titMovimento: "Operation & Weather", lblOdo: "ODOMETER:", lblArea: "AREA:", lblClima: "CURRENT WEATHER:",
        titDiesel: "Diesel Tank", titTemp: "Engine Temp", btnManutencao: "🔧 CALL MECHANIC (-15°C)",
        titArmazem: "Load & Productivity", lblSacasColhidas: "🚜 BAGS:", titFinancas: "Financials", titEco: "Sustainability", titLog: "IoT Log",
        climaSol: "☀️ SUNNY", climaChuva: "🌧️ RAINING", climaGeada: "❄️ FROST",
        msgChuvaAlerta: "IoT Alert: Rain detected. Speed reduced, slip risk.",
        msgManutencao: "Mobile Mechanic called! Engine cooled by 15°C. Cost: R$500.",
        msgPatinagem: "WARNING: Tire slip detected. Soil is suffering severe compaction!",
        statusParada: "STOPPED", statusRodando: "RUNNING", txtCalorTitulo: "🚨 ENGINE BLOWN 🚨", txtCalorSub: "Temp exceeded 102°C.", txtBtnReiniciar: "REBOOT SYSTEM"
    },
    es: {
        titBoasVindas: "🛰️ ¿Qué es la Telemetría Agrícola?",
        pIntro1: "La telemetría es el sistema nervioso de la Agricultura de Precisión. A través de GPS, los tractores envían datos a la nube en tiempo real. En el Estado de Paraná, esto es vital para evitar la compactación del suelo rojo y optimizar las siembras.",
        pIntro2: "AGROSTREAM es un Gemelo Digital. Simula el campo para prever costos y consumo.",
        btnAjudaTexto: "¿Cómo funciona el simulador?", titComoFunciona: "Guía de Simulación:",
        passo1Tit: "1. Elige la máquina.", passo2Tit: "2. Clima: La lluvia detiene pulverizadores.", passo3Tit: "3. Temp: ¡Llama al taller si >95°C!", passo4Tit: "4. Aplicar carga y START.",
        titPainelSim: "🖥️ Panel de Telemetría", lblStatusSim: "SIMULACIÓN:", titSetup: "Configuración", lblCultura: "Cultivo:", lblDiesel: "Diésel (L):", lblCargaIni: "Carga (kg):", lblDieselPreco: "⛽ Diésel (R$/L):", lblSacaPreco: "🌾 Saco (R$):", btnAplicar: "✅ APLICAR CARGA",
        titMovimento: "Operación y Clima", lblOdo: "ODÓMETRO:", lblArea: "ÁREA:", lblClima: "CLIMA ACTUAL:", titDiesel: "Tanque Diésel", titTemp: "Temp. Motor", btnManutencao: "🔧 LLAMAR TALLER (-15°C)",
        titArmazem: "Productividad", lblSacasColhidas: "🚜 SACOS:", titFinancas: "Financiero", titEco: "Sustentabilidad", titLog: "Registro IoT",
        climaSol: "☀️ SOLEADO", climaChuva: "🌧️ LLOVIENDO", climaGeada: "❄️ HELADA", msgChuvaAlerta: "Alerta: Lluvia detectada. Velocidad reducida.", msgManutencao: "¡Taller móvil activado! Costo: R$500.", msgPatinagem: "ALERTA: Patinaje detectado. ¡Compactación del suelo!", statusParada: "DETENIDA", statusRodando: "EN MARCHA", txtCalorTitulo: "🚨 MOTOR FUNDIDO 🚨", txtCalorSub: "Temperatura superó 102°C.", txtBtnReiniciar: "REINICIAR SISTEMA"
    },
    fr: {
        titBoasVindas: "🛰️ Qu'est-ce que la Télémétrie?",
        pIntro1: "La télémétrie est le système nerveux de l'Agriculture de Précision.", pIntro2: "AGROSTREAM est un Jumeau Numérique.",
        btnAjudaTexto: "Comment fonctionne le simulateur?", titComoFunciona: "Guide de Simulation:",
        passo1Tit: "1. Choisissez la machine.", passo2Tit: "2. Météo: La pluie arrête les pulvérisateurs.", passo3Tit: "3. Temp: Appelez le mécanicien si >95°C!", passo4Tit: "4. Appliquez la charge et START.",
        titPainelSim: "🖥️ Tableau de Bord", lblStatusSim: "SIMULATION:", titSetup: "Configuration", lblCultura: "Culture:", lblDiesel: "Diesel (L):", lblCargaIni: "Charge (kg):", lblDieselPreco: "⛽ Diesel (R$/L):", lblSacaPreco: "🌾 Sac (R$):", btnAplicar: "✅ APPLIQUER LA CHARGE",
        titMovimento: "Opération & Météo", lblOdo: "ODOMÈTRE:", lblArea: "SURFACE:", lblClima: "MÉTÉO ACTUELLE:", titDiesel: "Réservoir Diesel", titTemp: "Temp. Moteur", btnManutencao: "🔧 APPELER MÉCANICIEN (-15°C)",
        titArmazem: "Productivité", lblSacasColhidas: "🚜 SACS:", titFinancas: "Finance", titEco: "Durabilité", titLog: "Journal IoT",
        climaSol: "☀️ ENSOLEILLÉ", climaChuva: "🌧️ PLUVIEUX", climaGeada: "❄️ GEL", msgChuvaAlerta: "Alerte: Pluie détectée. Vitesse réduite.", msgManutencao: "Mécanicien appelé! Coût: R$500.", msgPatinagem: "ALERTE: Patinage détecté!", statusParada: "ARRÊTÉ", statusRodando: "EN COURS", txtCalorTitulo: "🚨 MOTEUR CASSÉ 🚨", txtCalorSub: "Temp > 102°C.", txtBtnReiniciar: "REDÉMARRER"
    },
    zh: {
        titBoasVindas: "🛰️ 什么是农业遥测技术？",
        pIntro1: "遥测是精准农业的神经系统。通过传感器，拖拉机将实时数据发送到云端。在巴拉那州，这项技术至关重要。", pIntro2: "AGROSTREAM 是一个数字孪生系统，用于模拟田间作业以预测成本。",
        btnAjudaTexto: "模拟器如何工作？", titComoFunciona: "模拟指南：",
        passo1Tit: "1. 选择机器。", passo2Tit: "2. 天气：雨天停止喷洒。", passo3Tit: "3. 温度：如果> 95°C，请呼叫维修！", passo4Tit: "4. 应用负载并开始。",
        titPainelSim: "🖥️ 遥测仪表板", lblStatusSim: "模拟：", titSetup: "设置", lblCultura: "作物：", lblDiesel: "柴油 (L)：", lblCargaIni: "负载 (kg)：", lblDieselPreco: "⛽ 柴油 (R$/L)：", lblSacaPreco: "🌾 袋 (R$)：", btnAplicar: "✅ 应用负载",
        titMovimento: "操作和天气", lblOdo: "里程表：", lblArea: "面积：", lblClima: "当前天气：", titDiesel: "柴油箱", titTemp: "发动机温度", btnManutencao: "🔧 呼叫维修 (-15°C)",
        titArmazem: "生产力", lblSacasColhidas: "🚜 袋数：", titFinancas: "财务", titEco: "可持续性", titLog: "物联网日志",
        climaSol: "☀️ 晴天", climaChuva: "🌧️ 下雨", climaGeada: "❄️ 霜冻", msgChuvaAlerta: "物联网警报：检测到下雨，速度降低。", msgManutencao: "维修人员已呼叫！费用：R$500。", msgPatinagem: "警告：检测到打滑！", statusParada: "已停止", statusRodando: "运行中", txtCalorTitulo: "🚨 发动机损坏 🚨", txtCalorSub: "温度超过 102°C。", txtBtnReiniciar: "重启系统"
    }
};

function alternarTema() {
    const h = document.documentElement;
    h.setAttribute("data-theme", h.getAttribute("data-theme") === "dark" ? "light" : "dark");
}