import { configureStore } from "@reduxjs/toolkit";
import tourCreateReducer from "./tourCreateSlice";
import toursReducer from "./toursSlice";
import userReducer from "./userSlice";
import shareReducer from "./shareSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tourCreate: tourCreateReducer,
        tours: toursReducer,
        share: shareReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;