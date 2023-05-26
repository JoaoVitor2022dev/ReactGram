import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import userService from "../services/userService";

const initialState = {
    user: {},
    error: false,
    loading: false,
    message: null
};

// Get user details
export const profile = createAsyncThunk("user/profile", async (user, thunkAPI) => {
   
    const token = thunkAPI.getState().auth.user.token;
   
    const data = await userService.profile(user, token);

    return data;
});  

export const userSlice = createAsyncThunk({ 
    name: "user",
    initialState,
    reducers: {
        resetMessage: (statte) => {
            statte.message = null 
        },
    },
    extraReducers: (builder) => {
        builder.addCase(profile.pending, (state) => { // loading
            state.loading = true; 
            state.error = false;
 
        }).addCase(profile.fulfilled, (state, action) => { // sucess
            state.loading = false;  
            state.success = true;  
            state.error = null; 
            state.user = action.payload;
 
        }); 
    },
}); 

export const { resetMessage } = userSlice.actions 
export default userSlice.reducers;

