import {configureStore} from "@reduxjs/toolkit"

// authenticaçao de usuario
import authReducer from "./redux/slices/authSlice";

// dados do usuario 
import userReducer from  "./redux/slices/userSlice";

export const store =  configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
})