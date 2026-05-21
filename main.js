function rodarSimulacaoIoT() {
    const flutuar = (min, max) => Math.random() * (max - min) + min;

    // 1. Velocidade
    let velBase = maquinaAtual === 'trator' ? 12 : maquinaAtual === 'colheitadeira' ? 6 : 18;
    document.getElementById("val-velocidade").innerText = Math.round(velBase + flutuar(-1.5, 1.5));

    // 2. Combustível
    let combustivelPorcentagem = Math.round(78 + flutuar(-0.5, 0.5)); 
    document.getElementById("val-tanque").innerText = combustivelPorcentagem;
    document.getElementById("barra-combustivel").style.width = combustivelPorcentagem + "%";
    
    let consumoBase = maquinaAtual === 'trator' ? 22.4 : maquinaAtual === 'colheitadeira' ? 38.1 : 15.6;
    let consumoAtual = (consumoBase + flutuar(-0.8, 0.8)).toFixed(1);
    document.getElementById("val-consumo").innerText = consumoAtual;

    // 3. Pressão Pneus (PSI e BAR)
    let pressaoPSI = Math.round(32 + flutuar(-0.5, 0.5));
    let pressaoBAR = pressaoPSI * 0.0689476;
    document.getElementById("val-pressao-psi").innerText = pressaoPSI;
    document.getElementById("val-pressao-bar").innerText = pressaoBAR.toFixed(2);

    // 4. Temperaturas
    document.getElementById("val-temp-motor").innerText = Math.round(88 + flutuar(-1, 2));
    document.getElementById("val-temp-oleo").innerText = Math.round(74 + flutuar(-1.5, 1.5));

    // 5. Emissões CO2
    let co2Calculado = parseFloat(consumoAtual) * 2.63;
    document.getElementById("val-co2").innerText = co2Calculado.toFixed(2);

    // 6. Dados Específicos das Máquinas
    const cardEsp = document.getElementById("card-especifico");
    const valEsp = document.getElementById("val-especifico");
    const subEsp = document.getElementById("lbl-especifico-sub");
    const barraEsp = document.getElementById("barra-especifica");
    const dict = dicionario[idiomaAtual];

    if (maquinaAtual === 'trator') {
        let rpm = Math.round(1850 + flutuar(-40, 60));
        valEsp.innerText = rpm + " RPM";
        subEsp.innerText = dict.espTratorSub + " // " + (rpm > 1950 ? "Alta Carga" : "Nominal");
        barraEsp.style.width = ((rpm / 2500) * 100) + "%";
    } 
    else if (maquinaAtual === 'colheitadeira') {
        let segundosAtuais = new Date().getSeconds();
        let porcentagemCarga = Math.min(100, Math.round((segundosAtuais / 60) * 110));
        
        valEsp.innerText = porcentagemCarga + "%";
        let toneladasKg = Math.round(porcentagemCarga * 140);
        subEsp.innerText = toneladasKg + " / 14000 " + dict.espColheSub;
        barraEsp.style.width = porcentagemCarga + "%";

        if (porcentagemCarga >= 100) {
            cardEsp.classList.add("alerta-cheio");
            document.getElementById("lbl-especifico-titulo").innerText = dict.espColheAlerta;
        } else {
            cardEsp.classList.remove("alerta-cheio");
            document.getElementById("lbl-especifico-titulo").innerText = dict.espColheTit;
        }
    } 
    else if (maquinaAtual === 'pulverizador') {
        let pressaoBombaBar = (4.2 + flutuar(-0.2, 0.3)).toFixed(1);
        valEsp.innerText = pressaoBombaBar + " bar";
        
        let volumeTanqueDisponivel = Math.round(2400 - (new Date().getSeconds() * 10));
        subEsp.innerText = volumeTanqueDisponivel + "L / 3000L " + dict.espPulvSub;
        barraEsp.style.width = ((volumeTanqueDisponivel / 3000) * 100) + "%";
    }
}

// Atualiza o painel a cada 1 segundo
setInterval(rodarSimulacaoIoT, 1000);