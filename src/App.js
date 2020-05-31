import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

// Here we transformed the App component to be a hook-based component where useState hook is used to work as a functional component, while still managing the state at the same time.
const App = props => {
  // State = the current state; setState = a function that allows us to override the current state, s.t. state is updated
  // const [state, setState] = useState({
  //   selectedCharacter: 1,
  //   destroyed: false});

    const [chosenSide, setChosenSide] = useState('light') // The state does not necessarily have to be an object, it can be a string, just like here. 

    const [selectedCharacter, setSelectedCharacter] = useState(1);

    const [destroyed, setDestroyed] = useState(false);

    // We can define a function inside another function by making it const
  const sideHandler = side => {
    // In classic react you'd use this.setState({ side: side }); but since setState is now a constant (and you're not inside a class anymore), the 'this' keyword is no longer needed.
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
    // setState({ ...state, selectedCharacter: charId });
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    setDestroyed(true);
  };

    let content = (
      <React.Fragment>
        <CharPicker
        // Same story here: 'this' keyword is no longer needed.
          side={chosenSide}
          selectedChar={selectedCharacter}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={selectedCharacter} />
        <button onClick={sideHandler.bind(this, 'light')}>Light Side</button>
        <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
        {chosenSide === 'dark' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    if (destroyed) {
      content = <h1>Total destruction!</h1>;
    }
    return content;
  }

export default App;
