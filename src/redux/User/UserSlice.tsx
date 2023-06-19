import { User } from "@/types/UserType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk("user/get-user-profile",async (username:string) => {
  const res = await axios.post("https://mern-sozluk-backend.onrender.com/user/get-user-profile", {username});
  return res.data;
})

interface UserState {
  loginned: boolean;
  loggedUser: LoggedUser
  shownUser: User
}

export interface LoggedUser {
  id:string;
  username:string;
}

const initialState: UserState = {
  loginned: false,
  loggedUser: {id:"",username:""},
  shownUser:  {
    avatar: "",
    birthday: "",
    confirmed: false,
    createdAt: "",
    email: "",
    entries: [],
    favorites: [],
    gender: "",
    updatedAt: "",
    userType: "",
    username: "",
    __v: 0,
    _id: "",
  }
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
    setShownUser: (state,action: PayloadAction<User>) => {
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
