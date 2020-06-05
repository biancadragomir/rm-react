import React from 'react';
import { useHttp } from '../../hooks/useHttp';
import './CharPicker.css';

const CharPicker = props => {
  const [isLoading, fetchedData] = useHttp('characters', []);

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