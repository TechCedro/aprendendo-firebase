import { pesquisar } from '../servicos/listar.js';
import Carregamento from '../componentes/carregamento.js';
import PaginacaoEnum from '../objetos/PaginacaoEnum.js';

const listaElemento = document.querySelector('#lista__artesanatos');
const filtrosFormElementos = document.querySelector('#form__filtros');
const botaoProximo = document.querySelector('#botao__proximo');
const botaoAnterior = document.querySelector('#botao__anterior');
const botaoTodos = document.querySelector('#botao__todos');

const montarFiltros = () => {
    let filtros = {
        artesanato: filtrosFormElementos.artesanato.value,
        artesao: filtrosFormElementos.artesao.value
    }
    for (let filtro in filtros) {
        filtros[filtro] = filtros[filtro].trim();
    }

    return filtros;
}
const criarItemHTML = (produto) => {
    return `
    <li class="item__artesanato">
        <div class="item__conteudo">
            <h2 class="item__titulo"> ${produto.artesanato} </h2>
            <span class="item__artesao">  ${produto.artesao} </span>
            <p class="item__descricao"> ${produto.descricao}  </p>
       </div>
        <div class="item__rodape">
             <h2 class="item__valor"> <small>R$</small> ${Number(produto.valor).toFixed(2)}</h2>
             <button type="button" class="item__comprar"> Comprar</button>
        </div>
    </li>
`;
}

const obterProdutos = async (tipo) => {
    Carregamento.exibir();    
    const arrayProdutos = await pesquisar(montarFiltros(), tipo);
    if (tipo === "normal") renderizarLista(arrayProdutos);
    else if (arrayProdutos.length) renderizarLista(arrayProdutos);

    Carregamento.esconder();
}

const renderizarLista = (arrayProdutos) => {
    listaElemento.innerHTML = arrayProdutos.map((produto) => {
        return criarItemHTML(produto);
    }).join(" ");
}

filtrosFormElementos.onsubmit = (event) => {
    event.preventDefault();
    obterProdutos(PaginacaoEnum.NORMAL);
}

botaoProximo.onclick = () => {
    obterProdutos(PaginacaoEnum.PROXIMO);
}

botaoAnterior.onclick = () => {
    obterProdutos(PaginacaoEnum.ANTERIOR);
}

botaoTodos.onclick = () => {
    obterProdutos(PaginacaoEnum.TODOS);
}

obterProdutos(PaginacaoEnum.NORMAL);