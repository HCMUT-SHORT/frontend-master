import { LoadingScreen } from "@/components/LoadingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function AppIndex() {
    const router = useRouter();

    useEffect(() => {
        const routeFinding = async () => {
            const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");

            if (hasOnboarded === "true") {
                setTimeout(() => router.replace("/home"), 500);
            } else {
                setTimeout(() => router.replace("/onboarding"), 500);
            }
        };

        routeFinding();
    }, [router]);

    return <LoadingScreen/>
}