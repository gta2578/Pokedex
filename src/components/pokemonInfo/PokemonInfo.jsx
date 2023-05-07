import React from "react";
import imgClose from '../../icons/close_icon_small.svg';

import './PokemonInfo.css'


export const PokemonInfo = ({ itemInfo, name, onClose, showItemInfo }) => {



    return (
        <div onClick={onClose} className={showItemInfo ? 'mainInfoWrapper active' : 'mainInfoWrapper'}>
            <div id={itemInfo.id} className={showItemInfo ? 'infoContainer active' : 'infoContainer'}>
                <div className='closeIconWrapper'>
                    <img onClick={onClose} className='closeIcon' src={imgClose} alt="close icon" />
                </div>
                <div className='imagePlaceholderInfo'>
                    <div className='diagonalFirstInfo'></div>
                    <div className='diagonalSecondInfo'></div>
                </div>
                <div className='infoName'>{name} #{itemInfo.id}</div>
                <div className='mainInfoContainer'>
                    <div className='itemInfoContainer'>
                        <div className='itemInfoName'>Type</div>
                        <div className='itemInfoValue'>
                            <div className='typeItemWrapper'>
                                {
                                    itemInfo.types ? itemInfo.types.map((type) => {
                                            return <div key={type.type.name} className='typeItem'>{type.type.name}</div>
                                        })
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                    {
                        itemInfo.stats ? itemInfo.stats.map((elem) => {
                            return (
                                <div key={elem.stat.name} className='itemInfoContainer'>
                                    <div className='itemInfoName'>{elem.stat.name}</div>
                                    <div className='itemInfoValue'>{elem.base_stat}</div>
                                </div>
                            )
                        })
                        : ''
                    }
                    <div className='itemInfoContainer'>
                        <div className='itemInfoName'>Weight</div>
                        <div className='itemInfoValue'>{itemInfo.weight ? itemInfo.weight : ''}</div>
                    </div>
                    <div className='itemInfoContainer'>
                        <div className='itemInfoName'>Total moves</div>
                        <div className='itemInfoValue'>{itemInfo.moves ? itemInfo.moves.length : ''}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}