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
            return query.limit(3);
        case "proximo":
            return query.startAfter(ultimoElemento).limit(3);
        case "anterior":
            return query.endBefore(primerioElemento).limitToLast(3);
        default:
            return query;
    }
}

export const pesquisar = async (filtros, tipo) => {
    const query = aplicarPaginacao(criarQueryAplicandoFiltros(filtros), tipo)
    const result = await query.get();

    if (!result.empty) {
        primerioElemento = result.docs[0]
        ultimoElemento = result.docs[result.docs.length - 1]

    }
    return result.docs.map(doc => doc.data());
}