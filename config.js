const frota = {
    trator: [
        { nome: "John Deere 8R 410", tanque: 710, agua: 45, carga: 5000, txtCarga: "Capacidade de Arrasto" },
        { nome: "Massey Ferguson 8700S", tanque: 630, agua: 38, carga: 4500, txtCarga: "Capacidade de Arrasto" }
    ],
    colheitadeira: [
        { nome: "New Holland CR 10.90", tanque: 1300, agua: 90, carga: 14500, txtCarga: "Carga do Graneleiro (Grãos)" },
        { nome: "Case IH Axial-Flow 9250", tanque: 1130, agua: 85, carga: 12000, txtCarga: "Carga do Graneleiro (Grãos)" }
    ],
    pulverizador: [
        { nome: "Jacto Uniport 4530", tanque: 400, agua: 3000, carga: 3500, txtCarga: "Peso Químico das Barras" },
        { nome: "Stara Imperador 4000", tanque: 450, agua: 4000, carga: 4000, txtCarga: "Peso Químico das Barras" }
    ]
};

let catAtiva = 'trator';
let modAtivo = frota.trator[0];

function trocarCategoria(c) {
    catAtiva = c;
    const sel = document.getElementById("seletor-modelo");
    sel.innerHTML = "";
    frota[c].forEach((m, index) => {
        let o = document.createElement("option");
        o.value = index; o.innerText = m.nome;
        sel.appendChild(o);
    });
    mudarModelo(0);
    
    document.getElementById("tit-agua").innerText = (c === 'pulverizador') ? "Tanque de Calda" : "Reservatório de Água";
    document.getElementById("lbl-liquido-nome").innerText = (c === 'pulverizador') ? "Calda (L):" : "Água (L):";
}

function mudarModelo(index) {
    modAtivo = frota[catAtiva][index];
    document.getElementById("max-diesel").innerText = modAtivo.tanque;
    document.getElementById("max-agua").innerText = modAtivo.agua;
    document.getElementById("lbl-status-carga").innerText = modAtivo.txtCarga;
}

function alternarTema() {
    const h = document.documentElement;
    const tema = h.getAttribute("data-theme") === "dark" ? "light" : "dark";
    h.setAttribute("data-theme", tema);
}

window.onload = () => trocarCategoria('trator');