import { artesanatos } from '../servicos/service.js'

const form = document.querySelector("#form__cadastro");

form.onsubmit = (event) => {
    event.preventDefault();
    let novoProduto = {
        artesanato: form.artesanato.value,
        artesao: form.artesao.value,
        descricao: form.descricao.value,
        valor: form.valor.value
    }
    artesanatos.add(novoProduto).then(() => {
        form.reset();
        alert(`Cadastro do produto ${novoProduto.artesanato} ocorreu com sucesso!`)
    })
        .catch((error) => {
            alert(`Cadastro do produto ${novoProduto.artesanato} não pode ser concluido`)
            console.error("Error adding document: ", error);
        });
})