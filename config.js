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
        titParanaPotencia: "🌾 O Paraná como Potência da Agricultura de Precisão",
        pParana1: "O estado do Paraná é um dos maiores pilares do agronegócio mundial e referência em produtividade. Com uma geografia diversa e a fértil \"terra roxa\" (norte e oeste, polos como Rolândia), tornou-se laboratório de inovação rurais. Com o Plantio Direto, monitorar maquinário evita compactação excessiva e otimiza janelas de plantio frente ao clima dinâmico.",
        titOQueESelemetria: "🛰️ O que é a Telemetria de Máquinas Agrícolas?",
        pTelemetria1: "A telemetria é o sistema nervoso da máquina. Baseada na Internet das Coisas (IoT), tratores e colheitadeiras com barramento CAN e GPS enviam dados físicos em tempo real para nuvem. Monitora-se temperatura, consumo por hectare, velocidade e patinagem (deslizamento).",
        titParaQueServe: "🎯 Para que serve o site AGROSTREAM?",
        pParaQueServe1: "AGROSTREAM é um Gêmeo Digital (Digital Twin). Ele simula o campo dinâmico para prever custos, analisar consumo de diesel, monitorar falhas operacionais e o impacto ambiental.",
        btnAjudaTexto: "Como funciona o simulador? (Clique para ver)",
        titComoFunciona: "Passo a Passo da Simulação (Motor Atualizado):",
        passo1Tit: "1. Setup: Escolha máquina, cultura e cotações. Aplique carga.", passo2Tit: "2. Clima (Paraná Weather): Se chover, pulverizador para e solo escorrega. Geada corta velocidade.", passo3Tit: "3. Física IoT: Peso eleva consumo de diesel e temperatura.", passo4Tit: "4. Alertas: Se chover e estiver pesado, há risco de Patinagem e Compactação de Solo.", passo5Tit: "5. Manutenção: Se motor passar de 95°C, Chame Oficina ou motor fundirá.",
        titPainelSim: "🖥️ Painel Integrado de Telemetria IoT", lblStatusSim: "SIMULAÇÃO:",
        titSetup: "Configuração", lblCultura: "Cultura:", lblDiesel: "Diesel (L):", lblCargaIni: "Carga (kg):", lblDieselPreco: "⛽ Diesel (R$/L):", lblSacaPreco: "🌾 Saca (R$):", btnAplicar: "✅ APLICAR CARGA",
        titMovimento: "Operação & Clima", lblOdo: "ODÔMETRO:", lblArea: "ÁREA:", lblClima: "CLIMA:",
        titDiesel: "Tanque Diesel", titTemp: "Temperatura Motor", btnManutencao: "🔧 CHAMAR OFICINA (-15°C)",
        titArmazem: "Carga & Produtividade", lblSacasColhidas: "🚜 SACAS:", titFinancas: "Financeiro", titEco: "Sustentabilidade", titLog: "Histórico IoT Log",
        climaSol: "☀️ ENSOLARADO", climaChuva: "🌧️ CHOVENDO", climaGeada: "❄️ GEADA",
        msgChuvaAlerta: "IoT Alerta: Chuva detectada no Paraná. Velocidade reduzida, pulverizadores parados.",
        msgManutencao: "Oficina Móvel acionada! Motor resfriado em 15°C. Custo: R$500.",
        msgPatinagem: "ALERTA IoT: Patinagem detectada. Solo sofrendo compactação severa!",
        statusParada: "PARADA", statusRodando: "RODANDO", txtCalorTitulo: "🚨 MOTOR FUNDIDO 🚨", txtCalorSub: "Temperatura Crítica Critical detectada (>102°C).", txtBtnReiniciar: "REINICIAR SISTEMA"
    },
    en: {
        titParanaPotencia: "🌾 Paraná: Agribusiness Powerhouse",
        pParana1: "Paraná State is a global agricultural cornerstone, pioneer in No-Till farming to protect its rich red soil. This creates a laboratory for innovation in Rolândia and other hubs. Monitoring fleets prevents soil compaction and optimizes planting windows.",
        titOQueESelemetria: "🛰️ What is Agricultural Telemetry?",
        pTelemetria1: "Telemetry is the machine's nervous system. Based on IoT, it transmits real-time physics data (CAN Bus, GPS) to the cloud. It monitors temperature, consumption/hectare, speed, and wheel slip.",
        titParaQueServe: "🎯 What serves AGROSTREAM?",
        pParaQueServe1: "AGROSTREAM is a Digital Twin. It simulates fields to forecast costs, analyze diesel use, manage mechanical crises, and calculate environmental impact.",
        btnAjudaTexto: "How does the simulator work?", titComoFunciona: "Simulation Guide (IoT Physics):",
        passo1Tit: "1. Setup machine and apply initial load.", passo2Tit: "2. Weather: Rain stops sprayers, creates soil slip risk.", passo3Tit: "3. IoT Physics: Load raises diesel consumption and engine temperature.", passo4Tit: "4. Alerts: Risk of Slippage & Soil Compaction.", passo5Tit: "5. Maintenance: If >95°C, Call Office to cool down.",
        titPainelSim: "🖥️ IoT Telemetry Dashboard", lblStatusSim: "SIMULATION:",
        titSetup: "Setup", lblCultura: "Crop:", lblDiesel: "Diesel (L):", lblCargaIni: "Load (kg):", lblDieselPreco: "⛽ Diesel ($/L):", lblSacaPreco: "🌾 Bag ($):", btnAplicar: "✅ APPLY LOAD",
        titMovimento: "Operation & Weather", lblOdo: "ODOMETER:", lblArea: "AREA:", lblClima: "WEATHER:",
        titDiesel: "Diesel Tank", titTemp: "Engine Temp", btnManutencao: "🔧 CALL MAINTENANCE (-15°C)",
        titArmazem: "Productivity", lblSacasColhidas: "🚜 BAGS:", titFinancas: "Financials", titEco: "Sustainability", titLog: "History IoT Log",
        climaSol: "☀️ SUNNY", climaChuva: "🌧️ RAINING", climaGeada: "❄️ FROST", msgChuvaAlerta: "IoT Alert: Rain detected in PR. Speed reduced, sprayers halted.", msgManutencao: "Mobile Shop activated! Engine cooled by 15°C. Cost: $500.", msgPatinagem: "IoT WARNING: Slippage detected. Severe soil compaction risk!", statusParada: "STOPPED", statusRodando: "RUNNING", txtCalorTitulo: "🚨 ENGINE BLOWN 🚨", txtCalorSub: "Critical Critical temperature detected (>102°C).", txtBtnReiniciar: "REBOOT SYSTEM"
    },
    es: {
        titParanaPotencia: "🌾 Paraná: Potencia Agropecuaria",
        pParana1: "El estado de Paraná es un pilar global, pionero en Siembra Directa para proteger su rico suelo rojo. Esto genera innovación en Rolândia. El monitoreo de flotas evita la compactación y optimiza las siembras.",
        titOQueESelemetria: "🛰️ ¿Qué es la Telemetría Agrícola?",
        pTelemetria1: "La telemetría es el sistema nervioso. Basado en IoT, transmite datos mecánicos y de GPS en tiempo real a la nube (CAN Bus). Monitorea temperatura, consumo por hectárea, velocidad y patinaje.",
        titParaQueServe: "🎯 ¿Para qué sirve AGROSTREAM?",
        pParaQueServe1: "AGROSTREAM es un Gemelo Digital. Simula campos para prever costos, gestionar crisis mecánicas y calcular huella ambiental.",
        btnAjudaTexto: "¿Cómo funciona el simulador?", titComoFunciona: "Guía de Simulación (Motor Actualizado):",
        passo1Tit: "1. Setup de máquina y carga inicial.", passo2Tit: "2. Clima: Lluvia detiene pulverizador, aumenta riesgo patinaje.", passo3Tit: "3. Física IoT: Carga eleva diésel y temperatura.", passo4Tit: "4. Alertas: Riesgo de Patinaje y Compactación.", passo5Tit: "5. Mantenimiento: ¡Llama al taller si >95°C!", titPainelSim: "🖥️ Panel de Telemetría", lblStatusSim: "SIMULACIÓN:", btnAplicar: "✅ APLICAR CARGA", titMovimento: "Operación & Clima", titDiesel: "Tanque Diésel", titTemp: "Temp. Motor", btnManutencao: "🔧 LLAMAR TALLER (-15°C)", titArmazem: "Productividad", titFinancas: "Financiero", titEco: "Sustentabilidad", titLog: "Registro IoT", climaSol: "☀️ SOLEADO", climaChuva: "🌧️ LLOVIENDO", climaGeada: "❄️ HELADA", msgChuvaAlerta: "Alerta IoT: Lluvia en PR. Velocidad reducida.", msgManutencao: "Taller móvil activado! Costo: $500.", msgPatinagem: "ADVERTENCIA IoT: Patinaje. ¡Riesgo compactación de suelo!", statusParada: "PARADA", statusRodando: "EN MARCHA", txtCalorTitulo: "🚨 MOTOR FUNDIDO 🚨", txtCalorSub: "Temperatura Crítica detected (>102°C).", txtBtnReiniciar: "REINICIAR SISTEMA"
    },
    fr: {
        titParanaPotencia: "🌾 Paraná: Puissance de l'Agribusiness",
        pParana1: "L'État du Paraná est un pilier mondial, pionnier du Semis Direct pour protéger son sol rouge. Il favorise l'innovation à Rolândia. Le monitoring évite la compaction du sol.",
        titOQueESelemetria: "🛰️ Qu'est-ce que la Télémétrie?",
        pTelemetria1: "La télémétrie est le système nerveux. Basé sur l'IoT, il transmet des données physiques et GPS en temps réel au cloud (Bus CAN). Surveille température, consommation/hectare, vitesse, patinage.",
        titParaQueServe: "🎯 À quoi sert AGROSTREAM?",
        pParaQueServe1: "AGROSTREAM est un Jumeau Numérique. Simule champs pour prévoir coûts, gérer les crises mécaniques et calculer huile environnemental.",
        btnAjudaTexto: "Comment fonctionne le simulateur?", titComoFunciona: "Guide de Simulation (Moteur mis à jour):",
        passo1Tit: "1. Setup machine et charger carga.", passo2Tit: "2. Climat: Pluie arrête pulvérisateur, risque patinage.", passo3Tit: "3. IoT: Carga élève diesel et température.", passo4Tit: "4. Alertes: Risque Patinage & Compaction du Sol.", passo5Tit: "5. Maintenance: Appelez mécanicien si >95°C!", titPainelSim: "🖥️ Tableau de Bord", lblStatusSim: "SIMULATION:", btnAplicar: "✅ APPLIQUER CHARGA", titMovimento: "Opération & Météo", titDiesel: "Réservoir Diesel", titTemp: "Temp. Moteur", btnManutencao: "🔧 APPELER MÉCANICIEN (-15°C)", titArmazem: "Productivité", titFinancas: "Finances", titEco: "Durabilité", titLog: "Journal IoT", climaSol: "☀️ ENSOLEILLÉ", climaChuva: "🌧️ PLUVIEUX", climaGeada: "❄️ GEL", msgChuvaAlerta: "Alerte IoT: Pluie. Vitesse réduite.", msgManutencao: "Mécanicien appelé! Coût: $500.", msgPatinagem: "AVERTISSEMENT IoT: Patinage detected!", statusParada: "ARRÊTÉ", statusRodando: "EN COURS", txtCalorTitulo: "🚨 MOTEUR CASSÉ 🚨", txtCalorSub: "Critical temperature (>102°C).", txtBtnReiniciar: "RÉINITIALISER"
    },
    zh: {
        titParanaPotencia: "🌾 巴拉那州：农业强州",
        pParana1: "巴拉那州是全球农业支柱，免耕法先驱，保护富饶红土。罗兰迪亚及其他中心已成为创新实验室。车队监控可防止土壤压实并优化播种。",
        titOQueESelemetria: "🛰️ 什么是农业遥测技术？",
        pTelemetria1: "遥测是机器的神经系统。基于物联网技术，通过CAN总线和GPS实时将物理数据传输至云端。监控温度、单公顷油耗、速度和打滑。",
        titParaQueServe: "🎯 AGROSTREAM有何用途？",
        pParaQueServe1: "AGROSTREAM 是数字孪生系统。模拟田间作业以预测成本，监控运营故障及环境影响。",
        btnAjudaTexto: "模拟器如何工作？", titComoFunciona: "模拟指南（物联网物理）：",
        passo1Tit: "1. 设置机器并应用初始负载。", passo2Tit: "2. 天气：雨天喷洒停止，土壤打滑风险增加。", passo3Tit: "3. 物联网物理：负载增加柴油消耗和发动机温度。", passo4Tit: "4. 警报：打滑和土壤压实风险。", passo5Tit: "5. 维护：如果温度> 95°C，呼叫办公室以降温。",
        titPainelSim: "🖥️ 物联网遥测仪表板", lblStatusSim: "模拟：", titSetup: "设置", lblCultura: "作物：", lblDiesel: "柴油 (L)：", lblCargaIni: "负载 (kg)：", lblDieselPreco: "⛽ 柴油 ($/L)：", lblSacaPreco: "🌾 袋数 ($)：", btnAplicar: "✅ 应用负载", titMovimento: "操作和天气", lblArea: "面积 (ha)：", titDiesel: "柴油箱", titTemp: "发动机温度", btnManutencao: "🔧 呼叫维修人员 (-15°C)", titArmazem: "生产力", titFinancas: "财务", titEco: "可持续性", titLog: "物联网日志", climaSol: "☀️ 晴天", climaChuva: "🌧️ 下雨", climaGeada: "❄️ 霜冻", msgChuvaAlerta: "物联网警报：下雨。速度降低，喷洒停止。", msgManutencao: "呼叫维修人员！成本：$500。", msgPatinagem: "物联网警告：检测到打滑！打滑风险压实！", statusParada: "已停止", statusRodando: "运行中", txtCalorTitulo: "🚨 发动机损坏 🚨", txtCalorSub: "Critical temperature (>102°C).", txtBtnReiniciar: "重启系统"
    }
};

function alternarTema() {
    const h = document.documentElement;
    h.setAttribute("data-theme", h.getAttribute("data-theme") === "dark" ? "light" : "dark");
}