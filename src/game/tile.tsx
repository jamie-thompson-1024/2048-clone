
import React from 'react';
import './game.css';

function Tile(props: { value: number }) {

    return (
        <div className="gameTile">
            { props.value > 0 ? props.value : '' }
        </div>
    )
}

export default Tile;
