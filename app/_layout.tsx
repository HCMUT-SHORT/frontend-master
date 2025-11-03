import { LoadingScreen } from "@/components/LoadingScreen";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
	const [loaded] = useFonts({
		'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
		'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
		'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf')
	});

	if (!loaded) return <LoadingScreen />;

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index"/>
		</Stack>
	);
}
