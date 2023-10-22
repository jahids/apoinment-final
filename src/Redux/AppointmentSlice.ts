import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const createTaskRequest = createAsyncThunk('user/createTaskRequest', async (payload, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
export const createTaskRequest = createAsyncThunk('user/createTaskRequest', async (payload: number[], { rejectWithValue }) => {
    const config = {
        headers: {
            'Authorization': `Token ${localStorage.getItem("token")}`
        }
    };
    try {
        const response = await axios.post(`"http:/"/task/task-list/`, payload[1], config);
        alert("task created Successfully");
        return response.data;
    } catch (error) {
        console.log('createProjectRequest error', error);
        alert("task not create");
        return rejectWithValue(error);
    }
})


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
    yearList: ["2019", "2020", "2021"],
    successMessage: ""
}

const appointment = createSlice({
    name: 'appointment',
    initialState: initialState,
    reducers: {
        // clearSuccessMessage: (state, action) => {
        //     state.successMessage = "";
        // }

        clearSuccessMessage: (state) => {
            state.successMessage = "";
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createTaskRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createTaskRequest.fulfilled, (state) => {
                state.status = 'succeeded';
                state.successMessage = 'Task Created Successfully';
            })
            .addCase(createTaskRequest.rejected, (state) => {
                state.status = 'failed';
            })

    }
});

export const { clearSuccessMessage } = appointment.actions;
// export const getMonthList = (state: any) => (state.appointment.monthList)

export default appointment.reducer;