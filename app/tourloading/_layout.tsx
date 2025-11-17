import { COLORS } from "@/constants/Colors";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TourLoadingLayout() {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.LIGHTGREEN }}>
            <Slot/>
        </SafeAreaView>
    )
}