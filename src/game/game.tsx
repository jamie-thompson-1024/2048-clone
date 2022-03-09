
import React, { useEffect, useState } from 'react';
import './game.css';
import TileGrid from './tileGrid';

function Game() {

    const [grid, setGrid] = useState<number[]>([]);
    const [[width, height], setSize] = useState<[number, number]>([5, 5]);

    useEffect(() => {
        let newGrid = [];
        for(let i = 0; i < width * height; i++)
            newGrid.push(0);
        setGrid(newGrid);
    }, [width, height]);

    return (
        <div className="game">
            <TileGrid grid={grid} width={width} height={height} />
        </div>
    )
}

export default Game;
