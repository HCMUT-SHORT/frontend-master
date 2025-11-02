import { LoadingScreen } from "@/components/LoadingScreen";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
	const [loaded] = useFonts({
		'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
		'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
		'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf')
	});
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSplash(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	if (!loaded || showSplash) {
	  	return <LoadingScreen />;
	}  

	return <Stack screenOptions={{ headerShown: false }}/>;
}
