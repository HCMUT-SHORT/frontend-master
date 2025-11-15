import { configureStore } from "@reduxjs/toolkit";
import tourCreateReducer from "./tourCreateSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tourCreate: tourCreateReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;