import React, { useState, useEffect } from 'react';

import './CharPicker.css';

const CharPicker = props => {
  // In the old react approach here you'd use state = { characters: [], isLoading: false };. But since we can take advantage of hooks, we are going to use instead
  // the useState hook. This hook returns two results: the state itself and the method that's used for setting the state. In this class we're going to have 2 states: one for characters
  // and one for managing the loading state. This is one perks instead of classic plain old react: you can have multiple states on a component.
  const [loadedChars, setLoadedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // The useEffect hook will execute after the DOM has been rendered and it's useful because it can take care of side effects, hence its name. Side effects might appear
  // when we make HTTP calls inside of components. UseEffect will be called more often than componentDidMount
  useEffect(() => {
    console.log('useEffect called.');
    // Old approach: this.setState({ isLoading: true });
    setIsLoading(true);
    fetch('https://swapi.dev/api/people')
      .then(response => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5);
        setIsLoading(false);
        setLoadedChars(selectedCharacters.map((char, index) => ({
          name: char.name,
          id: index + 1
        })));
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
    // The second parameter [] needs to be added to avoid an infinite loop. It is an array of dependencies. Here you'll add all the variables which, if they are to suffer changes,
    // will trigger a re-run of the useEffect hook.
    // useEffect will run after the render cycle (it is called once, when the first network request
    //is made) but it also runs whenever our functional component is re-rendered, i.e., when props or state suffer changes.
  }, []);

  // In the old approach, here you'd have needed the 'render' method. But using hooks, we simply return our jsx content here. 
  let content = <p>Loading characters...</p>;

  if (
    !isLoading &&
    loadedChars &&
    loadedChars.length > 0
  ) {
    content = (
      <select
        // In the classic approach, we'd use this.props.onCharSelect. But since we are in a functional component, we have the possibility to use props directly since we receive props
        // since we receive it as an argument. 
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {loadedChars.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (
    !isLoading &&
    (!loadedChars || loadedChars.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
}

export default CharPicker;