let odometro = 1250.40;
let motorMorto = false;

function simular() {
    if (motorMorto) return;

    // Verificação de Horário
    const agora = new Date();
    const horaAtual = agora.getHours() + ":" + agora.getMinutes();
    const hInicio = document.getElementById("hora-inicio").value;
    const hFim = document.getElementById("hora-fim").value;

    if (horaAtual < hInicio || horaAtual > hFim) {
        document.getElementById("val-velocidade").innerText = "OFF";
        return;
    }

    const flutuar = (min, max) => (Math.random() * (max - min) + min);

    // Velocidade e Odômetro
    let v = Math.round(flutuar(5, 20));
    document.getElementById("val-velocidade").innerText = v;
    odometro += 0.001;
    document.getElementById("val-odometro").innerText = odometro.toFixed(2);

    // Combustível
    let pctComb = 75; // Simulado
    document.getElementById("val-tanque-pct").innerText = pctComb;
    document.getElementById("barra-combustivel").style.width = pctComb + "%";
    document.getElementById("val-tanque-max").innerText = modeloAtivo.tanque;
    document.getElementById("val-tanque-litros").innerText = Math.round(modeloAtivo.tanque * (pctComb/100));

    // Água
    let pctAgua = 60; // Simulado
    document.getElementById("val-agua-pct").innerText = pctAgua;
    document.getElementById("barra-agua").style.width = pctAgua + "%";
    document.getElementById("val-agua-max").innerText = modeloAtivo.agua;
    document.getElementById("val-agua-litros").innerText = Math.round(modeloAtivo.agua * (pctAgua/100));

    // Temperatura e Shutdown
    let t = Math.round(flutuar(80, 105));
    document.getElementById("val-temp-motor").innerText = t;
    document.getElementById("barra-temp").style.width = (t - 50) + "%";
    
    if (t > 102) {
        motorMorto = true;
        document.getElementById("painel-shutdown").style.display = "block";
    }

    // Pneus
    document.getElementById("val-pressao-psi").innerText = Math.round(flutuar(30, 35));
}

setInterval(simular, 1000);