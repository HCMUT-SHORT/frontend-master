import { axiosClient } from "@/api/axiosClient";
import { AccordionItem } from "@/components/AccordionItem";
import { ContinueButton } from "@/components/ContinueButton";
import { COLORS } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { stringifyDays } from "@/utility/stringConverter";
import { formatDateDMY } from "@/utility/timeConverter";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";

const Container =styled.View`
    flex: 1;
    background-color: ${COLORS.LIGHTGREEN};
    padding: 24px;
`;

const TextDisplay = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 20px;
    margin-bottom: 15px;
`;

const AccordionItemWrapper = styled.View`
    row-gap: 15px;
`;

export default function TourEdit() {
    const router = useRouter();
    const { tourId } = useLocalSearchParams();
    const selectedTour = useSelector((state: RootState) => state.tours.find(t => t.id === tourId));
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    if (!selectedTour) {
        return <></>
    }

    const checkInDate = selectedTour.checkInDate;
    const checkOutDate = selectedTour.checkOutDate;

    const dates: string[] = [];

    if (checkInDate && checkOutDate) {
        let current = new Date(checkInDate);
        const end = new Date(checkOutDate);
    
        while (current <= end) {
            const currentStr = current.toISOString().split("T")[0];
            dates.push(formatDateDMY(currentStr));
            current.setDate(current.getDate() + 1); 
        }
    }

    const handleUpdatePlacesToVisit = async () => {
        if (loading) return;
            
        try {
            setLoading(true);

            const updateItems = Object.entries(
                selectedTour.changedPlaces).map(([placeId, days]) => ({
                    id: placeId,
                    dayVisit: stringifyDays(days)
                })
            );

            await axiosClient.put("/tour/placestovisit", updateItems);
            router.push(`/editTour/${tourId}/placesToStay`);
        } catch (error: any) {
            console.log("There is an error updating places to visit:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <TextDisplay>Cùng sắp xếp chuyến đi nào</TextDisplay>

            <AccordionItemWrapper>
                {dates.map((date, index) => (
                    <AccordionItem 
                        key={index} 
                        index={index + 1} 
                        date={date}
                        isExpanded={index === expandedIndex}
                        toggleAccordion={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        selectedTour={selectedTour}
                    />
                ))}
            </AccordionItemWrapper>
            
            <ContinueButton
                onPress={handleUpdatePlacesToVisit}
                disabled={loading}
                text={"Tiếp tục"}
            />
        </Container>
    )
}