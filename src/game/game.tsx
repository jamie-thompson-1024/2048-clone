
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './game.css';

import Controls from './Controls';
import Tile from './tile';

import GameLogic from './logic/GameLogic';

function grid2Togrid1(grid2: number[][])
{
    let grid1: number[] = [];

    grid2.forEach((row) => {
        row.forEach((cell) => {
            grid1.push(cell);
        });
    });

    return grid1;
}

function Game() {

    const [gameLogic] = useState(new GameLogic());

    const [grid, setGrid] = useState<number[]>(grid2Togrid1(gameLogic.grid));
    const [[width, height], setSize] = useState<[number, number]>([gameLogic.width, gameLogic.height]);

    // attach game grid element to game logic for touch events
    const gameSpace = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let gameSpaceElement = gameSpace.current;
        if(gameSpaceElement)
            gameLogic.attachElement(gameSpaceElement);
        return () => {
            if(gameSpaceElement)
                gameLogic.detachElement(gameSpaceElement);
        }
    }, [gameLogic, gameSpace]);

    // attach grid display to gamelogic grid data/size changes
    useEffect(() => {
        const updateGrid = () => {
            setGrid(grid2Togrid1(gameLogic.grid));
        }
        const updateSize = () => {
            setSize([gameLogic.width, gameLogic.height]);
        }

        gameLogic.addEventListener('resize', updateSize);
        gameLogic.addEventListener('update', updateGrid);

        return () => {
            gameLogic.removeEventListener('resize', updateSize);
            gameLogic.removeEventListener('update', updateGrid);
        }
    }, [gameLogic, setGrid, setSize]);

    return (
        <div className="game">
            <div 
                className="gameTileGrid" 
                ref={gameSpace}
                style={{
                    gridTemplateColumns: `repeat(${width}, 1fr)`,
                    gridTemplateRows: `repeat(${height}, 1fr)`
                }}>
                    { grid.map((value, i) => 
                        <Tile value={value} key={i} />
                    )}
            </div>
            <Controls />
        </div>
    )
}

export default Game;
