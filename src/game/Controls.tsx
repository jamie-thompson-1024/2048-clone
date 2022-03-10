import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import './Controls.css';

const tileThemes = [
    [60, 0],
    [300, 180]
];

function Controls() {

    const [tileTheme, setTileTheme] = useState(0);
    const dispatch = useDispatch();

    const changeTheme = useCallback(({target: { value }}) => {
        value = parseInt(value);
        setTileTheme(value);
        dispatch({ type: 'setTileTheme', payload: tileThemes[value] });
    }, [setTileTheme, dispatch]);

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
        </div>
    )
}

export default Controls;
