import React from 'react';

import Summary from './Summary';
import { useHttp } from '../hooks/http';

const Character = props => {

  let loadedCharacter = null;

  const [isLoading, fetchedData] = useHttp('https://swapi.dev/api/people/' + props.selectedChar, [props.selectedChar])
  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
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
