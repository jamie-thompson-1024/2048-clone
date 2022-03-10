
import React, { useEffect, useState } from 'react';
import './game.css';

import Controls from './Controls';
import TileGrid from './tileGrid';

function Game() {

    const [grid, setGrid] = useState<number[]>([]);
    const [[width, height], setSize] = useState<[number, number]>([5, 5]);

    useEffect(() => {
        let newGrid = [];
        for(let i = 0; i < width * height; i++)
            newGrid.push(0);
        newGrid[0] = 2;
        newGrid[1] = 4;
        newGrid[2] = 8;
        newGrid[3] = 16;
        newGrid[4] = 32;
        newGrid[5] = 64;
        newGrid[6] = 128;
        newGrid[7] = 256;
        newGrid[8] = 512;
        newGrid[9] = 1024;
        newGrid[10] = 2048;
        setGrid(newGrid);
    }, [width, height]);

    return (
        <div className="game">
            <TileGrid grid={grid} width={width} height={height} />
            <Controls />
        </div>
    )
}

export default Game;
