import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

axios.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common["authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export const createFeed = createAsyncThunk(
  "feed/createFeed",
  async (feed, thunkAPI) => {
    try {
      const resp = await axios.post(`/api/v1/feed`, feed, {
        headers: {
          authorization: `Bearer ${getUserFromLocalStorage().token}`,
        },
      });

      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        removeUserFromLocalStorage();
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const followUserFeeds = createAsyncThunk(
  "feed/followUserFeeds",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(`api/v1/feed/explore/getFollowing`, {
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

export const feedLikeDislike = createAsyncThunk(
  "feed/feedLikeDislike",
  async ({ postId }, thunkAPI) => {
    try {
      const resp = axios.patch(`/api/v1/feed/like/${postId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getFeed = createAsyncThunk(
  "feed/getFeed",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.get(`/api/v1/feed/${id}`, {
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

export const commentOnFeed = createAsyncThunk(
  "feed/commentOnFeed",
  async ({ postId, comment }, thunkAPI) => {
    try {
      const resp = await axios.patch(`/api/v1/feed/${postId}`, { comment });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteFeed = createAsyncThunk(
  "feed/deleteFeed",
  async (postId, thunkAPI) => {
    
    try {
      const resp = await axios.delete(`/api/v1/feed/${postId}`, {
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

export const getAllFeeds = createAsyncThunk(
  "feed/getAllFeeds",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(`/api/v1/feed/`, {
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

const initialState = {
  feeds: [],
  feed: {},
  isLoading: false,
  followingUserFeeds: [],
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  extraReducers: {
    [createFeed.pending]: (state) => {
      state.isLoading = true;
    },
    [createFeed.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.feeds = [...state.feeds, payload];
      toast.success("Feed Created SuccessFully📷");
    },
    [createFeed.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [followUserFeeds.pending]: (state) => {
      state.isLoading = true;
    },
    [followUserFeeds.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.followingUserFeeds = [...state.followingUserFeeds, payload];
    },
    [followUserFeeds.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [feedLikeDislike.pending]: (state) => {
      state.isLoading = true;
    },
    [feedLikeDislike.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.followingUserFeeds = [...state.followingUserFeeds, payload];
    },
    [feedLikeDislike.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [getFeed.pending]: (state) => {
      state.isLoading = true;
    },
    [getFeed.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.feed = { ...state.feed, payload };
    },
    [getFeed.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [commentOnFeed.pending]: (state) => {
      state.isLoading = true;
    },
    [commentOnFeed.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.feeds = { ...state.feeds, payload };
    },
    [commentOnFeed.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [deleteFeed.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteFeed.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success("Post Deleted!");
    },
    [deleteFeed.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [getAllFeeds.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllFeeds.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.feeds = [...state.feeds, payload];
    },
    [getAllFeeds.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export default feedSlice.reducer;
