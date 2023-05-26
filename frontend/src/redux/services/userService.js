import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    error: false,
    loading: false,
    message: null
};

// fucntion 

export const userSlice = createAsyncThunk({ 
    name: "user",
    initialState,
    reducers: {
        resetMessage: (statte) => {
            statte.message = null 
        }
    }
}); 

export const { resetMessage } = userSlice.actions 
export default userSlice.reducers;

