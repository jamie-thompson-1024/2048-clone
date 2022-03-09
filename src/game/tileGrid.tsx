
import React from 'react';
import './game.css';

import Tile from './tile';

function TileGrid(props: { 
    grid: number[], 
    width: number, 
    height: number 
}) {
    return (
        <div className="gameTileGrid" style={{
            gridTemplateColumns: `repeat(${props.width}, 1fr)`,
            gridTemplateRows: `repeat(${props.height}, 1fr)`
        }}>
            { props.grid.map((value, i) => 
                <Tile value={value} key={i} />
            )}
        </div>
    )
}

export default TileGrid;
