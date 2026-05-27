const frota = {
    trator: [
        { nome: "John Deere 8R 410", tanque: 710, carga: 5000 },
        { nome: "Case IH Magnum 400", tanque: 680, carga: 4800 },
        { nome: "Massey Ferguson 8700S", tanque: 630, carga: 4500 }
    ],
    colheitadeira: [
        { nome: "New Holland CR 10.90", tanque: 1300, carga: 14500 },
        { nome: "John Deere S7 900", tanque: 1250, carga: 14100 },
        { nome: "Case IH Axial-Flow 9250", tanque: 1130, carga: 12000 }
    ],
    pulverizador: [
        { nome: "Jacto Uniport 4530", tanque: 400, carga: 3500 },
        { nome: "Stara Imperador 4000", tanque: 450, carga: 4000 }
    ]
};

const dicionario = {
    pt: {
        titParana: "🌾 O Paraná e a Fronteira da Inovação Agrícola",
        pParana: "O estado do Paraná é o coração pulsante do agronegócio brasileiro. Com o solo de \"terra roxa\" mais fértil do país...",
        titTelemetria: "🛰️ Tecnologia de Telemetria IoT",
        pTelemetria: "A telemetria agrícola é a ciência de medir dados à distância...",
        titObjetivo: "🎯 Propósito do AGROSTREAM",
        pObjetivo: "Este simulador é um Gêmeo Digital projetado para educar e otimizar...",
        btnAjuda: "MANUAL COMPLETO DO SIMULADOR (Clique aqui)",
        ajudaTit1: "1. Planejamento", ajudaP1: "Escolha o modelo da máquina e configure os preços.",
        ajudaTit2: "2. Operação", ajudaP2: "Clique em 'Aplicar Carga' e controle as variáveis climáticas.",
        ajudaTit3: "3. Monitoramento", ajudaP3: "Evite sobrecarga para o motor não fundir.",
        ajudaTit4: "4. Finalização", ajudaP4: "Clique em STOP para ler o relatório consolidado.",
        titSim: "🖥️ Terminal de Telemetria", titConfig: "Configuração Inicial", lblCultura: "Cultura:",
        lblDiesel: "Diesel (L):", lblCarga: "Carga (kg):", btnAplicar: "✅ APLICAR CARGA",
        titGps: "Posicionamento & Clima", lblArea: "Área:", titFinanceiro: "Balanço Financeiro",
        lblSaldo: "SALDO LÍQUIDO ATUAL", titCombustivel: "Nível Combustível", titTemp: "Temperatura",
        titSustentavel: "Sustentabilidade", titLog: "Log de Eventos IoT"
    },
    en: {
        titParana: "🌾 Paraná and Agricultural Innovation",
        pParana: "Paraná State is the pulsing heart of Brazilian agribusiness, with rich red soil...",
        titTelemetria: "🛰️ IoT Telemetry Technology",
        pTelemetria: "Agricultural telemetry is the science of remote measuring...",
        titObjetivo: "🎯 Propósito do AGROSTREAM",
        pObjetivo: "This simulator is a Digital Twin designed to educate...",
        btnAjuda: "COMPLETE SIMULATOR MANUAL (Click here)",
        ajudaTit1: "1. Planning", ajudaP1: "Choose your fleet type and adjust the commodity prices.",
        ajudaTit2: "2. Operation", ajudaP2: "Click 'Apply Load' and monitor real-time data.",
        ajudaTit3: "3. Monitoring", ajudaP3: "Watch engine heat limits under heavy load.",
        ajudaTit4: "4. Closing", ajudaP4: "Press STOP to fetch the financial breakdown.",
        titSim: "🖥️ Telemetry Terminal", titConfig: "Initial Configuration", lblCultura: "Crop:",
        lblDiesel: "Diesel (L):", lblCarga: "Load (kg):", btnAplicar: "✅ APPLY LOAD",
        titGps: "Positioning & Weather", lblArea: "Area:", titFinanceiro: "Financial Balance",
        lblSaldo: "CURRENT NET BALANCE", titCombustivel: "Fuel Level", titTemp: "Temperature",
        titSustentavel: "Sustainability", titLog: "IoT Event Log"
    },
    es: {
        titParana: "🌾 Paraná y la Innovación Agrícola",
        pParana: "El estado de Paraná es el corazón del agronegocio...",
        titTelemetria: "🛰️ Tecnología de Telemetría IoT",
        pTelemetria: "La telemetría agrícola es la ciencia de medir a distancia...",
        titObjetivo: "🎯 Propósito de AGROSTREAM",
        pObjetivo: "Este simulador es un Gemelo Digital...",
        btnAjuda: "MANUAL COMPLETO (Haga clic aquí)",
        ajudaTit1: "1. Planificación", ajudaP1: "Elija el modelo de máquina y configure precios.",
        ajudaTit2: "2. Operación", ajudaP2: "Haga clic en 'Aplicar Carga' y corra la simulación.",
        ajudaTit3: "3. Monitoreo", ajudaP3: "Evite el sobrecalentamiento crítico del motor.",
        ajudaTit4: "4. Finalización", ajudaP4: "Haga clic en STOP para ver el informe de ganancias.",
        titSim: "🖥️ Terminal de Telemetría", titConfig: "Configuración Inicial", lblCultura: "Cultivo:",
        lblDiesel: "Diésel (L):", lblCarga: "Carga (kg):", btnAplicar: "✅ APLICAR CARGA",
        titGps: "Posicionamiento & Clima", lblArea: "Área:", titFinanceiro: "Balance Financiero",
        lblSaldo: "SALDO LÍQUIDO ACTUAL", titCombustivel: "Nivel Combustible", titTemp: "Temperatura",
        titSustentavel: "Sustentabilidad", titLog: "Registro de IoT"
    },
    fr: {
        titParana: "🌾 Le Paraná et l'Innovation Agricole",
        pParana: "L'état du Paraná est le cœur battant de l'agriculture...",
        titTelemetria: "🛰️ Technologie de Télémétrie IoT",
        pTelemetria: "La télémétrie est la science de la mesure à distance...",
        titObjetivo: "🎯 Objectif de AGROSTREAM",
        pObjetivo: "Ce simulateur est un Jumeau Numérique...",
        btnAjuda: "MANUEL COMPLET (Cliquez ici)",
        ajudaTit1: "1. Planification", ajudaP1: "Choisissez la machine et configurez les coûts.",
        ajudaTit2: "2. Opération", ajudaP2: "Cliquez sur 'Appliquer Charge' pour lancer le moteur.",
        ajudaTit3: "3. Surveillance", ajudaP3: "Surveillez la surchauffe thermique du bloc moteur.",
        ajudaTit4: "4. Clôture", ajudaP4: "Cliquez sur STOP pour générer le bilan financier.",
        titSim: "🖥️ Terminal de Télémétrie", titConfig: "Configuration Initiale", lblCultura: "Culture:",
        lblDiesel: "Diesel (L):", lblCarga: "Charge (kg):", btnAplicar: "✅ APPLIQUER CHARGE",
        titGps: "Position & Météo", lblArea: "Surface:", titFinanceiro: "Bilan Financier",
        lblSaldo: "SOLDE NET ACTUEL", titCombustivel: "Niveau Carburant", titTemp: "Température",
        titSustentavel: "Durabilité", titLog: "Log d'Événements IoT"
    },
    zh: {
        titParana: "🌾 巴拉那州与农业创新进阶",
        pParana: "巴拉那州是巴西农业的核心，拥有最肥沃的红土地...",
        titTelemetria: "🛰️ 物联网遥测技术系统",
        pTelemetria: "农业遥测是通过无线网络远程采集数据的科学...",
        titObjetivo: "🎯 AGROSTREAM 的设计目标",
        pObjetivo: "本模拟器是一个数字孪生教学系统...",
        btnAjuda: "完整的模拟器手册 (点击这里)",
        ajudaTit1: "1. 规划阶段", ajudaP1: "选择机型并设置柴油和作物的市场价格。",
        ajudaTit2: "2. 运行阶段", ajudaP2: "点击‘应用负载’并观察实时动态天气的影响。",
        ajudaTit3: "3. 监测阶段", ajudaP3: "在高负载或暴晒下注意监控发动机温度防止烧毁。",
        ajudaTit4: "4. 结算结算", ajudaP4: "点击停止按钮以生成包含利润和成本的电子报告。",
        titSim: "🖥️ 遥测控制终端", titConfig: "初始参数设置", lblCultura: "作物种类:",
        lblDiesel: "油量 (L):", lblCarga: "载荷 (kg):", btnAplicar: "✅ 应用初始负载",
        titGps: "地理定位与天气", lblArea: "作业面积:", titFinanceiro: "财务收支平衡表",
        lblSaldo: "当前净利润收益", titCombustivel: "燃油箱油位", titTemp: "引擎核心温度",
        titSustentavel: "绿色可持续性", titLog: "物联网事件日志"
    }
};

let idiomaAtivo = 'pt';
let modAtivo = frota.trator[0];

function alternarTema() {
    const html = document.documentElement;
    const atual = html.getAttribute("data-theme");
    const novo = atual === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", novo);
    document.getElementById("btn-tema").innerText = novo === "dark" ? "☀️ MODO" : "🌙 MODO";
}