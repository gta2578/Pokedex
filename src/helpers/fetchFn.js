
export const getPokemonList = (baseUrl, pokemonList, setPokemonList, setBaseUrl, setLoading) => {
    setLoading(true);
    fetch(baseUrl)
        .then(response => response.json())
        .then(res => {
            setPokemonList([...pokemonList, ...res.results]);
            setBaseUrl(res.next);
        })
        .catch((error) => {
            console.log('error', error);
        })
        .finally(() => {
            setLoading(false);
        })
}

export const getPokemonItem = (itemUrl, setItemInfo) => {
    fetch(itemUrl)
        .then(response => response.json())
        .then(res => {
            setItemInfo(res);
        })
        .catch((error) => {
            console.log('error', error);
        });
}