import React from 'react';
import { useHttp } from '../../hooks/http';
import './CharPicker.css';

const CharPicker = props => {
  // In the old react approach here you'd use state = { characters: [], isLoading: false };. But since we can take advantage of hooks, we are going to use instead
  // the useState hook. This hook returns two results: the state itself and the method that's used for setting the state. In this class we're going to have 2 states: one for characters
  // and one for managing the loading state. This is one perks instead of classic plain old react: you can have multiple states on a component.

  // The useEffect hook will execute after the DOM has been rendered and it's useful because it can take care of side effects, hence its name. Side effects might appear
  // when we make HTTP calls inside of components. UseEffect will be called more often than componentDidMount

  // Normally, we'd want to call the useHttp hook here. However, hooks must be called at the outermost level, just like useEffect is.
  // So calls to hooks should not be nested in if statements, other hooks, function calls etc. However, the good news are that
  // we can use hooks in the definition of a hook. For instance, we used the useEffect hook in the useHttp hook.    

  // The second parameter [] needs to be added to avoid an infinite loop. It is an array of dependencies. Here you'll add all the variables which, if they are to suffer changes,
  // will trigger a re-run of the useEffect hook.
  // useEffect will run after the render cycle (it is called once, when the first network request
  //is made) but it also runs whenever our functional component is re-rendered, i.e., when props or state suffer changes.

  const [isLoading, fetchedData] = useHttp('http://localhost:1958/characters', []);

  const selectedCharacters = fetchedData ? fetchedData.map((char) => ({
    characterName: char.characterName,
    id: char.characterName
  })) : [];

  // In the old approach, here you'd have needed the 'render' method. But using hooks, we simply return our jsx content here. 
  let content = <p>Loading characters...</p>;

  if (!isLoading && selectedCharacters && selectedCharacters.length > 0) {
    content = (
      <select
        // In the classic approach, we'd use this.props.onCharSelect. But since we are in a functional component, we have the possibility to use props directly since we receive props
        // since we receive it as an argument. 
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {selectedCharacters.map(char => (
          <option key={char.characterName} value={char.characterName}>
            {char.characterName}
          </option>
        ))}
      </select>
    );
  } else if (
    !isLoading &&
    (!selectedCharacters || selectedCharacters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
}

export default CharPicker;