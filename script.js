const maquinas = {
    trator: {
        nome: "TRATORES",
        modelos: [
            { id: "t1", nome: "John Deere 8R", tanque: 710, agua: 40 },
            { id: "t2", nome: "Massey Ferguson 8700", tanque: 630, agua: 35 }
        ]
    },
    colheitadeira: {
        nome: "COLHEITADEIRAS",
        modelos: [
            { id: "c1", nome: "Case IH Axial 9250", tanque: 1130, agua: 65 },
            { id: "c2", nome: "New Holland CR 10", tanque: 1300, agua: 70 }
        ]
    },
    pulverizador: {
        nome: "PULVERIZADORES",
        modelos: [
            { id: "p1", nome: "Jacto Uniport 4530", tanque: 400, agua: 25 },
            { id: "p2", nome: "Stara Imperador", tanque: 450, agua: 30 }
        ]
    }
};

let maquinaAtiva = 'trator';
let modeloAtivo = maquinas.trator.modelos[0];

function trocarCategoria(cat) {
    maquinaAtiva = cat;
    const seletor = document.getElementById("seletor-modelo");
    seletor.innerHTML = "";
    
    maquinas[cat].modelos.forEach(m => {
        let opt = document.createElement("option");
        opt.value = m.id;
        opt.innerText = m.nome;
        seletor.appendChild(opt);
    });

    modeloAtivo = maquinas[cat].modelos[0];
    document.getElementById("txt-maquina-ativa").innerText = maquinas[cat].nome;
}

function mudarModelo(id) {
    modeloAtivo = maquinas[maquinaAtiva].modelos.find(m => m.id === id);
}

function alternarTema() {
    const html = document.documentElement;
    const btn = document.getElementById("btn-tema");
    if (html.getAttribute("data-theme") === "light") {
        html.setAttribute("data-theme", "dark");
        btn.innerText = "☀️";
    } else {
        html.setAttribute("data-theme", "light");
        btn.innerText = "🌙";
    }
}

// Inicializa
window.onload = () => trocarCategoria('trator');