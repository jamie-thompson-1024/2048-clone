
import { combineReducers } from "@reduxjs/toolkit";
import TileThemeReducer from "./TileThemeReducer";

const RootReducer = combineReducers({
  tileTheme: TileThemeReducer
});

export default RootReducer;
export type RootState = ReturnType<typeof RootReducer>
