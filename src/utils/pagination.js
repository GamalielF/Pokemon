export const paginationLogic = (currentPage, pokemonsByName, pokesPerPage) => {
    // Cantidad de pokemones por página
    const POKEMONS_PER_PAGE = +pokesPerPage;

    // Pokemones que se van a mostrar en la página actual
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);

    const lastPage = pokemonsByName.length
    ? Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE)
    : 1;

    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
    if (i <= lastPage) {
        pagesInBlock.push(i);
    }
    }

    return { pokemonInPage, lastPage, pagesInBlock, PAGES_PER_BLOCK, POKEMONS_PER_PAGE };
}