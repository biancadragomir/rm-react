import React from 'react';

function IdiomaticReactList(props) {
    const currentItems = props.items;
    const listItems = currentItems.map((item) => <li class="list-group-item">{item}</li>);
    return (
        <ul class="list-group">
            {listItems}
        </ul>
    );
}

export default IdiomaticReactList