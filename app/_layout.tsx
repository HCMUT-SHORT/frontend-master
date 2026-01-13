import { LoadingScreen } from "@/components/LoadingScreen";
import { COLORS } from "@/constants/Colors";
import { store } from "@/redux/store";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Slot, useNavigationContainerRef } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

let Sentry: any = null;
let navigationIntegration: any = null;

if (!Constants.appOwnership) {
  // 👉 Chỉ chạy trên Dev build / APK
  Sentry = require("@sentry/react-native");

  navigationIntegration = Sentry.reactNavigationIntegration();

  Sentry.init({
    dsn: "https://92af4dd55c0b2c040b66eb6a71a6e813@o4510505370189824.ingest.us.sentry.io/4510505391620096",
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    enableAutoSessionTracking: true,
    integrations: [
      navigationIntegration,
      Sentry.mobileReplayIntegration({
        maskAllText: true,
        maskAllImages: true,
      }),
    ],
  });
}

function AppProviders() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}

function RootLayout() {
  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (Sentry && ref) {
      navigationIntegration.registerNavigationContainer(ref);

      Sentry.setUser({
        id: "short_test",
        username: "HCMUT_SHORT",
      });
      Sentry.setTag("group", "short");
    }
  }, [ref]);

  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("../assets/fonts/Nunito-Medium.ttf"),
  });

  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    Asset.loadAsync([
      require("@/assets/images/scenery.jpg"),
      require("@/assets/images/character.png"),
    ]).then(() => setAssetsLoaded(true));
  }, []);

  if (!fontsLoaded || !assetsLoaded) {
    return <LoadingScreen bgColor={COLORS.LIGHTGREEN} />;
  }

  if (Sentry) {
    const WrappedApp = Sentry.wrap(AppProviders);
    return <WrappedApp />;
  }

  return <AppProviders />;
}

export default RootLayout;
