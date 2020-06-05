import React, { useState } from 'react';

import CharPicker from './components/character-picker/CharPicker';
import Character from './components/character/Character';
import Team from './components/team/Team'
import Button from 'react-bootstrap/Button';
import Adventure from './components/adventure/Adventure';
import { useDocumentTitle } from './hooks/useDocumentTitle';

// Here we transformed the App component to be a hook-based component where useState hook is used to work as a functional component, while still managing the state at the same time.
const App = props => {
  const [chosenSide, setChosenSide] = useState('light')
  const [selectedCharacter, setSelectedCharacter] = useState('Rick');
  const [destroyed, setDestroyed] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(['Rick']);
  const [simulationOutcome, setSimulationOutcome] = useState(false);

  // We can define a function inside another function by making it const
  const sideHandler = side => {
    // In classic react we'd use this.setState({ side: side }); but since setState is now a constant (and you're not inside a class anymore), the 'this' keyword is no longer needed.
    // ...state - also saves the current attributes of the state. This state is basically what the above useState returns.
    // setState({...state, side: side });

    // A simpler version, making use of hooks:
    setChosenSide(side);
  };

  // One advantage of hooks can be seen here: in order to not lose our current attributes of the state, we need to manually merge all the state attributes when wanting to set
  // one of them to something new. This is accomplished by using for example setState({ ...state, destroyed: true });. However, doing that manually everytime is not a nice experience.
  // The reason why we need to do this is because in class-based components we used to have a single state. However, when using hooks, we can define several states. This is the reason
  // why in the class-based version we didn't need to merge the attributes manually: because we only had one state. Now with hooks we can have multiple of them. 

  const charSelectHandler = event => {
    const charId = event.target.value;
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    setDestroyed(true);

  };

  const addToTeamHandler = () => {
    setCurrentTeam(currentTeam.concat(selectedCharacter));
  }

  const simulationHandler = () => {
    setSimulationOutcome(!simulationOutcome);
  }

  useDocumentTitle("Adventure began!");

  let content = (
    <React.Fragment>
      <body>
        <h1>Build your own adventure</h1>
        <span>Choose your hero: </span>
        <row>
          <CharPicker
            side={chosenSide}
            selectedChar={selectedCharacter}
            onCharSelect={charSelectHandler}
          />
        </row>
        <Character selectedChar={selectedCharacter} />
        <Button onClick={addToTeamHandler} variant='success' size='lg'>Add to team</Button>
        <span>&nbsp;</span>
        <Button onClick={sideHandler.bind(this, 'light')} variant="outline-info" size="lg" active> Light Side</Button>
        <span>&nbsp;</span>
        <Button onClick={sideHandler.bind(this, 'dark')} variant="dark" size="lg">Dark Side</Button>
        <span>&nbsp;</span>
        {chosenSide === 'dark' && (
          <Button onClick={destructionHandler} variant="danger" size="lg">DESTROY!</Button>
        )}
        <br /><br />
        <h2>Your team</h2>
        <Team items={currentTeam} />
        <br />
        <h2>Adventure simulator</h2>
        <Button onClick={simulationHandler} variant='success' size='lg'>Start new adventure!</Button>
        <Adventure simulationOutcome={simulationOutcome}></Adventure>
      </body>
    </React.Fragment >
  );

  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
}

export default App;
