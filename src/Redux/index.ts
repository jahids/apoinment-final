import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./apoinmentslice";

export const serverUrl = "http://localhost:8080";

const rootReducers = combineReducers({
    appointment: appointmentReducer,
})

const store = configureStore({
    reducer: rootReducers,
    // devTools: false
})

export default store;