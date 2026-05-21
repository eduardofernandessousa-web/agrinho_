const frota = {
    trator: [
        { nome: "John Deere 8R 410", tanque: 710, agua: 45, carga: 5000, txtCarga: { pt: "Capacidade de Arrasto", en: "Towing Capacity" } },
        { nome: "Massey Ferguson 8700S", tanque: 630, agua: 38, carga: 4500, txtCarga: { pt: "Capacidade de Arrasto", en: "Towing Capacity" } }
    ],
    colheitadeira: [
        { nome: "New Holland CR 10.90", tanque: 1300, agua: 90, carga: 14500, txtCarga: { pt: "Carga do Graneleiro (Grãos)", en: "Grain Tank Load" } },
        { nome: "Case IH Axial-Flow 9250", tanque: 1130, agua: 85, carga: 12000, txtCarga: { pt: "Carga do Graneleiro (Grãos)", en: "Grain Tank Load" } }
    ],
    pulverizador: [
        { nome: "Jacto Uniport 4530", tanque: 400, agua: 3000, carga: 3500, txtCarga: { pt: "Peso Químico das Barras", en: "Boom Chemical Weight" } },
        { nome: "Stara Imperador 4000", tanque: 450, agua: 4000, carga: 4000, txtCarga: { pt: "Peso Químico das Barras", en: "Boom Chemical Weight" } }
    ]
};

let catAtiva = 'trator';
let modAtivo = frota.trator[0];
let idiomaAtivo = 'pt';

