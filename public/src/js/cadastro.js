import { artesanatos } from './service.js'

const form = document.querySelector("#form__cadastro");

form.addEventListener('submit', (event)=> {

    event.preventDefault();

    let novoProduto = {
        artesanato : form.artesanato.value,
        artesao: form.artesao.value,
        descricao: form.descricao.value,
        valor: form.valor.value
    }
    console.log(novoProduto)
    artesanatos.add(novoProduto).then((docRef) => {
        form.reset();
       alert(`Cadastro do produto ${novoProduto.artesanato} ocorreu com sucesso!`)
    })
    .catch((error) => {
        alert(`Cadastro do produto ${novoProduto.artesanato} não pode ser concluido`)
        console.error("Error adding document: ", error);
    });
})