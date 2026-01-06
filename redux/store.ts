import { configureStore } from "@reduxjs/toolkit";
import tourCreateReducer from "./tourCreateSlice";
import toursReducer from "./toursSlice";
import userReducer from "./userSlice";
import shareReducer from "./shareSlice";
import * as Sentry from "@sentry/react-native";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
});

export const store = configureStore({
    reducer: {
        user: userReducer,
        tourCreate: tourCreateReducer,
        tours: toursReducer,
        share: shareReducer
    },
    enhancers: (getDefaultEnhancers) => {
        return getDefaultEnhancers().concat(sentryReduxEnhancer);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;