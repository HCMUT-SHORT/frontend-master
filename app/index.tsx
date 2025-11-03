import { LoadingScreen } from "@/components/LoadingScreen";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function AppIndex() {
    const router = useRouter();

    useEffect(() => {
        const routeFinding = async () => {
            const nextRoute = "/(onboarding)";

            setTimeout(() => router.replace(nextRoute), 1000);
        };

        routeFinding();
    }, [router]);

    return <LoadingScreen/>
}