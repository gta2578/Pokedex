import React from "react";
import small_check from '../../icons/small_check.svg';

import './Checkbox.css'

export const Checkbox = ({ checked }) => {

    const checkboxClass = `wrapper checkbox ${checked ? 'check' : ''}`;

    return (
        <div tabIndex={0} className={checkboxClass}>
            {checked && <img src={small_check} alt="checkbox" />}
        </div>
    )
}