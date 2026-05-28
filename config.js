// config.js - Central de Parâmetros Avançados IoT e Frota Agrícola (Versão Expandida TCC)

// BANCO DE DADOS DA FROTA (Modelos reais comercializados no Paraná)
const frota = {
    trator: [
        { nome: "John Deere 6115J", tanque: 210, consumoNominal: 12, pesoProprio: 4800 },
        { nome: "John Deere 7230J", tanque: 390, consumoNominal: 19, pesoProprio: 7900 },
        { nome: "John Deere 8R 340", tanque: 610, consumoNominal: 28, pesoProprio: 13200 },
        { nome: "New Holland T6.130", tanque: 210, consumoNominal: 11, pesoProprio: 5200 },
        { nome: "New Holland T7.245", tanque: 395, consumoNominal: 18, pesoProprio: 7200 },
        { nome: "New Holland T9.565", tanque: 1160, consumoNominal: 48, pesoProprio: 20400 },
        { nome: "Massey Ferguson MF 4707", tanque: 105, consumoNominal: 8, pesoProprio: 3100 },
        { nome: "Massey Ferguson MF 7722", tanque: 430, consumoNominal: 20, pesoProprio: 8300 },
        { nome: "Massey Ferguson MF 8737S", tanque: 630, consumoNominal: 31, pesoProprio: 11800 },
        { nome: "Valtra A94", tanque: 105, consumoNominal: 9, pesoProprio: 3500 },
        { nome: "Valtra T250 CVT", tanque: 500, consumoNominal: 22, pesoProprio: 9300 },
        { nome: "Case IH Puma 230", tanque: 440, consumoNominal: 20, pesoProprio: 8100 },
        { nome: "Case IH Magnum 340", tanque: 670, consumoNominal: 30, pesoProprio: 12500 }
    ],
    colheitadeira: [
        { nome: "Case IH Axial-Flow 4150", tanque: 510, consumoNominal: 30, pesoProprio: 14000 },
        { nome: "Case IH Axial-Flow 7250", tanque: 950, consumoNominal: 42, pesoProprio: 17100 },
        { nome: "Case IH Axial-Flow 9250", tanque: 1130, consumoNominal: 55, pesoProprio: 19800 },
        { nome: "New Holland TC 5.90", tanque: 400, consumoNominal: 25, pesoProprio: 11200 },
        { nome: "New Holland CR 7.90", tanque: 1000, consumoNominal: 45, pesoProprio: 18200 },
        { nome: "New Holland CR 10.90", tanque: 1300, consumoNominal: 58, pesoProprio: 24600 },
        { nome: "John Deere S440", tanque: 530, consumoNominal: 29, pesoProprio: 13500 },
        { nome: "John Deere S780", tanque: 1250, consumoNominal: 52, pesoProprio: 20100 },
        { nome: "John Deere X9 1100", tanque: 1500, consumoNominal: 65, pesoProprio: 25800 },
        { nome: "Fendt Ideal 9T", tanque: 1500, consumoNominal: 60, pesoProprio: 22300 }
    ],
    pulverizador: [
        { nome: "Jacto Uniport 2030", tanque: 300, consumoNominal: 13, pesoProprio: 8700 },
        { nome: "Jacto Uniport 3030", tanque: 400, consumoNominal: 15, pesoProprio: 9800 },
        { nome: "Jacto Uniport 4030", tanque: 400, consumoNominal: 18, pesoProprio: 11500 },
        { nome: "Stara Imperador 3000", tanque: 340, consumoNominal: 14, pesoProprio: 9400 },
        { nome: "Stara Imperador 4000", tanque: 450, consumoNominal: 17, pesoProprio: 11200 },
        { nome: "John Deere M4040", tanque: 400, consumoNominal: 16, pesoProprio: 10500 },
        { nome: "John Deere R4038", tanque: 500, consumoNominal: 19, pesoProprio: 12100 },
        { nome: "Case IH Patriot 250 Extreme", tanque: 360, consumoNominal: 14, pesoProprio: 9100 },
        { nome: "Case IH Patriot 350", tanque: 454, consumoNominal: 18, pesoProprio: 10800 }
    ]
};

// MAPEAMENTO DE PARÂMETROS OPERACIONAIS DO SISTEMA IOT
const configInterface = {
    TaxaAtualizacaoGraficoMs: 1000,
    LimitePontosGrafico: 25,
    EscalaGeograficaPasso: 0.00012,
    FatorPatinagemChuva: 1.35,
    FatorConsumoChuva: 1.30,
    TemperaturaCriticaMotor: 102,
    TemperaturaIdealTrabalho: 85,
    FatorAquecimentoPorCarga: 0.005
};

