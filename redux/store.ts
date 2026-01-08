import { configureStore } from "@reduxjs/toolkit";
import Constants from "expo-constants";
import shareReducer from "./shareSlice";
import tourCreateReducer from "./tourCreateSlice";
import toursReducer from "./toursSlice";
import userReducer from "./userSlice";

let enhancers: any[] = [];

if (!Constants.appOwnership) {
  // Bare / Dev build / APK
  const Sentry = require("@sentry/react-native");

  const sentryReduxEnhancer = Sentry.createReduxEnhancer();
  enhancers.push(sentryReduxEnhancer);
}

export const store = configureStore({
    reducer: {
        user: userReducer,
        tourCreate: tourCreateReducer,
        tours: toursReducer,
        share: shareReducer
    },
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(enhancers),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;