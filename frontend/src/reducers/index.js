import { combineReducers } from "@reduxjs/toolkit";
import categorySlice from "./categoryReducer";
import roomReducer from "./roomReducer";
export const rootReducer=combineReducers({
    category: categorySlice,
    room: roomReducer,
})