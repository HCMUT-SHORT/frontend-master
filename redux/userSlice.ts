import { axiosClient } from "@/api/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string | null;
    userId: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    username: null,
    userId: null,
    token: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ username: string; userId: string; token: string }>) => {
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.username = null;
            state.userId = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // Login
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<{ username: string; userId: string; token: string }>) => {
            state.loading = false;
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            if (action.payload as string === "Invalid login credentials") {
                state.error = "Sai thông tin đăng nhập";
            } else {
                state.error = action.payload as string;
            }
        })

        // Signup
        .addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signup.fulfilled, (state, action: PayloadAction<{ username: string; userId: string; token: string }>) => {
            state.loading = false;
            state.username = action.payload.username;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        })
        .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            if (action.payload as string === "Invalid login credentials") {
                state.error = "Sai thông tin đăng nhập";
            } else {
                state.error = action.payload as string;
            }
        })
    }
});

export const login = createAsyncThunk(
    "user/login",
    async ( info: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/auth/login", info);
            const data = response.data;

            await AsyncStorage.setItem("token", data.token);

            return {
                username: data.user.fullName,
                userId: data.user.id,
                token: data.token
            }
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
);

export const signup = createAsyncThunk(
    "user/signup",
    async ( info: { fullName: string, email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/auth/signup", info);
            const data = response.data;

            await AsyncStorage.setItem("token", data.token);

            return {
                username: data.user.fullName,
                userId: data.user.id,
                token: data.token
            }
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
)

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;