import { artesanatos } from './service.js'

let ultimoElemento = 0
let primerioElemento = 0

const criarQueryAplicandoFiltros = (filtros) => {
    let query = artesanatos.orderBy('valor');
    for (let filtro in filtros) {
        if (filtros[filtro].length > 0)
            query = artesanatos.where(filtro, '==', filtros[filtro]);
    }

    return query;
}

const aplicarPaginacao = (query, tipo) => {

    switch (tipo) {
        case "normal":
            query = query.limit(3)
            break
        case "proximo":
            query = query.startAfter(ultimoElemento).limit(3)
            break;
        case "anterior":
            query = query.endBefore(primerioElemento).limitToLast(3)
            break
    }

    return query;
}

export const pesquisar = async (filtros, tipo) => {
    let query = criarQueryAplicandoFiltros(filtros)
    query = aplicarPaginacao(query, tipo)
    const result = await query.get();

    if (!result.empty) {
        primerioElemento = result.docs[0]
        ultimoElemento = result.docs[result.docs.length - 1]

    }
    const response = result.docs.map(doc => doc.data());

    return response;
}