import React from 'react';

const CurrentStats = props => {
    return (
        <div className="summary">
            <h1>Remaining Life:  <span className="summary__output">{props.remainingLife}</span></h1>
        </div>
    )
};

export default CurrentStats;