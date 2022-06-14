import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";

axios.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common["authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

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

export const getUserProfile = createAsyncThunk(
  "user/userProfile",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.get(`/api/v1/user/userProfile/${id}`);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (username, thunkAPI) => {
    try {
      const resp = await axios.get(
        `/api/v1/user/search/user?search=${username}`,
        {
          headers: {
            authorization: `Bearer ${getUserFromLocalStorage().token}`,
          },
        }
      );

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const userUpdate = createAsyncThunk(
  "user/userUpdate",
  async (user, thunkAPI) => {
    try {
      const resp = await axios.patch("/api/v1/user/user", user, {
        headers: {
          authorization: `Bearer ${getUserFromLocalStorage().token}`,
        },
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ userId }, thunkAPI) => {
    try {
      const resp = await axios.patch(
        `/api/v1/user/followUser`,
        { userId },
        {
          headers: {
            authorization: `Bearer ${getUserFromLocalStorage().token}`,
          },
        }
      );
      window.location.reload();
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async ({ userId }, thunkAPI) => {
    try {
      const resp = await axios.patch(
        `/api/v1/user/unFollowUser`,
        { userId },
        {
          headers: {
            authorization: `Bearer ${getUserFromLocalStorage().token}`,
          },
        }
      );
      window.location.reload();
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
  users: [],
  userProfile: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },

    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const user = payload;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hi There!, ${user.username}`);
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
      toast.success(`Welcome Back!, ${user.username}`);
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
      state.userProfile = { ...state.userProfile, payload };
    },

    [getUserProfile.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [searchUser.pending]: (state) => {
      state.isLoading = true;
    },

    [searchUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.users = { ...payload };
    },

    [searchUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [userUpdate.pending]: (state) => {
      state.isLoading = true;
    },

    [userUpdate.fulfilled]: (state, { payload }) => {
      const user = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Your Profile Updated! ${user.username}`);
    },

    [userUpdate.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [followUser.pending]: (state) => {
      state.isLoading = true;
    },

    [followUser.fulfilled]: (state, { payload }) => {
      const user = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Followed SuccessFully!`);
    },

    [followUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [unFollowUser.pending]: (state) => {
      state.isLoading = true;
    },

    [unFollowUser.fulfilled]: (state, { payload }) => {
      const user = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`UnFollow SuccessFully!`);
    },

    [unFollowUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { setFeeds, logoutUser } = userSlice.actions;

export default userSlice.reducer;
