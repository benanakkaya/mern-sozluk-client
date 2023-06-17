import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk("user/get-user-profile",async (username:string) => {
  const res = await axios.post("http://localhost:5000/user/get-user-profile", {username});
  return res.data;
})

interface UserState {
  loginned: boolean;
  loggedUser: {id:string,username:string};
  shownUser: any
}

const initialState: UserState = {
  loginned: false,
  loggedUser: {id:"",username:""},
  shownUser: {}
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginned: (state, action: PayloadAction<boolean>) => {
      state.loginned = action.payload;
    },
    setLoggedUser: (state, action: PayloadAction<{id:string,username:string}>) => {
      state.loggedUser = action.payload;
    },
    setShownUser: (state,action : any) => {
      state.shownUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.shownUser = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { setLoginned,setLoggedUser,setShownUser } = userSlice.actions;
