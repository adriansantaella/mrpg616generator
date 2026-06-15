import React, { useEffect } from 'react'
import ranks from '../data/ranks.json'
import { FaBurst } from "react-icons/fa6";

function Attribute(props) {
    const { rank, pointsLeft, attributename, value = 0, onChange, isHighest } = props;
    const { rankNumber, name, cap, points, powerpicks, bonustrait } = rank || {};

    return (
        <div className={`attribute stat ${isHighest ? 'highest-attribute' : ''}`}>
            <div className="attribute-input">
                <span className="stat-label attribute-name">{attributename}:</span>
                <div className="attribute-value-container">
                    <div className={`attribute-value ${value >= cap ? 'maxed-out' : ''}`}>
                        <span>{value}</span>
                        {value >= cap && <FaBurst className="burst-icon" />}
                    </div>
                </div>
            </div>
            <div className="increment-buttons">
                <button onClick={() => onChange(Math.max(0, value - 1))} disabled={value <= 0}>-</button>
                <button onClick={() => onChange(Math.min(rank ? cap : 0, value + 1))} disabled={pointsLeft <= 0 || rank?.cap <= value}>+</button>
            </div>
        </div>
    )
}

export default Attribute