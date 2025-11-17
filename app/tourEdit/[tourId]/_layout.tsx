import { COLORS } from "@/constants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TourEditLayout() {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.LIGHTGREEN }}>
            <Stack screenOptions={{ headerShown: false }}/>
        </SafeAreaView>
    )
}