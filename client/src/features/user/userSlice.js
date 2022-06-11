import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await axios.post("/api/v1/auth/register", user);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await axios.post("api/v1/auth/login", user);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getUserProfile = createAsyncThunk('user/userProfile', async (id,thunkAPI) => {
  try {
    const resp = await axios.get(`/api/v1/user/userProfile/${id}`, {
      headers: {
        authorization: `Bearer ${getUserFromLocalStorage().token}`
      }
    });

    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
})

const initialState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
  users: [],
  userProfile:{}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },

    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const user = payload;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hi There!, ${user.user.username}`);
    },

    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },

    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const user = payload;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back!, ${user.user.username}`);
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [getUserProfile.pending]: (state) => {
      state.isLoading = true;
    },

    [getUserProfile.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.userProfile = { ...state.userProfile,payload };
    },

    [getUserProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export default userSlice.reducer;
