import React, { useState, useEffect } from "react";
import { Pokemon } from "../pokemon/Pokemon";
import { getPokemonList } from "../../helpers/fetchFn";
import { Checkbox } from "../checkbox/Checkbox";
import { Loader } from "../loader/Loader";

import "./PokemonList.css"



export const PokemonList = () => {

    const initFilters = {
        type: [null],
    }

    const [pokemonList, setPokemonList] = useState([]);
    const [baseUrl, setBaseUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=12');
    const [idNumber, setIdNumber] = useState(null);
    const [typeList, setTypeList] = useState([]);
    const [mainItemInfo, setMainItemInfo] = useState([]);
    const [filters, setFilters] = useState(initFilters);
    const [loading, setLoading] = useState(false);


    const uniqueTypeList = typeList.filter(function(item, pos) {
        return typeList.indexOf(item) == pos;
    })


    useEffect(() => {
        pokemonList.map((pokemon) => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(res => {
                    res.typeValues = [];
                    res.types.forEach((type, i) => {
                        res.typeValues = [...res.typeValues, type.type.name];
                    })
                    pokemon.typeValues = res.typeValues;
                    setMainItemInfo(res);
                })
                .catch((error) => {
                    console.log('error', error);
                });

            if (mainItemInfo.types) {
                mainItemInfo.types.forEach((type, i) => {
                    typeList.push(type.type.name)
                })
            }
        })
    }, [pokemonList])

    useEffect(() => {
        getPokemonList(baseUrl, pokemonList, setPokemonList, setBaseUrl, setLoading);
    }, [])

    const getMorePokemons = () => {
        getPokemonList(baseUrl, pokemonList, setPokemonList, setBaseUrl, setLoading);
    }

    const filterTypeItems = (item) => {
        for (let elem of filters.type) {
            if (item.typeValues) {
                if (item.typeValues[0] === elem || item.typeValues[1] === elem ) {
                    return item;
                }
            }
        }
    }

    const filteredPokemonList = pokemonList.filter((item) => {
       return (filters.type[0] === null || filters.type.length === 0 ? true : filterTypeItems(item))
    })

    const onTypeChanged = (types) => {

        let { type } = filters;
        const index = type.findIndex((el) => el == types);

        let typeArr = uniqueTypeList;
        const indexType = typeArr.findIndex((el) => el == types);

        if (type.length === 0) {
            if (types === null) {
                type = [null]
            } else {
                type.push(types);
            }
        } else {
            if (type.length === 1 && type[0] === null) {
                if (types === null) {
                    type = []
                } else {
                    if (indexType >= 0) {
                        typeArr.splice(indexType, 1);
                        type = typeArr;
                    }
                }
            } else {
                if (index >= 0) {
                    if (types === null) {
                        type = []
                    } else {
                        type.splice(index, 1);
                    }
                } else {
                    if (types === null) {
                        type = [null]
                    } else {
                        type.push(types);
                    }
                }
            }
        }

        setFilters({ ...filters, type });
    }

    const handleClickTypeItem = (type) => () => {
        onTypeChanged(type);
    }

    return (
        <>
            {loading && <Loader/>}
            <div className='titleText'>Pokedex</div>
            <div className='filterTitle'>Filter by type:</div>
            <div className='typeFilterWrapper'>
                <div onClick={handleClickTypeItem(null)} key={null} className='typeFilterItem'>
                    <Checkbox checked={filters.type.some((el) => el === null || filters.type.length === uniqueTypeList.length)} />All
                </div>
                {
                    uniqueTypeList.map((type) => {
                        return (
                            <div onClick={handleClickTypeItem(type)} key={type} className='typeFilterItem'>
                                <Checkbox checked={filters.type.some((el) => el == type || el === null)}  />
                                {type}
                            </div>
                        )
                    })
                }
            </div>
            <div className="listContainer">
                {filteredPokemonList.map((pokemon) => {

                    return <Pokemon
                        key={pokemon.name}
                        urItem={pokemon.url}
                        name={pokemon.name}
                        idNumber={idNumber}
                        setIdNumber={setIdNumber}
                        setTypeList={setTypeList}
                        typeList={typeList}
                    />
                })}
                <button disabled={loading} onClick={getMorePokemons} className='loadMoreBtn'>Load More</button>
            </div>
        </>
    )
}