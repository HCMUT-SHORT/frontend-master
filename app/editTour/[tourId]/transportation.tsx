import { axiosClient } from "@/api/axiosClient";
import { ContinueButton } from "@/components/ContinueButton";
import { TransportCard } from "@/components/TransportCard";
import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { toggleTransportation } from "@/redux/toursSlice";
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

const TransportationWrapper = styled.View`
    row-gap: 15px;
`;

export default function Transportation() {
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

    const handleUpdateTransportation = async () => {
        if (loading) return;

        const updateItems = Object.entries(selectedTour.changedTransportations).map(
            ([id, isSelected]) => ({ id, isSelected })
        );

        try {
            setLoading(true);

            if (updateItems.length === 0) {
                router.replace(`/overviewTour/${tourId}`);
                return;
            }

            await axiosClient.put("/tour/transportation", updateItems);
            router.replace(`/overviewTour/${tourId}`);
        } catch(error: any) {
            console.log("There is an error updating transportation: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <TextDisplay>Hãy chọn phương tiện phù hợp nhé!</TextDisplay>

            <TransportationWrapper>
                {selectedTour.transportations.map((transport) => (
                    <TransportCard 
                        key={transport.id} 
                        transport={transport} 
                        onPress={() => dispatch(toggleTransportation({ tourId: selectedTour.id || "", transportId: transport.id }))}
                    />
                ))}
            </TransportationWrapper>

            <ContinueButton
                onPress={handleUpdateTransportation}
                disabled={loading}
                text={"Tiếp tục"}
                type="cont"
            />
        </Container>
    )
}