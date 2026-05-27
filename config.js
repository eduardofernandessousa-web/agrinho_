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
        titParana: "🌾 O Paraná e a Inovação Agrícola",
        titTelemetria: "🛰️ Tecnologia de Telemetria IoT",
        titObjetivo: "🎯 Propósito do AGROSTREAM",
        btnAjuda: "MANUAL COMPLETO DO SIMULADOR (Clique aqui)",
        statusRodando: "RODANDO", statusParada: "PARADA"
    },
    en: {
        titParana: "🌾 Paraná: Agricultural Innovation",
        titTelemetria: "🛰️ IoT Telemetry Technology",
        titObjetivo: "🎯 AGROSTREAM Purpose",
        btnAjuda: "COMPLETE SIMULATOR MANUAL (Click here)",
        statusRodando: "RUNNING", statusParada: "STOPPED"
    },
    es: {
        titParana: "🌾 Paraná: Innovación Agrícola",
        titTelemetria: "🛰️ Tecnología de Telemetría IoT",
        titObjetivo: "🎯 Propósito de AGROSTREAM",
        btnAjuda: "MANUAL COMPLETO (Haga clic aquí)",
        statusRodando: "EN MARCHA", statusParada: "PARADA"
    },
    fr: {
        titParana: "🌾 Paraná: Innovation Agricole",
        titTelemetria: "🛰️ Technologie de Télémétrie IoT",
        titObjetivo: "🎯 Objectif d'AGROSTREAM",
        btnAjuda: "MANUEL COMPLET (Cliquez ici)",
        statusRodando: "EN COURS", statusParada: "ARRÊTÉ"
    },
    zh: {
        titParana: "🌾 巴拉那州：农业创新",
        titTelemetria: "🛰️ 物联网遥测技术",
        titObjetivo: "🎯 AGROSTREAM 的目标",
        btnAjuda: "完整的模拟器手册 (点击这里)",
        statusRodando: "运行中", statusParada: "已停止"
    }
};

let idiomaAtivo = 'pt';
function alternarTema() {
    const h = document.documentElement;
    h.setAttribute("data-theme", h.getAttribute("data-theme") === "dark" ? "light" : "dark");
}