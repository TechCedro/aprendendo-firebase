import { artesanatos } from './service.js'

const criarQueryAplicandoFiltros = (filtros) => {
    let query = artesanatos;
    for (let filtro in filtros) {
        if (filtros[filtro].length > 0)
            query = artesanatos.where(filtro, '==', filtros[filtro]);
    }

    return query;
}

export const pesquisar = async (filtros) => {
    const query = criarQueryAplicandoFiltros(filtros)
    const result = await query.get();
    const response = result.docs.map(doc => doc.data());

    return response;
}