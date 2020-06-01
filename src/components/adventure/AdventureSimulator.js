import React from 'react';

const AdventureSimulator = props => {
    return(
    <div className="summary">
        <h1>Status:  <span className="summary__output">{props.status}</span></h1>
        <p> Damage taken: <span className="summary__output">{props.damage}</span></p>
        <p>Reward: <span className="summary__output">{props.reward}</span></p>
    </div>);
}

export default AdventureSimulator;