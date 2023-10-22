import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./AppointmentSlice";

const rootReducers = combineReducers({
    appointment: appointmentReducer,
})

const store = configureStore({
    reducer: rootReducers,
    // devTools: false
})

export default store;