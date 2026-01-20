/************************************************
 *  CRONÓMETRO 
 ***********************************************/

class Cronometro {
  constructor() {
    this.inicio = null;
    this.tiempoAcumulado = 0;
    this.intervalo = null;
    this.enEjecucion = false;
  }

  iniciar(callback) {
    if (this.enEjecucion) return;

    this.enEjecucion = true;
    this.inicio = Date.now();

    this.intervalo = setInterval(() => {
      callback(this.obtenerTiempoFormateado());
    }, 1000);
  }

  pausar() {
    if (!this.enEjecucion) return;

    clearInterval(this.intervalo);
    this.intervalo = null;
    this.enEjecucion = false;

    this.tiempoAcumulado += Date.now() - this.inicio;
  }

  reiniciar(callback) {
    clearInterval(this.intervalo);
    this.intervalo = null;

    this.inicio = null;
    this.tiempoAcumulado = 0;
    this.enEjecucion = false;

    callback("00:00");
  }

  obtenerTiempoFormateado() {
    let tiempoTotal = this.tiempoAcumulado;

    if (this.enEjecucion) {
      tiempoTotal += Date.now() - this.inicio;
    }

    const segundosTotales = Math.floor(tiempoTotal / 1000);
    const minutos = String(Math.floor(segundosTotales / 60)).padStart(2, "0");
    const segundos = String(segundosTotales % 60).padStart(2, "0");

    return `${minutos}:${segundos}`;
  }
}

// ===== USO CRONÓMETRO =====
const salida = document.getElementById("salida");
const cronometro = new Cronometro();

function toggleCronometro() {
  if (cronometro.enEjecucion) {
    cronometro.pausar();
  } else {
    cronometro.iniciar((tiempo) => {
      salida.textContent = tiempo;
    });
  }
}

function reiniciar() {
  cronometro.reiniciar((tiempo) => {
    salida.textContent = tiempo;
  });
}

/************************************************
 *  SUMATORIA (ESTABA FALTANDO)
 ***********************************************/

class Sumatoria {
  constructor(base) {
    this.base = base;
    this.mostrarBaseInicial();
  }

  mostrarBaseInicial() {
    const div = document.getElementById("resultadoSumatoria");
    div.innerHTML = `<p>Base inicial: <strong>${this.base}</strong></p>`;
  }

  sumar() {
    let total = 0;

    for (let i = 1; i <= this.base; i++) {
      total += i;
    }

    const div = document.getElementById("resultadoSumatoria");

    div.innerHTML += `
      <p>
        Sumatoria hasta <strong>${this.base}</strong> =
        <strong>${total}</strong>
      </p>
    `;

    this.base++;
  }
}

// ===== USO SUMATORIA =====
const baseAleatoria = Math.floor(Math.random() * 10) + 1;
const sumatoria = new Sumatoria(baseAleatoria);

function ejecutarSumatoria() {
  sumatoria.sumar();
}
