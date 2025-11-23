import { axiosClient } from "@/api/axiosClient";
import { ContinueButton } from "@/components/ContinueButton";
import { PlaceToStayCard } from "@/components/PlaceToStayCard";
import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { addTransportations, togglePlaceToStay } from "@/redux/toursSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

const Container = styled.View`
    background-color: ${COLORS.LIGHTGREEN};
    padding: 24px;
    flex: 1;
`;

const TextDisplay = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 20px;
    margin-bottom: 15px;
`;

const PlacesContainer = styled.ScrollView`
    margin-top: 15px;
`;

export default function PlacesToStay() {
    const router = useRouter();
    const { tourId } = useLocalSearchParams();
    const selectedTour = useSelector((state: RootState) => state.tours.find(t => t.id === tourId));
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(false);

    if (!selectedTour) {
        return (
            <></>
        )
    }

    const fetchTransportations = async () => {
        if (!tourId) return;
        const tourIdStr = Array.isArray(tourId) ? tourId[0] : tourId;
        if (selectedTour?.transportations && selectedTour.transportations.length > 0) return;

        try {
            const response = await axiosClient.get(`/tour/transportation/${tourIdStr}`);
            dispatch(addTransportations({ tourId: tourIdStr, transportations: response.data }));
        } catch(error: any) {
            console.log("There is an error fetching transportations: ", error.message);
        } 
    }

    const handleUpdatePlacesToStay = async () => {
        if (loading) return;

        const updateItems = Object.entries(selectedTour.changedPlacesStay).map(
            ([id, isSelected]) => ({ id, isSelected })
        );

        try {
            setLoading(true);

            if (updateItems.length === 0) {
                await fetchTransportations();
                router.push(`/editTour/${tourId}/transportation`);
                return;
            }    

            await axiosClient.put("/tour/placestostay", updateItems);
            await fetchTransportations();
            router.push(`/editTour/${tourId}/transportation`);
        } catch(error: any) {
            console.log("There is an error updating place to stay:", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <TextDisplay>Hãy chọn khách sạn phù hợp nhé!</TextDisplay>

            <PlacesContainer contentContainerStyle={{ gap: 15 }}>
                {selectedTour.placesToStay.map((place) => (
                    <PlaceToStayCard 
                        key={place.id} 
                        place={place} 
                        onPress={() => dispatch(togglePlaceToStay({ tourId: selectedTour.id || "", placeId: place.id }))}
                    />
                ))}
            </PlacesContainer>

            <ContinueButton
                onPress={handleUpdatePlacesToStay}
                disabled={loading}
                text={"Tiếp tục"}
            />
        </Container>
    )
}