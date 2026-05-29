import React, { useEffect } from 'react'
import ranks from '../data/ranks.json'

function Attribute(props) {
    const { rank, pointsLeft, attributename, value = 0, onChange } = props;
    const { rankNumber, name, cap, points, powerpicks, bonustrait } = rank || {};

    return (
        <div className="attribute stat">
            <span className="stat-label attribute-name">{attributename}:</span>
            <input 
                type="text"
                className="attribute" 
                name={attributename} 
                min="0" 
                max={rank && cap} 
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value) || 0)} 
            />
            <span className="increment-buttons">
                <button onClick={() => onChange(Math.max(0, value - 1))} disabled={value <= 0}>-</button>
                <button onClick={() => onChange(Math.min(rank ? cap : 0, value + 1))} disabled={pointsLeft <= 0}>+</button>
            </span>
        </div>
    )
}

export default Attribute