document.getElementById("startBtn").addEventListener("click", iniciarSimulacion);
document.getElementById("palanca").addEventListener("click", () => {
    document.getElementById("startBtn").click();
});

let posiciones = [0, 0, 0, 0];
let movimientos = [false, false, false, false];
const velocidadAvance = 1;
const velocidadRegreso = -1;
const intervalo = 30;
let regreso = false;

const botonesInicio = [
    document.getElementById("v1-start"),
    document.getElementById("v2-start"),
    document.getElementById("v3-start"),
    document.getElementById("v4-start")
];
const botonesFinal = [
    document.getElementById("v1-end"),
    document.getElementById("v2-end"),
    document.getElementById("v3-end"),
    document.getElementById("v4-end")
];

function actualizarSensores(index) {
    if (posiciones[index] <= 0) {
        botonesInicio[index].classList.add("active");
        botonesFinal[index].classList.remove("active");
    } else if (posiciones[index] >= 90) {
        botonesFinal[index].classList.add("active");
        botonesInicio[index].classList.remove("active");
    } else {
        botonesInicio[index].classList.remove("active");
        botonesFinal[index].classList.remove("active");
    }
}

function moverVagon(index, velocidad) {
    posiciones[index] += velocidad;
    document.getElementById(`vagon${index + 1}`).style.left = `${posiciones[index]}%`;
    actualizarSensores(index);

    if (!regreso && index < 3 && posiciones[index] >= 50 && !movimientos[index + 1]) {
        movimientos[index + 1] = true;
    }

    if (regreso && index < 3 && posiciones[index] <= 50 && !movimientos[index + 1]) {
        movimientos[index + 1] = true;
    }

    if (!regreso && posiciones[index] >= 90) {
        if (index === 3) {
            regreso = true;
            movimientos.fill(false);
            movimientos[0] = true;
        } else {
            movimientos[index] = false;
        }
    } else if (regreso && posiciones[index] <= 0) {
        if (index === 3) {
            regreso = false;
            movimientos.fill(false);
        } else {
            movimientos[index] = false;
        }
    }
}

function iniciarSimulacion() {
    movimientos.fill(false);
    movimientos[0] = true;

    let interval = setInterval(() => {
        for (let i = 0; i < 4; i++) {
            if (movimientos[i]) moverVagon(i, regreso ? velocidadRegreso : velocidadAvance);
        }

        if (!movimientos.some((m) => m)) clearInterval(interval);
    }, intervalo);
}