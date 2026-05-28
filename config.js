// config.js

const frota = {
    trator: [
        { nome: "John Deere 6135M (135 cv)", tanque: 280 },
        { nome: "Case IH Puma 230 (234 cv)", tanque: 440 },
        { nome: "New Holland T8.430 (428 cv)", tanque: 620 }
    ],
    colheitadeira: [
        { nome: "New Holland CR 7.90 EVO", tanque: 1000 },
        { nome: "John Deere S780 Axial", tanque: 1250 },
        { nome: "Case IH Axial-Flow 9250", tanque: 1130 }
    ],
    pulverizador: [
        { nome: "Jacto Uniport 3030", tanque: 300 },
        { nome: "Stara Imperador 4000", tanque: 420 }
    ]
};

const dicionario = {
    pt: {
        titParana: "🌾 O Paraná e a Fronteira da Inovação Agrícola",
        pParana: "O estado do Paraná é o coração pulsante do agronegócio brasileiro. Com o solo de 'terra roxa' mais fértil do país, o estado lidera a produtividade de soja, milho e trigo através de um sistema de cooperativismo que é referência global. Cidades como Rolândia, Londrina e Cascavel são polos onde a tecnologia encontra a tradição. O Plantio Direto e a conservação de solos exigem precisão absoluta, e é aqui que a telemetria se torna indispensável para evitar a compactação e garantir recordes de safra sustentáveis.",
        titTelemetria: "🛰️ Tecnologia de Telemetria IoT",
        pTelemetria: "A telemetria agrícola é a ciência de medir dados à distância. Usando sensores de barramento CAN e GPS de alta precisão, o AGROSTREAM simula a transmissão de pacotes de dados via satélite. O sistema monitora instantaneamente o consumo de combustível, a patinagem das rodas em solo úmido e a eficiência térmica do motor, permitindo que o gestor tome decisões baseadas em números, não em suposições.",
        titObjetivo: "🎯 Propósito do AGROSTREAM",
        pObjetivo: "Este simulador é um Gêmeo Digital projetado para educar e otimizar. Ele serve para que o operador entenda como o clima paranaense e o peso da carga influenciam diretamente no custo por hectare e na emissão de CO2. É uma ferramenta de gestão estratégica para a nova geração do campo.",
        btnAjuda: "MANUAL COMPLETO DO SIMULADOR (Clique aqui)",
        ajudaTit1: "1. Panejamento",
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
    }
};