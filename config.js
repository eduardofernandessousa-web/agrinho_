const frota = {
    trator: [
        { nome: "John Deere 8R 410", tanque: 710, carga: 5000 },
        { nome: "Case IH Magnum 400", tanque: 680, carga: 4800 }
    ],
    colheitadeira: [
        { nome: "New Holland CR 10.90", tanque: 1300, carga: 14500 },
        { nome: "John Deere S7 900", tanque: 1250, carga: 14100 }
    ],
    pulverizador: [
        { nome: "Jacto Uniport 4530", tanque: 400, carga: 3500 },
        { nome: "Stara Imperador 4000", tanque: 450, carga: 4000 }
    ]
};

const dicionario = {
    pt: {
        titParana: "🌾 O Paraná e a Fronteira da Inovação Agrícola",
        pParana: "O estado do Paraná é o coração pulsante do agronegócio brasileiro. Com o solo de \"terra roxa\" mais fértil do país, o estado lidera a produtividade de soja, milho e trigo através de um sistema de cooperativismo que é referência global. Cidades como Rolândia, Londrina e Cascavel são polos onde a tecnologia encontra a tradição. O Plantio Direto e a conservação de solos exigem precisão absoluta, e é aqui que a telemetria se torna indispensável para evitar a compactação e garantir recordes de safra sustentáveis.",
        titTelemetria: "🛰️ Tecnologia de Telemetria IoT",
        pTelemetria: "A telemetria agrícola é a ciência de medir dados à distância. Usando sensores de barramento CAN e GPS de alta precisão, o AGROSTREAM simula a transmissão de pacotes de dados via satélite. O sistema monitora instantaneamente o consumo de combustível, a patinagem das rodas em solo úmido e a eficiência térmica do motor, permitindo que o gestor tome decisões baseadas em números, não em suposições.",
        titObjetivo: "🎯 Propósito do AGROSTREAM",
        pObjetivo: "Este simulador é um Gêmeo Digital projetado para educar e otimizar. Ele serve para que o operador entenda como o clima paranaense e o peso da carga influenciam diretamente no custo por hectare e na emissão de CO2. É uma ferramenta de gestão estratégica para a nova geração do campo.",
        btnAjuda: "MANUAL COMPLETO DO SIMULADOR (Clique aqui)",
        ajudaTit1: "1. Planejamento",
        ajudaP1: "Escolha o modelo da máquina. Máquinas maiores consomem mais diesel, mas possuem tanques de grãos maiores. Configure o preço do diesel e da saca conforme a cotação do dia na sua cooperativa.",
        ajudaTit2: "2. Operação",
        ajudaP2: "Clique em 'Aplicar Carga'. No painel de Movimento, observe o clima. O simulador altera a física se estiver chovendo, aumentando o consumo e reduzindo a velocidade para evitar danos ao solo.",
        ajudaTit3: "3. Monitoramento",
        ajudaP3: "Acompanhe a temperatura. Se o motor trabalhar muito pesado sob sol forte, ele pode fundir. O sistema financeiro calcula seu gasto em tempo real baseado no consumo e horas trabalhadas.",
        ajudaTit4: "4. Finalização",
        ajudaP4: "Ao clicar em STOP, o sistema gera um laudo de fechamento no Log, mostrando se a sua operação deu lucro ou prejuízo líquido.",
        titSim: "🖥️ Terminal de Telemetria",
        optTratores: "🚜 TRATORES",
        optColheitadeiras: "🌾 COLHEITADEIRAS",
        optPulverizadores: "💨 PULVERIZADORES",
        titConfig: "Configuração Inicial",
        lblCultura: "Cultura:",
        lblDiesel: "Diesel (L):",
        lblCarga: "Carga (kg):",
        btnAplicar: "✅ APLICAR CARGA",
        titGps: "Posicionamento & Clima",
        lblArea: "Área:",
        titFinanceiro: "Balanço Financeiro",
        lblGastos: "Gastos:",
        lblGanho: "Ganho Bruto:",
        lblSaldo: "SALDO LÍQUIDO ATUAL",
        titCombustivel: "Nível Combustível",
        titTemp: "Temperatura",
        titSustentavel: "Sustentabilidade",
        lblCo2: "🌍 EMISSÃO DE CO2",
        titLog: "Log de Eventos IoT"
    },
    en: {
        titParana: "🌾 Paraná and the Agricultural Innovation Frontier",
        pParana: "The state of Paraná is the pulsing heart of Brazilian agribusiness. With the country's most fertile soil, it leads in precision yields across cities like Rolândia and Cascavel using intelligent data metrics.",
        titTelemetria: "🛰️ IoT Telemetry Technology",
        pTelemetria: "Telemetry systems log CAN bus packets dynamically. It monitors fuel consumption, live mechanical stress, and heat directly via virtual tracking models.",
        titObjetivo: "🎯 AGROSTREAM Purpose",
        pObjetivo: "A professional Digital Twin terminal interface allowing direct simulation of telemetry management frameworks under severe weather or logistical shifts.",
        btnAjuda: "COMPLETE SIMULATOR MANUAL (Click here)",
        ajudaTit1: "1. Planning",
        ajudaP1: "Select vehicle classes, load capacity constraints, and fine-tune operational parameter metrics before initialization.",
        ajudaTit2: "2. Execution",
        ajudaP2: "Engage real-time operations and shift climate controls to evaluate wheel slippage coefficients.",
        ajudaTit3: "3. Telematics",
        ajudaP3: "Track system core temperatures. High workflow environments scale up fuel thermal load parameters rapidly.",
        ajudaTit4: "4. Telemetry Log",
        ajudaP4: "Halting telemetry systems compiles financial logs, rendering full expenditure reports instantly.",
        titSim: "🖥️ Telemetry Terminal Interface",
        optTratores: "🚜 TRACTORS",
        optColheitadeiras: "🌾 COMBINES",
        optPulverizadores: "💨 INDUSTRIAL SPRAYERS",
        titConfig: "System Input Setup",
        lblCultura: "Selected Crop:",
        lblDiesel: "Fuel Capacity (L):",
        lblCarga: "Target Weight (kg):",
        btnAplicar: "✅ COMMIT LOAD SETUP",
        titGps: "GPS Telematics & Climate",
        lblArea: "Logged Area:",
        titFinanceiro: "Financial Balance Matrix",
        lblGastos: "Operating Cost:",
        lblGanho: "Gross Income:",
        lblSaldo: "NET BALANCE MARGIN",
        titCombustivel: "Fuel Tank Volume",
        titTemp: "Core Thermal Matrix",
        titSustentavel: "Environmental Sustainability",
        lblCo2: "🌍 KILOGRAMS OF CO2 EMITTED",
        titLog: "System Architecture Event Logs"
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