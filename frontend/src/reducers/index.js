import { combineReducers } from "@reduxjs/toolkit";
import categorySlice from "./categoryReducer";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
export const rootReducer=combineReducers({
    category: categorySlice,
    room: roomReducer,
    user: userReducer,
    auth: authReducer,
})