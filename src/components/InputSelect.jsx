import React from 'react'
import '../index.css'

function InputSelect({rank, onRankChange}) {
    const rankOptions = ranks.map((rank, index) => <option key={rank.rankNumber} value={rank.name}>{rank.rankNumber} | {rank.name}</option>)

    return (
        <div className="rank-dropdown stat">
            <div className="input-group rank-input">
                <span className="stat-label">Rank:</span>
                <select className="rank-select" value={rank?.name} name="rank" onChange={(e) => onRankChange(ranks.find((r) => r.name === e.target.value))}>
                    <option value="none">None Selected...</option>
                    {rankOptions}
                </select> 
            </div>
            
        </div>
    )
}

export default InputSelect