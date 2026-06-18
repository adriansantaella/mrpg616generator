import React from 'react'
import { FaDiceD20 } from "react-icons/fa";
import '../index.css'

function InputSelect({ label, type, data, keyName = null, displayProp = null, selectedValue, randomize, onChange }) {
    console.log(label);
    return (
        <div className={`${label} stat`}>
            <div className={`input-group ${label}-input`}>
                <span className="stat-label">{label}:</span>
                {
                    type && type === 'select' ?
                        <select className={`input-select ${label}-select`} value={keyName ? selectedValue[keyName] : selectedValue} onChange={onChange}>
                            <option value="">Select {label}</option>
                            {data.map((optionItem, index) => {
                                return (
                                    <option key={index} value={keyName ? optionItem[keyName] : optionItem}>
                                        {keyName ? optionItem[displayProp] : optionItem}
                                    </option>
                                )
                            })}
                        </select>
                        :
                        <input className="input-text" type="text" placeholder={`Select ${label}`} value={selectedValue} onChange={onChange} />
                }
            </div>
            <button className="generate-button" onClick={randomize}><FaDiceD20 /></button>
        </div>
    )
}

export default InputSelect