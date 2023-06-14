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
        return thunkAPI.rejectWithValue(data.errors[0]); 
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

// Get a photo by id 

export const getPhoto = createAsyncThunk("photo/getPhoto", async(id, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token; 

   const data = await photoService.getPhoto(id, token); 
    
   return data;
})


// Like a fhoto 
export const likes = createAsyncThunk("photo/like", async (id, thunkAPI) => {
   
   const token = thunkAPI.getState().auth.user.token; 

   const data = await photoService.like(id, token); 

    // check error
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.error[0]);        
    }
   return data; 
});

// comments 

export const coments = createAsyncThunk("photo/coments", async(id, thunkAPI)  => {

    const token = thunkAPI.getState().auth.user.token; 

    const data= await photoService.coments(id, token); 

    // check error
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.error[0])
    }

    return data;
}) 


// Get all photos

export const getPhotos = createAsyncThunk("photo/getall", async(_,thunkAPI) => {
 
    const token = thunkAPI.getState().auth.user.token; 

    const data = await photoService.getPhotos(token);

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
             if (photo._id === action.payload.photo.id) {
                return (photo.title = action.payload.photo.title);
             }
             return photo;
           })
           state.message = action.payload.message;
           
           }).addCase(updatePhoto.rejected, (state, action) => {  // error
            console.log(state, action);
            state.loading = false; 
            state.error = action.payload;
            state.photo = {};
    
           }).addCase(getPhoto.pending, (state) => { // loading
            state.loading = true; 
            state.error = false;
    
           }).addCase(getPhoto.fulfilled, (state, action) => { // sucess
            state.loading = false;  
            state.success = true;  
            state.error = null; 
            state.photo = action.payload;

        }).addCase(likes.fulfilled, (state, action) => { // sucess  
            state.loading = false;  
            state.success = true;  
            state.error = null; 
 
            if (state.photo.likes) {
                state.photo.likes.push(action.payload.userId); 
            }

            state.photos.map((photo) => {
                if (photo._id === action.payload.photoId) {
                return photo.likes.push(action.payload.userId);
                }
                return photo
            });

              state.message = "Foto foi curtida"

            console.log(action.payload);

        }).addCase(likes.rejected, (state, action) => {  // error
            console.log(state, action);
            state.loading = false; 
            state.error = action.payload;
            state.photo = {};    
        }).addCase(coments.pending, (state) => { // loading
            state.loading = true; 
            state.error = false;

           }).addCase(coments.fulfilled, (state, action) => { // sucess
            state.loading = false;  
            state.success = true;  
            state.error = null; 
            state.photo = action.payload;
            state.message = "Foto comentada com sucesso"

       }).addCase(coments.rejected, (state, action) => {  // error
           state.loading = false; 
           state.error = action.payload;
           state.photo = {};
       }).addCase(getPhotos.pending, (state) => { // loading
           state.loading = true; 
           state.error = false;

       }).addCase(getPhotos.fulfilled, (state, action) => { // sucess
           state.loading = false;  
           state.success = true;  
           state.error = null; 
           state.photos = action.payload;
    })
    }  
});


export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer