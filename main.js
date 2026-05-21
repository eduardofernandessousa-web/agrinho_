// Variáveis Globais de Acúmulo de Dados
let odometroAcumulado = 1240.50; 
let motorSuperaquecido = false;

function processarTelemetriaIoT() {
    const flutuar = (min, max) => Math.random() * (max - min) + min;
    
    // 1. CHECAGEM DE JORNADA DE TRABALHO (AGENDAMENTO)
    const agora = new Date();
    const horaFormatada = String(agora.getHours()).padStart(2, '0') + ":" + String(agora.getMinutes()).padStart(2, '0');
    const horaInicio = document.getElementById("hora-inicio").value;
    const horaFim = document.getElementById("hora-fim").value;
    
    let dentroDaJornada = true;
    if (horaInicio && horaFim) {
        if (horaInicio < horaFim) {
            dentroDaJornada = (horaFormatada >= horaInicio && horaFormatada <= horaFim);
        } else { // Caso o turno vire a noite
            dentroDaJornada = (horaFormatada >= horaInicio || horaFormatada <= horaFim);
        }
    }

    // Se estiver fora do horário de trabalho ou travado por superaquecimento
    if (!dentroDaJornada || motorSuperaquecido) {
        document.getElementById("val-velocidade").innerText = "0";
        document.getElementById("val-consumo").innerText = "0.0";
        document.getElementById("val-co2").innerText = "0.00";
        return; 
    }

    // 2. SIMULAÇÃO TÉRMICA (Gatilho de Superaquecimento randômico a partir de 95°C)
    let tempMotor = Math.round(90 + flutuar(-1, 3)); 
    let tempOleo = Math.round(80 + flutuar(-1, 2));

    // Força o desligamento de proteção acadêmica caso atinja o limite crítico
    if (tempMotor >= 102) {
        motorSuperaquecido = true;
        document.getElementById("painel-shutdown").style.display = "block";
        document.getElementById("painel-dados").style.display = "none";
        return;
    }

    // 3. VELOCIDADE E ACÚMULO DE ODÔMETRO REALISTAS
    let velBase = maquinaAtual === 'trator' ? 14 : maquinaAtual === 'colheitadeira' ? 7 : 22;
    let velocidadeAtual = Math.round(velBase + flutuar(-2, 2));
    document.getElementById("val-velocidade").innerText = velocidadeAtual;

    // Atualiza quilometragem percorrida (distância = velocidade / tempo)
    odometroAcumulado += (velocidadeAtual / 3600);
    document.getElementById("val-odometro").innerText = odometroAcumulado.toFixed(3);

    // 4. CONSUMO E VOLUMES DO TANQUE DE COMBUSTÍVEL
    let capMaxCombustivel = modeloSelecionado.tanqueMax;
    let consumoBase = maquinaAtual === 'trator' ? 24.5 : maquinaAtual === 'colheitadeira' ? 42.0 : 18.2;
    let consumoLh = parseFloat((consumoBase + flutuar(-1, 1.5)).toFixed(1));
    document.getElementById("val-consumo").innerText = consumoLh.toFixed(1);

    let porcentagemCombustivel = Math.round(68 + flutuar(-0.2, 0.2));
    let litrosDisponiveisCombustivel = Math.round((porcentagemCombustivel / 100) * capMaxCombustivel);
    
    document.getElementById("val-tanque").innerText = porcentagemCombustivel;
    document.getElementById("barra-combustivel").style.width = porcentagemCombustivel + "%";
    document.getElementById("val-combustivel-atual").innerText = litrosDisponiveisCombustivel;
    document.getElementById("val-combustivel-max").innerText = capMaxCombustivel;

    // 5. PRESSÃO PNEUMÁTICA
    let pressaoPSI = Math.round(34 + flutuar(-0.5, 0.5));
    document.getElementById("val-pressao-psi").innerText = pressaoPSI;
    document.getElementById("val-pressao-bar").innerText = (pressaoPSI * 0.0689476).toFixed(2);

    // 6. VOLUMES E BARRAS DE LÍQUIDOS DO MOTOR/HIDRÁULICO
    document.getElementById("val-temp-motor").innerText = tempMotor + "°C";
    document.getElementById("barra-temp-motor").style.width = Math.min(100, (tempMotor / 110) * 100) + "%";
    // Exibe volumes dinâmicos remanescentes calculados sobre as litragens máximas do modelo
    let volLiquidoMotorAtual = (modeloSelecionado.liqMotorMax * 0.95).toFixed(1);
    document.getElementById("val-liq-motor-vol").innerText = volLiquidoMotorAtual + "L / " + modeloSelecionado.liqMotorMax + "L";

    document.getElementById("val-temp-oleo").innerText = tempOleo + "°C";
    document.getElementById("barra-temp-oleo").style.width = Math.min(100, (tempOleo / 110) * 100) + "%";
    let volLiquidoOleoAtual = (modeloSelecionado.liqOleoMax * 0.98).toFixed(1);
    document.getElementById("val-liq-oleo-vol").innerText = volLiquidoOleoAtual + "L / " + modeloSelecionado.liqOleoMax + "L";

    // 7. EMISSÕES CO2
    document.getElementById("val-co2").innerText = (consumoLh * 2.63).toFixed(2);

    // 8. PROCESSAMENTO DO CARD DINÂMICO EXCLUSIVO
    const cardEsp = document.getElementById("card-especifico");
    const valEsp = document.getElementById("val-especifico");
    const subEsp = document.getElementById("lbl-especifico-sub");
    const barraEsp = document.getElementById("barra-especifica");
    const dict = dicionario[idiomaAtual];

    if (maquinaAtual === 'trator') {
        let rpm = Math.round(1900 + flutuar(-50, 50));
        valEsp.innerText = rpm + " RPM";
        subEsp.innerText = dict.espTratorSub + " // Nominal";
        barraEsp.style.width = ((rpm / 2600) * 100) + "%";
    } 
    else if (maquinaAtual === 'colheitadeira') {
        let segundos = new Date().getSeconds();
        let pctGraneleiro = Math.min(100, Math.round((segundos / 60) * 120));
        valEsp.innerText = pctGraneleiro + "%";
        
        let kgCarregados = Math.round(pctGraneleiro * 145);
        subEsp.innerText = kgCarregados + " / 14500 " + dict.espColheSub;
        barraEsp.style.width = pctGraneleiro + "%";

        if (pctGraneleiro >= 100) {
            cardEsp.classList.add("alerta-cheio");
            document.getElementById("lbl-especifico-titulo").innerText = dict.espColheAlerta;
        } else {
            cardEsp.classList.remove("alerta-cheio");
            document.getElementById("lbl-especifico-titulo").innerText = dict.espColheTit;
        }
    } 
    else if (maquinaAtual === 'pulverizador') {
        let barBarras = (4.5 + flutuar(-0.1, 0.2)).toFixed(1);
        valEsp.innerText = barBarras + " bar";
        
        let caldaDisponivel = Math.round(4000 - (new Date().getSeconds() * 65));
        subEsp.innerText = caldaDisponivel + "L / 4000L " + dict.espPulvSub;
        barraEsp.style.width = ((caldaDisponivel / 4000) * 100) + "%";
    }
}

// Roda a verificação de sensores IoT a cada 1 segundo
setInterval(processarTelemetriaIoT, 1000);