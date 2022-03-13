
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/RootReducer';
import './game.css';

function Tile(props: { value: number }) {

    const [colorMin, colorMax] = useSelector((state: RootState) => state.tileTheme);

    const color = useMemo(() => {
        let step = (colorMax - colorMin) / 11;
        return (
            colorMin + 
            Math.log2(props.value) * step
        );
    }, [colorMax, colorMin, props.value])

    return (
        <div className="gameTile" style={props.value > 0 ? { 
            backgroundColor: `hsl(${color}, 75%, 55%)`
        } : {}}>
            { props.value > 0 ? props.value : '' }
        </div>
    )
}

export default Tile;
