import React from 'react';

import AdventureSimulator from './AdventureSimulator';
import { useHttp } from '../../hooks/http';

const Adventure = props => {

  let simulationOutcome = null;
  const [isLoading, fetchedData] = useHttp('http://localhost:1958/simulateAdventure/', [props.simulationOutcome]);
  if (fetchedData) {
    simulationOutcome = {
      status: fetchedData.status,
      damage: fetchedData.damage,
      rewards: fetchedData.rewards
    };
  }

  let content = <p>Loading simulation...</p>;

  console.log("Simulation outcome: " + props.simulationOutcome);
  if (props.simulationOutcome == false) content = <p>No simulation yet.</p>;

  if (!isLoading && simulationOutcome) {
    content = (
      <AdventureSimulator
        damage={simulationOutcome.damage}
        status={simulationOutcome.status}
        reward={simulationOutcome.rewards}
      />
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
