import { pesquisar } from '../servicos/listar.js'

const listaElemento = document.querySelector('#lista__artesanatos')
const filtrosFormElementos = document.querySelector('#form__filtros')
const botaoProximo = document.querySelector('#botao__proximo')
const botaoAnterior = document.querySelector('#botao__anterior')

const montarFiltros = () => {
    let filtros = {
        artesanato: filtrosFormElementos.artesanato.value,
        artesao: filtrosFormElementos.artesao.value
    }
    for (let filtro in filtros) {
        filtros[filtro] = filtros[filtro].trim();
    }
}
const criarItem = (produto) => {
    return `
    <li class="item__artesanato">
        <div class="item__conteudo">
            <h2 class="item__titulo"> ${produto.artesanato} </h2>
            <span class="item__artesao">  ${produto.artesao} </span>
            <p class="item__descricao"> ${produto.descricao}  </p>
       </div>
        <div class="item__rodape">
             <h2 class="item__valor"> <small>R$</small> ${produto.valor}</h2>
             <button type="button" class="item__comprar"> Comprar</button>
        </div>
    </li>
`
}
const obterProdutos = async (tipo) => {
    const filtros = montarFiltros();
    const arrayProdutos = await pesquisar(filtros, tipo)
    if (tipo === "normal") renderizarLista(arrayProdutos)
    else if (arrayProdutos.length) renderizarLista(arrayProdutos)
}

const renderizarLista = (arrayProdutos) => {
    listaElemento.innerHTML = arrayProdutos.map((produto) => {
        return criarItem(produto)
    }).join(" ")
}
filtrosFormElementos.onsubmit = (event) => {
    event.preventDefault();
    obterProdutos("normal")
}
botaoProximo.onclick = () => {
    obterProdutos("proximo")
}
botaoAnterior.onclick = () => {
    obterProdutos("anterior")
}
obterProdutos("normal")