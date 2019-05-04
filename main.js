// define global constant and variables
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 30

class Juego {
  /**
   * this object have all the game logic
   */
  constructor() {
    /**
     * prepare the game before start.
     * bind some methods to prevent errors when call "this"
     */
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    this.siguienteNivel()
  }

  inicializar() {
    /**
     * start a new game at level 1
     */
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBotonIniciar()
    this.nivel = 1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBotonIniciar() {
    /**
     * show and hide the button start
     */
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    /**
     * define an array with the color combination for every new game
     */
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    /**
     * restart the sub level status
     * call the light up method
     * call the event listener method
     */
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  iluminarSecuencia() {
    /**
     * light up the color sequence for the current level
     * each color lights up for 1 second
     */
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  transformarNumeroAColor(numero) {
    /**
     * transform the number color to color string
     * @param {int} numero: color number id used as button in the game board
     * @return {string} string color used in the game board
     */
    switch (numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color) {
    /**
     * transform the color string to number color
     * @param {string} color: color string used as button in the game board
     * @return {int} color number used in the game board
     */
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarColor(color) {
    /**
     * turn on the light up for 350 milliseconds for the color button
     * call the light off function
     * @param {string} color: string color for call the id name button
     */
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    /**
     * turn of the light up for the color button
     * @param {string} color: string color for call the id name button
     */
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    /**
     * start the event listener for every button in the game board
     */
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }

  eliminarEventiClick() {
    /**
     * stop the event listener for every button in the game board
     */
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }

  elegirColor(evento) {
    /**
     * catch the color selected by the user and compare with the game sequence
     * main game function
     */
    const nombreColor = evento.target.dataset.color
    this.iluminarColor(nombreColor)
    const numeroColor = this.transformarColorANumero(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel ++
      if (this.subnivel === this.nivel) {
        this.nivel ++
        this.eliminarEventiClick()
        if (this.nivel == (ULTIMO_NIVEL +1)) {
          this.ganoElJuego()
        } else {
          setTimeout(this.siguienteNivel, 1500)
        }
      } 
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    /**
     * show the user that the game is finished and he or she won
     */
    Swal.fire("Felicidades", "Has completado todos los niveles.", "success")
    .then(this.inicializar())
  }

  perdioElJuego() {
    /**
     * show the user that the game is finished and he or she had lost
     */
    Swal.fire("has perdido", "Vuelve a intentarlo la proxima.", "error")
    .then(() => {
      this.eliminarEventiClick()
      this.inicializar()
    })
  }
}


function empezarJuego() {
  /**
   * call the game logic when the user press the start button
   */ 
  window.juego = new Juego()
}