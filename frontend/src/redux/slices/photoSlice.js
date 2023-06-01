import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

// publish user photo 

export const publishPhoto = createAsyncThunk("photo/public", async (photo, thunkAPI) => {
     
    const token = thunkAPI.getState().auth.user.token; 

    const data = await photoService.publishPhoto(photo, token);
 
    // check for erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
})

// Get user photos 

export const getUserPhotos = createAsyncThunk("photo/userphotos", async (id, thunkAPI) => {
    
  const token = thunkAPI.getState().auth.user.token

  const data = await photoService.getUserPhotos(id, token);

  return data; 
})


// Delete a photo

export const deletePhoto = createAsyncThunk("photo/deletePhoto", async (id, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token; 

    const data = await photoService.deletePhoto(id, token); 

    // check error
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.error[0]);        
    }

    return data; 
})

// edit a photos

export const updatePhoto = createAsyncThunk("photo/updatePhoto", async(photoData, thunkAPI) => {
    
    const token = thunkAPI.getState().auth.user.token; 

    const data = await photoService.updatePhoto({title: photoData.title}, photoData.id, token); 

    // check for erros
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    } 

    return data;
})

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(publishPhoto.pending, (state) => { // loading
            state.loading = true; 
            state.error = false;
    
           }).addCase(publishPhoto.fulfilled, (state, action) => { // sucess
            state.loading = false;  
            state.success = true;  
            state.error = null; 
            state.photo = action.payload;
            state.photos.unshift(state.photo)
            state.message = "Foto publicada com sucesso"
    
           }).addCase(publishPhoto.rejected, (state, action) => {  // error
            console.log(state, action);
            state.loading = false; 
            state.error = action.payload;
            state.photo = {};
    
           }).addCase(getUserPhotos.pending, (state) => { // loading
            state.loading = true; 
            state.error = false;
    
           }).addCase(getUserPhotos.fulfilled, (state, action) => { // sucess
            state.loading = false;  
            state.success = true;  
            state.error = null; 
            state.photos = action.payload;
    
        }).addCase(deletePhoto.pending, (state) => { // loading
            state.loading = true; 
            state.error = false;
    
           }).addCase(deletePhoto.fulfilled, (state, action) => { // sucess
            state.loading = false;  
            state.success = true;  
            state.error = null; 
 
            state.photos = state.photos.filter((photo) => {
                return photo._id !== action.payload.id
            })
            state.message = action.payload.message; 
            
           }).addCase(deletePhoto.rejected, (state, action) => {  // error
            console.log(state, action);
            state.loading = false; 
            state.error = action.payload;
            state.photo = {};
    
           })
           .addCase(updatePhoto.pending, (state) => { // loading
            state.loading = true; 
            state.error = false;
    
           }).addCase(updatePhoto.fulfilled, (state, action) => { // sucess
            state.loading = false;  
            state.success = true;  
            state.error = null; 
 
           state.photos.map((photo) => {
             if (photo._id === action.payload.photo._id) {
                return (photo.title = action.payload.photo.title)
             }
             return photo;
           })
           state.message = action.payload.message;
           
           }).addCase(updatePhoto.rejected, (state, action) => {  // error
            console.log(state, action);
            state.loading = false; 
            state.error = action.payload;
            state.photo = {};
    
           })
    }  
});


export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer