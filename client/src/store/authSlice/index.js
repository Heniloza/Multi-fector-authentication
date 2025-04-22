import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: {},
  isAuthChecked: false,
  isMfaVerified: false,
};

export const registerUser = createAsyncThunk(
  "/auth/registerUser",
  async (formdata) => {
    const response = await axios.post(`${API_URL}/api/auth/signup`, formdata, {
      withCredentials: true,
    });
    return response?.data;
  }
);
export const loginUser = createAsyncThunk(
  "/auth/loginUser",
  async (formdata) => {
    const response = await axios.post(`${API_URL}/api/auth/signin`, formdata, {
      withCredentials: true,
    });
    return response?.data;
  }
);

export const logoutUser = createAsyncThunk("/auth/logoutUser", async () => {
  const response = await axios.post(
    `${API_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(`${API_URL}/auth/checkAuth`, {
    withCredentials: true,
  });
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMfaVerified: (state, action) => {
      state.isMfaVerified = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = !action.payload.data ? false : true;
        state.user = action.payload.data || {};
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.isAuthChecked = true;
      });
  },
});

export const { setMfaVerified } = authSlice.actions;
export default authSlice.reducer;
