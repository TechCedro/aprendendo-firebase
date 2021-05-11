import { artesanatos } from './service.js'

const listaElemento = document.querySelector('#lista__artesanatos')

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


const renderizarLista = (arrayProdutos) => {

    listaElemento.innerHTML = arrayProdutos.map((produto) => {
        return criarItem(produto)
    })
}


artesanatos.get().then((querySnapshot) => {
    const arrayProdutos = querySnapshot.docs.map(item => item.data());
    renderizarLista(arrayProdutos)
});

