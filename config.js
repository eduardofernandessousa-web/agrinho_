// config.js - Central de Parâmetros Avançados IoT e Frota Agrícola (Versão TCC)
const frota = {
    trator: [
        { nome: "John Deere 6115J", tanque: 210, consumoNominal: 12, pesoProprio: 4800 },
        { nome: "New Holland T7.245", tanque: 395, consumoNominal: 18, pesoProprio: 7200 },
        { nome: "Massey Ferguson MF 4707", tanque: 105, consumoNominal: 8, pesoProprio: 3100 },
        { nome: "Valtra T250 CVT", tanque: 500, consumoNominal: 22, pesoProprio: 9300 },
        { nome: "Case IH Puma 230", tanque: 440, consumoNominal: 20, pesoProprio: 8100 }
    ],
    colheitadeira: [
        { nome: "Case IH Axial-Flow 4150", tanque: 510, consumoNominal: 30, pesoProprio: 14000 },
        { nome: "New Holland CR 7.90", tanque: 1000, consumoNominal: 45, pesoProprio: 18200 },
        { nome: "John Deere S780", tanque: 1250, consumoNominal: 52, pesoProprio: 20100 },
        { nome: "Fendt Ideal 9T", tanque: 1500, consumoNominal: 60, pesoProprio: 22300 }
    ],
    pulverizador: [
        { nome: "Jacto Uniport 3030", tanque: 400, consumoNominal: 15, pesoProprio: 9800 },
        { nome: "Stara Imperador 4000", tanque: 450, consumoNominal: 17, pesoProprio: 11200 },
        { nome: "John Deere M4040", tanque: 400, consumoNominal: 16, pesoProprio: 10500 },
        { nome: "Case IH Patriot 350", tanque: 454, consumoNominal: 18, pesoProprio: 10800 }
    ]
};

// Mapeamento de Parâmetros de Telas e Interface
const configInterface = {
    TaxaAtualizacaoGraficoMs: 1000,
    LimitePontosGrafico: 20,
    EscalaGeograficaPasso: 0.0001,
    FatorPatinagemChuva: 1.3,
    TemperaturaCriticaMotor: 102
};

// Dicionário de Códigos de Falha Oficiais da Rede CAN-BUS (SAE J1939) para o Diagnóstico
const dicionarioErrosCAN = {
    "SPN_91_FMI_3": { code: "ERR-091-03", desc: "Sinal do sensor de posição do acelerador acima do normal (Curto com o positivo)." },
    "SPN_91_FMI_4": { code: "ERR-091-04", desc: "Sinal do sensor de posição do acelerador abaixo do normal (Curto com a massa)." },
    "SPN_100_FMI_1": { code: "ERR-100-01", desc: "Pressão do óleo do motor criticamente baixa. Risco iminente de travamento." },
    "SPN_105_FMI_0": { code: "ERR-105-00", desc: "Temperatura do coletor de admissão do motor acima da faixa máxima de trabalho." },
    "SPN_110_FMI_0": { code: "ERR-110-00", desc: "Temperatura do líquido de arrefecimento do motor acima do limite (Motor superaquecido)." },
    "SPN_110_FMI_15": { code: "ERR-110-15", desc: "Advertência de alta temperatura do líquido de arrefecimento (Fase inicial de alerta)." },
    "SPN_158_FMI_2": { code: "ERR-158-02", desc: "Dados intermitentes ou incorretos na alimentação elétrica pós-chave da ECU." },
    "SPN_168_FMI_1": { code: "ERR-168-01", desc: "Tensão da bateria do veículo abaixo da faixa operacional mínima de 11.5V." },
    "SPN_190_FMI_0": { code: "ERR-190-00", desc: "Rotação do motor (RPM) excedeu o limite máximo seguro de operação (Overspeed)." },
    "SPN_639_FMI_2": { code: "ERR-639-02", desc: "Erro de integridade de dados na linha física principal do barramento CAN (CAN-H / CAN-L)." },
    "SPN_639_FMI_12": { code: "ERR-639-12", desc: "Falha de hardware interno no chip controlador do barramento CAN principal." },
    "SPN_84_FMI_2":  { code: "ERR-084-02", desc: "Sensor de velocidade do veículo enviando dados inconsistentes com a rotação de roda." },
    "SPN_94_FMI_1":  { code: "ERR-094-01", desc: "Pressão de entrega de combustível na linha de baixa pressão fora dos limites." },
    "SPN_102_FMI_3": { code: "ERR-102-03", desc: "Sensor de pressão do turbo compressor em curto-circuito com circuito de alta." },
    "SPN_108_FMI_2": { code: "ERR-108-02", desc: "Sensor de pressão barométrica ambiente incompatível com dados de altitude do GPS." },
    "SPN_174_FMI_0": { code: "ERR-174-00", desc: "Temperatura do combustível no circuito de retorno acima da especificação de segurança." },
    "SPN_175_FMI_0": { code: "ERR-175-00", desc: "Temperatura do óleo lubrificante do motor excedeu o patamar seguro de viscosidade." },
    "SPN_524_FMI_11":{ code: "ERR-524-11", desc: "Inconformidade física ou falha de engate no atuador da transmissão hidrostática." },
    "SPN_701_FMI_3": { code: "ERR-701-03", desc: "Solenoide de controle de vazão da bomba hidráulica principal em curto-circuito." },
    "SPN_1079_FMI_3":{ code: "ERR-1079-03", desc: "Falha na tensão de referência de 5V gerada pela ECU para alimentação dos sensores." }
};

// Trava de segurança para garantir exportação global no ambiente do navegador
if (typeof window !== 'undefined') {
    window.frota = frota;
    window.configInterface = configInterface;
    window.dicionarioErrosCAN = dicionarioErrosCAN;
}