class Carregamento {
    constructor() {
        this.elemento = document.querySelector('.carregando')
    }
    exibir() {
        this.elemento.classList.add('carregando--ativo')
    }
    esconder() {
        this.elemento.classList.remove('carregando--ativo')

    }
}

export default new Carregamento()