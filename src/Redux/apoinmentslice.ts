import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: 'idle',
    error: '',
    appointmentList: [],
    monthList: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"],
    yearList: ["2019", "2020", "2021", "2022", "2023"],
    successMessage: ""
}

const appointment = createSlice({
    name: 'appointment',
    initialState: initialState,
    reducers: {
        storeAppointmentData: (state, action) => {
            state.appointmentList = action?.payload;
        }
    },
});

export const { storeAppointmentData } = appointment.actions;

export default appointment.reducer;