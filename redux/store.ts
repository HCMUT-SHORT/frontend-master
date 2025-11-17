import { configureStore } from "@reduxjs/toolkit";
import tourCreateReducer from "./tourCreateSlice";
import toursReducer from "./toursSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tourCreate: tourCreateReducer,
        tours: toursReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;