const dicionario = {
    pt: {
        statusParada: "PARADA", statusRodando: "RODANDO", titSetup: "Configuração de Carga",
        lblCultura: "Cultura:", lblDiesel: "Diesel (L):", lblAgua: "Água (L):", lblCalda: "Calda (L):",
        lblCargaIni: "Carga Inicial (kg):", titCotacoes: "Cotações Atuais (Painel Cooperativa):",
        lblDieselPreco: "⛽ Diesel (R$/L):", lblSacaPreco: "🌾 Preço da Saca (R$):", btnAplicar: "✅ APLICAR CARGA",
        titMovimento: "Telemetria de Movimento", lblOdo: "ODÔMETRO:", lblTempoAtivo: "⏱️ TEMPO ATIVO:",
        titDiesel: "Tanque Diesel", titAgua: "Reservatório de Água", titCalda: "Tanque de Calda",
        titTemp: "Temperatura Motor", statusEstavel: "ESTÁVEL", statusRisco: "🚨 ALTO RISCO",
        titArmazem: "Armazenamento & Produtividade", lblSacasColhidas: "🚜 SACAS COLHIDAS:",
        titFinancas: "Análise Financeira", statusRepouso: "MÁQUINA EM REPOUSO",
        statusDispendiosa: "⚠️ OPERAÇÃO DISPENDIOSA: Carga pesada elevando custos.",
        statusEficiente: "📉 GESTÃO FINANCEIRA EFICIENTE", titEco: "Sustentabilidade (Pegada de Carbono)",
        statusNeutro: "MÁQUINA NEUTRA", statusAltaEmissao: "⚠️ ALTA EMISSÃO: Excesso de queima.",
        statusControlada: "🌳 EMISSÃO CONTROLADA (Padrão Euro 5)", titLog: "Histórico de Alertas (IoT Log)",
        logInicializado: "Sistema de Telemetria AGROSTREAM Inicializado.",
        logCargaOk: "Carga configurada com sucesso:", alertCarga: "Carga registrada na telemetria! Clique em START.",
        logIotStart: "Transmissão de dados IoT iniciada para", logIotPause: "Simulação colocada em modo estático (Pause).",
        logCulturaAlt: "Cultura alterada no painel. Novo foco operacional: Alvo -", logCombBaixo: "Tanque de combustível abaixo de 15%. Planejar reabastecimento.",
        logGranCheio: "Graneleiro da colheitadeira atingiu a capacidade máxima autorizada!", logAlertaTermico: "Alerta térmico de bloco! Risco de fadiga mecânica.",
        logShutdown: "SHUTDOWN REMOTO ATIVADO: Superaquecimento mecânico detectado.", logReset: "Sistema reinicializado após atuação preventiva.",
        titResumo: "--- RESUMO DE FECHAMENTO DA OPERAÇÃO ---", resTempo: "⏱️ Tempo total trabalhado:", resColheito: "🚜 Total colhido na sessão: {X} Sacas",
        resGasto: "💰 Gasto Operacional Total: R$", resLucro: "📈 Lucro Líquido Estimado: R$", txtBtnReiniciar: "REINICIAR SISTEMA",
        txtCalorTitulo: "🚨 SUPERAQUECIMENTO CRÍTICO 🚨", txtCalorSub: "Motor desligado automaticamente (>102°C)."
    },
    en: {
        statusParada: "STOPPED", statusRodando: "RUNNING", titSetup: "Load Configuration",
        lblCultura: "Crop:", lblDiesel: "Diesel (L):", lblAgua: "Water (L):", lblCalda: "Chemical (L):",
        lblCargaIni: "Initial Load (kg):", titCotacoes: "Current Quotes (Market Board):",
        lblDieselPreco: "⛽ Diesel (R$/L):", lblSacaPreco: "🌾 Bag Price (R$):", btnAplicar: "✅ APPLY LOAD",
        titMovimento: "Movement Telemetry", lblOdo: "ODOMETER:", lblTempoAtivo: "⏱️ ACTIVE TIME:",
        titDiesel: "Diesel Tank", titAgua: "Water Reservoir", titCalda: "Chemical Tank",
        titTemp: "Engine Temperature", statusEstavel: "STABLE", statusRisco: "🚨 HIGH RISK",
        titArmazem: "Storage & Productivity", lblSacasColhidas: "🚜 BAGS HARVESTED:",
        titFinancas: "Financial Analysis", statusRepouso: "MACHINE IDLE",
        statusDispendiosa: "⚠️ EXPENSIVE OPERATION: Heavy load raising costs.",
        statusEficiente: "📉 EFFICIENT FINANCIAL MANAGEMENT", titEco: "Sustainability (Carbon Footprint)",
        statusNeutro: "NEUTRAL MACHINE", statusAltaEmissao: "⚠️ HIGH EMISSION: Excess combustion.",
        statusControlada: "🌳 CONTROLLED EMISSION (Euro 5 Standard)", titLog: "Alert History (IoT Log)",
        logInicializado: "AGROSTREAM Telemetry System Initialized.",
        logCargaOk: "Load configured successfully:", alertCarga: "Load registered on telemetry! Click START.",
        logIotStart: "IoT data transmission started for", logIotPause: "Simulation paused (Static Mode).",
        logCulturaAlt: "Crop altered in panel. New operational target -", logCombBaixo: "Fuel tank below 15%. Plan refueling.",
        logGranCheio: "Combine harvester grain tank has reached max allowed capacity!", logAlertaTermico: "Block thermal alert! Risk of mechanical fatigue.",
        logShutdown: "REMOTE SHUTDOWN ACTIVATED: Critical overheating detected.", logReset: "System rebooted after preventive maintenance.",
        titResumo: "--- OPERATION CLOSING REPORT ---", resTempo: "⏱️ Total time worked:", resColheito: "🚜 Total harvested this session: {X} Bags",
        resGasto: "💰 Total Operating Cost: R$", resLucro: "📈 Estimated Net Profit: R$", txtBtnReiniciar: "REBOOT SYSTEM",
        txtCalorTitulo: "🚨 CRITICAL OVERHEATING 🚨", txtCalorSub: "Engine automatically shut down (>102°C)."
    }
};

function alternarTema() {
    const h = document.documentElement;
    const tema = h.getAttribute("data-theme") === "dark" ? "light" : "dark";
    h.setAttribute("data-theme", tema);
}