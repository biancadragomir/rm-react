import React from 'react';
import { useState } from 'react';
import { usePrevious } from '../../hooks/previousProps';
import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';

import AdventureSimulator from './AdventureSimulator';
import { useHttp } from '../../hooks/http';

const Adventure = props => {

  let simulationOutcome = null;

  const [currentLifeLevel, setCurrentLifeLevel] = useState(1000);
  const previousLifeLevel = usePrevious(currentLifeLevel);

  const clickHandler = () => {
    let newLifeLevel = currentLifeLevel - simulationOutcome.damage;
    if (newLifeLevel < 0) newLifeLevel = 0;
    setCurrentLifeLevel(newLifeLevel);
  }

  const [isLoading, fetchedData] = useHttp('http://localhost:1958/simulateAdventure/', [props.simulationOutcome]);
  if (fetchedData) {
    simulationOutcome = {
      status: fetchedData.status,
      damage: fetchedData.damage,
      rewards: fetchedData.rewards
    };
  }

  let content = <p>Loading simulation...</p>;

  if (props.simulationOutcome == false) content = <p>No simulation yet.</p>;

  if (!isLoading && simulationOutcome) {
    content = (
      <div>
        <AdventureSimulator
          damage={simulationOutcome.damage}
          status={simulationOutcome.status}
          reward={simulationOutcome.rewards}
          previousLifeLevel={previousLifeLevel}
          currentLifeLevel={currentLifeLevel}
        />
        <Button
          onClick={clickHandler}
          disabled={simulationOutcome.status === 'Failed' || currentLifeLevel == 0}
          variant={fetchedData.status === 'Failed' || currentLifeLevel == 0 ? "danger" : "info"}>Advance</Button>
        {
          currentLifeLevel < 0 && (
            <h4>Ya DEAD.</h4>)}
      </div>
    );
  } else if (!isLoading && !simulationOutcome) {
    content = <p>Failed to run simulation.</p>;
  }
  return content;
}

// Will only re-render when something actually changed in the component.
export default React.memo(Adventure, (prevProps, nextProps) => {
  return (
    nextProps.simulationOutcome === prevProps.simulationOutcome
  )
})