// DICIONÁRIO DE DIAGNÓSTICO VEICULAR (CÓDIGOS DE FALHA REAIS SAE J1939 - REDE CAN)
const dicionarioErrosCAN = {
    // Subsistema do Motor (Powertrain)
    "SPN_91_FMI_3": { code: "ERR-091-03", desc: "CAN-BUS: Sinal do pedal do acelerador acima do limite operacional seguro (Curto com positivo)." },
    "SPN_91_FMI_4": { code: "ERR-091-04", desc: "CAN-BUS: Sinal do pedal do acelerador abaixo do limite operacional seguro (Curto com a terra)." },
    "SPN_94_FMI_1": { code: "ERR-094-01", desc: "CAN-BUS: Pressão baixa detectada na linha primária de alimentação de combustível." },
    "SPN_100_FMI_1": { code: "ERR-100-01", desc: "CAN-BUS: Pressão do óleo lubrificante do motor abaixo do nível mínimo tolerável. Risco de quebra!" },
    "SPN_102_FMI_2": { code: "ERR-102-02", desc: "CAN-BUS: Dados intermitentes ou inválidos recebidos do sensor de pressão do turbo (Boost Press)." },
    "SPN_102_FMI_3": { code: "ERR-102-03", desc: "CAN-BUS: Tensão alta ou circuito aberto detectado no sensor de pressão do coletor de admissão." },
    "SPN_105_FMI_0": { code: "ERR-105-00", desc: "CAN-BUS: Temperatura do ar no coletor de admissão acima do limite crítico de projeto." },
    "SPN_108_FMI_2": { code: "ERR-108-02", desc: "CAN-BUS: Inconsistência barométrica ambiente. Sinal diverge da calibração base de altitude." },
    "SPN_110_FMI_0": { code: "ERR-110-00", desc: "CAN-BUS: Superaquecimento! Temperatura do líquido de arrefecimento ultrapassou o teto seguro." },
    "SPN_110_FMI_15": { code: "ERR-110-15", desc: "CAN-BUS: Advertência térmica preliminar. Líquido de arrefecimento operando na faixa amarela." },
    "SPN_158_FMI_2": { code: "ERR-158-02", desc: "CAN-BUS: Queda brusca de tensão ou ruído elétrico na linha de ignição (pós-chave terminal 15)." },
    "SPN_168_FMI_1": { code: "ERR-168-01", desc: "CAN-BUS: Subtensão na bateria principal do veículo. Medição abaixo de 11.5 Volts em funcionamento." },
    "SPN_174_FMI_0": { code: "ERR-174-00", desc: "CAN-BUS: Restrição no circuito de retorno. Temperatura do combustível acima das especificações." },
    "SPN_175_FMI_0": { code: "ERR-175-00", desc: "CAN-BUS: Viscosidade em risco. Temperatura do óleo lubrificante do motor muito elevada." },
    "SPN_190_FMI_0": { code: "ERR-190-00", desc: "CAN-BUS: Sobrerrotação mecânica induzida (Overspeed no motor). Risco de empenamento de válvulas." },
    
    // Subsistema de Rede e Comunicação Física
    "SPN_639_FMI_2": { code: "ERR-639-02", desc: "CAN-BUS: Incompatibilidade de paridade ou erro de checagem CRC na linha física diferencial." },
    "SPN_639_FMI_12": { code: "ERR-639-12", desc: "CAN-BUS: Falha catastrófica no transceiver CAN. Barramento entrou em estado 'Bus-Off'." },
    
    // Subsistema de Transmissão e Atuadores Hidráulicos
    "SPN_524_FMI_11":{ code: "ERR-524-11", desc: "CAN-BUS: Desalinhamento eletrônico detectado no atuador da transmissão hidrostática/CVT." },
    "SPN_701_FMI_3": { code: "ERR-701-03", desc: "CAN-BUS: Solenoide PWM de controle de fluxo hidráulico principal em curto-circuito com o positivo." },
    "SPN_701_FMI_4": { code: "ERR-701-04", desc: "CAN-BUS: Solenoide PWM de controle de fluxo hidráulico principal em curto-circuito com a massa." },
    
    // Subsistema de Sensores Específicos e Alimentação da ECU
    "SPN_1079_FMI_3":{ code: "ERR-1079-03", desc: "CAN-BUS: Falha eletrônica na linha de tensão de referência de 5V fornecida pela ECU aos sensores." },
    "SPN_1080_FMI_3":{ code: "ERR-1080-03", desc: "CAN-BUS: Curto-circuito na alimentação secundária de sensores do sistema de injeção Common Rail." },
    "SPN_1209_FMI_2":{ code: "ERR-1209-02", desc: "CAN-BUS: Sensor de contrapressão dos gases de escape (EGR) enviando leituras erráticas." },
    "SPN_3216_FMI_5":{ code: "ERR-3216-05", desc: "CAN-BUS: Sensor de NOx de entrada com corrente abaixo do normal ou circuito totalmente aberto." },
    "SPN_3509_FMI_1":{ code: "ERR-3509-01", desc: "CAN-BUS: Queda severa na tensão de alimentação interna dos bancos de injetores eletrônicos (Grupo 1)." },
    "SPN_4765_FMI_1":{ code: "ERR-4765-01", desc: "CAN-BUS: Sensor de temperatura antes do catalisador de oxidação Diesel (DOC) fora de calibração." }
};

// GARANTIA DE ESCOPO GLOBAL PARA AMBIENTE DE NAVEGADORES WEB (LOCAL OU SERVIDOR)
if (typeof window !== 'undefined') {
    window.frota = frota;
    window.configInterface = configInterface;
    window.dicionarioErrosCAN = dicionarioErrosCAN;
}