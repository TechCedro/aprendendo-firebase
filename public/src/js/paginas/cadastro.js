import { artesanatos } from '../servicos/service.js'
import Carregamento from '../componentes/carregamento.js'

const form = document.querySelector("#form__cadastro");

const montarNovoProduto = () => {
    return {
        artesanato: form.artesanato.value,
        artesao: form.artesao.value,
        descricao: form.descricao.value,
        valor: parseFloat(form.valor.value)
    }
}

form.onsubmit = async (event) => {
    Carregamento.exibir()
    event.preventDefault();

    try {
        const novoProduto = montarNovoProduto();
        await artesanatos.add(novoProduto);
        form.reset();
        alert(`Cadastro do produto ${novoProduto.artesanato} ocorreu com sucesso!`);
    } catch (error) {
        alert(`Cadastro do produto ${novoProduto.artesanato} não pode ser concluido`);
        console.error("Error adding document: ", error);
    }

    Carregamento.esconder();
}