import { LoadingScreen } from "@/components/LoadingScreen";
import { COLORS } from "@/constants/Colors";
import { store } from "@/redux/store";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function RootLayout() {
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
			<Slot/>
		</Provider>
	)
}
