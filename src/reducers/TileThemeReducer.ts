
interface TileThemeAction {
    type: 'setTileTheme' | 'resetTileTheme',
    payload: [number, number]
};

const defaultState = [60, 0];

function TileThemeReducer(state = defaultState, action: TileThemeAction) {
    switch(action.type) {
        case 'setTileTheme':
            return [...action.payload];
        case 'resetTileTheme':
            return [...defaultState];
        default:
            return state;
    }
}

export default TileThemeReducer;
