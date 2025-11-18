import { AccordionItem } from "@/components/AccordionItem";
import { COLORS } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { formatDateDMY } from "@/utility/timeConverter";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
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
    const { tourId } = useLocalSearchParams();
    const selectedTour = useSelector((state: RootState) => state.tours.find(t => t.id === tourId));
    const checkInDate = selectedTour?.checkInDate;
    const checkOutDate = selectedTour?.checkOutDate;
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
                        places={selectedTour?.placesToVisit || []}
                    />
                ))}
            </AccordionItemWrapper>
        </Container>
    )
}