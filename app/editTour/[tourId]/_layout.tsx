import { COLORS } from "@/constants/Colors";
import { fetchPlacesToVisit } from "@/hooks/fetchTourData";
import { AppDispatch, RootState } from "@/redux/store";
import Entypo from '@expo/vector-icons/Entypo';
import { Stack, useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

const ReturnButton = styled.TouchableOpacity`
    background-color: ${COLORS.PUREWHITE};
    margin-inline: 24px;
    border-radius: 50px;
    padding: 12px;
    align-self: flex-start;
`;

export default function TourEditLayout() {
    const router = useRouter();
    const pathname = usePathname();
    const { tourId } = useLocalSearchParams();
    const selectedTour = useSelector((state: RootState) => state.tours.find(t => t.id === tourId));
    const dispatch = useDispatch<AppDispatch>();

    const handleBack = () => {
        const indexPath = `/editTour/${tourId}`;

        if (pathname === indexPath) {
            router.replace("/home");
        } else {
            router.back();
        }
    };

    useEffect(() => {
        if (selectedTour) {
            fetchPlacesToVisit(selectedTour, dispatch)
        }
    }, [dispatch, selectedTour])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.LIGHTGREEN }}>
            <ReturnButton onPress={handleBack}>
                <Entypo name="chevron-thin-left" size={20} color="black" />
            </ReturnButton>

            <Stack screenOptions={{ headerShown: false }}/>
        </SafeAreaView>
    )
}