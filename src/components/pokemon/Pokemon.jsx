import React, {useEffect, useState} from "react";
import { getPokemonItem } from "../../helpers/fetchFn";
import { PokemonInfo } from "../pokemonInfo/PokemonInfo";

import "./pokemon.css"


export const Pokemon = ({ name, urItem, idNumber, setIdNumber, setTypeList, typeList }) => {

    const [itemInfo, setItemInfo] = useState({});
    const [showItemInfo, setShowItemInfo] = useState(false);


    useEffect(() => {
        if (urItem) {
            getPokemonItem(urItem, setItemInfo)
        }
    }, [urItem])

    useEffect(() => {
        if (itemInfo.types) {
            itemInfo.types.map((type) => {
                typeList.push(type.type.name);
                setTypeList(typeList);
            })

        }
    }, [itemInfo])


    const handleClickPokemonItem = () => {

        let activeEl = document.getElementById(itemInfo.id);
        if (activeEl && activeEl.classList && activeEl.classList.contains("active") === false) {
            activeEl.classList.add("active")
        }

        if (idNumber !== null && idNumber != itemInfo.id) {
            let result = document.getElementById(idNumber)
            if (result !== null) {
                result.classList.remove('active');
                setShowItemInfo(false)
            }
        }
        setShowItemInfo(true)
        setIdNumber(itemInfo.id);
    }

    const handleClickCloseIcon = () => {
        setShowItemInfo(false);
    }


    return (
        <>
            <div onClick={handleClickPokemonItem} className='itemContainer'>
                <div className='imagePlaceholder'>
                    <div className='diagonalFirst'></div>
                    <div className='diagonalSecond'></div>
                </div>
                <div className='nameTitle'>{name}</div>
                <div className='itemTypeContainer'>
                    {itemInfo.types ?
                        itemInfo.types.map((type) => {
                            let backgroundClass = '';
                            if (type.type.name === 'grass') {
                                backgroundClass = 'green'
                            } else if (type.type.name === 'poison') {
                                backgroundClass = 'purple'
                            }
                            else if (type.type.name === 'fire') {
                                backgroundClass = 'pink'
                            }
                            else if (type.type.name === 'electric') {
                                backgroundClass = 'yellow'
                            } else {
                                backgroundClass = 'grey'
                            }
                            return <div key={type.type.name} className={`itemType ${backgroundClass}`}>{type.type.name}</div>
                        })
                        : ''
                    }
                </div>
            </div>
            <div className='pokemonInfoContainer'>
                {
                    showItemInfo &&
                    <PokemonInfo
                        onClose={handleClickCloseIcon}
                        name={name}
                        itemInfo={itemInfo}
                        showItemInfo={showItemInfo}
                        setShowItemInfo={setShowItemInfo}
                    />
                }
            </div>
        </>
    )
}