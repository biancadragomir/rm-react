import React from 'react';

import './Summary.css';

const Summary = props => {
  return (
    <div className="summary">
      <h1>{props.characterName}</h1>
      <div class="row">
        <div class="column">
          <img src={props.imageUrl} height="100" width="100" alt="rick and morty" />
        </div>
        <div class="column">
          <p>
            Favorite device: <span className="summary__output">{props.favoriteDevice}</span>
          </p>
          <p>
            Current year: <span className="summary__output">{props.currentYear}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;