import { axiosClient } from "@/api/axiosClient";
import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { addPlacesToVisit } from "@/redux/toursSlice";
import { parseDays } from "@/utility/parseString";
import Entypo from '@expo/vector-icons/Entypo';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
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
    const { tourId } = useLocalSearchParams();
    const tour = useSelector((state: RootState) => state.tours.find(t => t.id === tourId));
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchPlacesToVisit = async () => {
            if (!tourId) return;
            const tourIdStr = Array.isArray(tourId) ? tourId[0] : tourId;

            if (tour?.placesToVisit && tour.placesToVisit.length > 0) return;

            try {
                const response = await axiosClient.get(`/tour/placestovisit/${tourId}`);
            
                const transformedPlaces = response.data.map((place: any) => ({
                    ...place,
                    dayVisit: parseDays(place.dayVisit)
                }));

                const sortedPlaces = transformedPlaces.sort((a: any, b: any) => {
                    if (b.rating !== a.rating) {
                        return b.rating - a.rating;
                    } else {
                        return b.totalRating - a.totalRating;
                    }
                });

                dispatch(addPlacesToVisit({ tourId: tourIdStr, places: sortedPlaces}))
            } catch (error: any) {
                console.log("There is error fetching places to visit: ", error.message);
                return;
            }
        };

        fetchPlacesToVisit();
    }, [tourId, dispatch, tour?.placesToVisit])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.LIGHTGREEN }}>
            <ReturnButton onPress={() => router.replace(`/home`)}>
                <Entypo name="chevron-thin-left" size={20} color="black" />
            </ReturnButton>

            <Stack screenOptions={{ headerShown: false }}/>
        </SafeAreaView>
    )
}