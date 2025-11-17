import { COLORS } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import styled from "styled-components/native";

const Container =styled.View`
    flex: 1;
    background-color: ${COLORS.LIGHTGREEN};
`;

export default function TourEdit() {
    const { tourId } = useLocalSearchParams();

    useEffect(() => {
        console.log(tourId);
    }, [tourId]);

    return (
        <Container>
            
        </Container>
    )
}