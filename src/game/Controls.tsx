import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import './Controls.css';
import GameLogic from "./logic/GameLogic";

const tileThemes = [
    [60, 0],
    [300, 180]
];

function Controls( props: { game?: GameLogic } ) {

    const [widthInput, setWidthInput] = useState<number | string>(5);
    const [heightInput, setHeightInput] = useState<number | string>(5);

    const [tileTheme, setTileTheme] = useState(0);
    const dispatch = useDispatch();

    const changeTheme = useCallback(({target: { value }}) => {
        value = parseInt(value);
        setTileTheme(value);
        dispatch({ type: 'setTileTheme', payload: tileThemes[value] });
    }, [setTileTheme, dispatch]);

    const resizeGame = useCallback(() => {
        let width = typeof widthInput === 'string' ? parseInt(widthInput) : widthInput;
        let height = typeof heightInput === 'string' ? parseInt(heightInput) : heightInput;
        props.game && props.game.resize(width, height);
    }, [props.game, widthInput, heightInput]);

    const resetGame = useCallback(() => {
        props.game && props.game.resetGame();
    }, [props.game]);

    return (
        <div className="controls">
            <fieldset className="tileThemeSelect">
                <legend>Tile Theme</legend>
                { tileThemes.map((theme, i) => {
                    return (
                        <label htmlFor={"tileTheme-radio-" + i} key={i}>
                            <input 
                                type="radio" 
                                value={i} 
                                onChange={changeTheme} 
                                checked={tileTheme === i} 
                                id={"tileTheme-radio-" + i} />
                            <div style={{
                                background: `linear-gradient(0.25turn, hsl(${theme[0]}, 75%, 55%), hsl(${theme[1]}, 75%, 55%))`
                            }}></div>
                        </label>
                    );
                })}
            </fieldset>
            <fieldset className="gameOptions">
                    <legend>Game Options</legend>
                    <div className="sizeInputs">
                        <label htmlFor="gameOptions-widthInput">
                            Width:
                            <input 
                                id="gameOptions-widthInput" 
                                onChange={(ev) => { 
                                    setWidthInput(ev.target.value) 
                                }} 
                                value={widthInput}
                                type="number"></input>
                        </label>
                        <label htmlFor="gameOptions-heightInput">
                            Height:
                            <input 
                                id="gameOptions-heightInput" 
                                onChange={(ev) => { 
                                    setHeightInput(ev.target.value) 
                                }} 
                                value={heightInput}
                                type="number"></input>
                        </label>
                    </div>
                    <div className="gameControlsInput">
                        <button onClick={resizeGame}>Resize</button>
                        <button onClick={resetGame} className="symbolButton">↺</button>
                    </div>
            </fieldset>
        </div>
    )
}

export default Controls;
