import { LoadingScreen } from "@/components/LoadingScreen";
import { COLORS } from "@/constants/Colors";
import { store } from "@/redux/store";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { Slot, useNavigationContainerRef } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react-native";

export const navigationIntegration = Sentry.reactNavigationIntegration();
Sentry.init({
	dsn: "https://92af4dd55c0b2c040b66eb6a71a6e813@o4510505370189824.ingest.us.sentry.io/4510505391620096",
	tracesSampleRate: 1.0, 
	sendDefaultPii: true,
	enableAutoSessionTracking: true,
	sessionTrackingIntervalMillis: 5000,
	enableUserInteractionTracing: true,
  	profilesSampleRate: 1.0,  
 	replaysSessionSampleRate: 1.0,
	normalizeDepth: 10,
	integrations: [
		Sentry.mobileReplayIntegration({
		maskAllText: true,
		maskAllImages: true,
		}), 
		navigationIntegration,
		Sentry.hermesProfilingIntegration({
		platformProfilers: true,
		}), 
	],
  	enableAutoPerformanceTracing: true,
	// debug: true

});

function RootLayout() {
	const ref = useNavigationContainerRef();
		useEffect(() => {
			if (ref) {
			navigationIntegration.registerNavigationContainer(ref);
			}
	}, [ref]);
	useEffect(() => {
		Sentry.setUser({
		id: "short_test",
		username: "HCMUT_SHORT",
		});
		Sentry.setTag("group", "short");
	}, []);

	const [loaded] = useFonts({
		'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
		'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
		'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf')
	});

	const [assetsLoaded, setAssetsLoaded] = useState(false);

	useEffect(() => {
		const preloadAsset = async () => {
			const images = [
				require("@/assets/images/scenery.jpg"),
				require("@/assets/images/character.png"),
			];

			await Asset.loadAsync(images);
			setAssetsLoaded(true);
		};

		preloadAsset();
	}, [])

	if (!loaded || !assetsLoaded) return <LoadingScreen bgColor={COLORS.LIGHTGREEN}/>;

	return (
		<Provider store={store}>
			{!loaded || !assetsLoaded ? (
				<LoadingScreen bgColor={COLORS.LIGHTGREEN} />
			) : (
				<Slot />
			)}
		</Provider>
	)
}
export default Sentry.wrap(RootLayout);