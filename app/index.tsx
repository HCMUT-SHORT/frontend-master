import { axiosClient } from "@/api/axiosClient";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AppIndex() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const getProfile = async (token: string) => {
            try {
                const response = await axiosClient.get("/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                dispatch(setUser({
                    username: response.data.user.fullName,
                    userId: response.data.user.id,
                    token: token
                }))
                return response.data.user.id;
            } catch (error: any) {
                console.log("Invalid or expired token:", error.message);
                await AsyncStorage.removeItem("token");
                return null;
            }
        }

        const routeFinding = async () => {
            const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
            const token = await AsyncStorage.getItem("token");

            const userId = token ? await getProfile(token) : null;

            if (!hasOnboarded) {
                setTimeout(() => router.replace("/onboarding"), 500);
                return;
            }

            if (userId) {
                setTimeout(() => router.replace("/home"), 500);
            } else {
                setTimeout(() => router.replace("/authentication"), 500);
            }
        };

        routeFinding();
    }, [router, dispatch]);

    return <LoadingScreen/>
}