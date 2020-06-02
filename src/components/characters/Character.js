import React from 'react';

import Summary from './CharacterSummary';
import { useHttp } from '../../hooks/http';

const Character = props => {

  let loadedCharacter = null;

  const [isLoading, fetchedData] = useHttp('http://localhost:1958/characters/' + props.selectedChar, [props.selectedChar])
  if (fetchedData) {
    loadedCharacter = {
      characterName: fetchedData.characterName,
      favoriteDevice: fetchedData.favoriteDevice,
      currentYear: fetchedData.currentYear,
      imageUrl: fetchedData.imageUrl
    };
  }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        imageUrl={loadedCharacter.imageUrl}
        characterName={loadedCharacter.characterName}
        favoriteDevice={loadedCharacter.favoriteDevice}
        currentYear={loadedCharacter.currentYear}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
}

// Will only re-render when something actually changed in the component.
export default React.memo(Character, (prevProps, nextProps) => {
  return (
    nextProps.selectedChar === prevProps.selectedChar
  )
})