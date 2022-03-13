
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './game.css';

import Controls from './Controls';
import Tile from './tile';
import GameControls, { GameInputEvent } from './logic/GameControls';

function Game() {

    const [grid, setGrid] = useState<number[]>([]);
    const [[width, height], setSize] = useState<[number, number]>([5, 5]);

    const [controls] = useState(new GameControls());

    const gameSpace = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listener = ({ detail }: { detail: GameInputEvent }) => {
            console.log(detail);
        }
        controls.addEventListener('gameInput', listener as unknown as EventListener);
        return () => {
            controls.removeEventListener('gameInput', listener as unknown as EventListener);
        }
    }, [controls]);

    useEffect(() => {
        let gameSpaceElement = gameSpace.current;
        if(gameSpaceElement)
            controls.attachElement(gameSpaceElement);
        return () => {
            if(gameSpaceElement)
                controls.detachElement(gameSpaceElement);
        }
    }, [controls, gameSpace]);

    useEffect(() => {
        let newGrid = [];
        for(let i = 0; i < width * height; i++)
            newGrid.push(0);
        setGrid(newGrid);
    }, [width, height]);

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
