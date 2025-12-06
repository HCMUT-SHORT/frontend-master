import { AccordionItem } from "@/components/AccordionItem";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SkeletonImage } from "@/components/SkeletonImage";
import { TextTourDescription } from "@/components/TextTourDescription";
import { COLORS } from "@/constants/Colors";
import { fetchPlacesToStay, fetchPlacesToVisit, fetchTransportations } from "@/hooks/fetchTourData";
import { AppDispatch, RootState } from "@/redux/store";
import { formatDateDMY, getNights } from "@/utility/timeConverter";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { createShareCode } from "@/hooks/shareData";
import { ShareCodeModal } from "@/components/Modal";
import { TourState } from "@/constants/type";


const Container = styled.ScrollView`
    flex: 1;
    background-color: ${COLORS.LIGHTGREEN};
    padding: 24px;
`;

const ToolContainer = styled.View`
    flex-direction: row;
    column-gap: 15px;
    align-items: center;
    justify-content: flex-end;
    margin-top: 15px;
`;

const ToolButton = styled.TouchableOpacity`

`;

const DescriptionContainer = styled.View`
    row-gap: 15px;
`;

const PlanText = styled.Text`
    font-family: "Nunito-Medium";
    font-size: 16px;  
    margin-top: 10px;
    margin-bottom: 10px;
`;

const AccordionItemWrapper = styled.View`
    row-gap: 15px;
`;

 type ItemDescription = {
    text: string,
    value: string | null | undefined,
    icon: React.ReactNode;
 }

export default function TourOverView() {
    const router = useRouter();
    const { tourId } = useLocalSearchParams();
    const selectedTour = useSelector((state: RootState) => state.tours.find(t => t.id === tourId));
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState<boolean>(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    
    const [genCode, setGenCode] = useState("");
    const [isShareModalVisible, setShareModalVisible] = useState(false);
    const token = useSelector((state: RootState) => state.user.token);
    const handleShare = async (tour: TourState) => {
        try {
          const code = await createShareCode(tour, token, dispatch);
          setGenCode(code);
          setShareModalVisible(true);
        } catch {
          alert("Không thể tạo mã chia sẻ");
        }
      };
    useEffect(() => {
        const handleLoadTourData = async () => {
            if (!selectedTour) return;
            setLoading(true);
            await fetchPlacesToVisit(selectedTour, dispatch);
            await fetchPlacesToStay(selectedTour, dispatch);
            await fetchTransportations(selectedTour, dispatch);
            setLoading(false);
        };

        handleLoadTourData();
    }, [selectedTour, dispatch]);

    if (!selectedTour) {
        return (
            <></>
        )
    }

    if (loading) {
        return (
            <LoadingScreen bgColor={COLORS.LIGHTGREEN}/>
        )
    }

    const checkInDateFormated = selectedTour.checkInDate ? formatDateDMY(selectedTour.checkInDate) : "";
    const checkOutDateFormated = selectedTour.checkOutDate ? formatDateDMY(selectedTour.checkOutDate) : "";

    const transport = selectedTour.transportations?.find(t => t.isSelected) ?? null;
    const transportType = 
        transport?.type === "flight" ? "Máy bay" : 
        transport?.type === "train" ? "Tàu lửa" :
        transport?.type === "bus" ? "Xe khách" : 
        transport?.type === "self-drive" ? "Tự lái" : "Chưa chọn";

    const totalPlacesToVisitCost = (selectedTour.placesToVisit ?? []).reduce((sum, place) => {
        const days = selectedTour.changedPlaces[place.id] ?? place.dayVisit;
        return sum + place.price * days.length;
    }, 0);
    
    const nights = selectedTour.checkInDate && selectedTour.checkOutDate ? getNights(selectedTour.checkInDate, selectedTour.checkOutDate) : 0;
    const selectedPlaces = selectedTour.placesToStay?.filter(p => p.isSelected) ?? [];
    const baseStayCost = selectedPlaces.reduce((sum, place) => sum + place.price, 0);

    let totalPlacesToStayCost = 0;
    if (selectedPlaces.length === 1) {
        totalPlacesToStayCost = selectedPlaces[0].price * nights;
    } else {
        totalPlacesToStayCost = baseStayCost;
    }

    const transportCost = transport?.price ?? 0;

    const totalCost = totalPlacesToVisitCost + totalPlacesToStayCost + transportCost;

    const Items: ItemDescription[] = [
        {text: "Điểm đến", value: selectedTour.destination, icon: <EvilIcons name="location" size={24} color="black" />},
        {text: "Thời gian", value: `${checkInDateFormated} - ${checkOutDateFormated} (${nights} ngày)`, icon: <FontAwesome name="calendar" size={24} color="black" />},
        {text: "Dự trù kinh phí chuyến đi", value: `${totalCost.toLocaleString("en-US")} đồng`, icon: <FontAwesome name="money" size={24} color="black" />},
        {text: "Phương tiện di chuyển", value: transportType, icon: <SimpleLineIcons name="plane" size={24} color="black" />}
    ];

    const dates: string[] = [];

    if (selectedTour.checkInDate && selectedTour.checkOutDate) {
        let current = new Date(selectedTour.checkInDate);
        const end = new Date(selectedTour.checkOutDate);
    
        while (current <= end) {
            const currentStr = current.toISOString().split("T")[0];
            dates.push(formatDateDMY(currentStr));
            current.setDate(current.getDate() + 1); 
        }
    }

    return (
        <Container>
            <SkeletonImage uri={selectedTour.imageUrl || "" } height={225}/>
            <ToolContainer>
                <ToolButton onPress={() => handleShare(selectedTour)}>
                    <EvilIcons name="share-google" size={30} color="black" />
                </ToolButton>
                <ToolButton onPress={() => router.replace(`/editTour/${tourId}`)}>
                    <FontAwesome name="pencil" size={24} color="black" />
                </ToolButton>
            </ToolContainer>

            <DescriptionContainer>
                {Items.map((item, index) => 
                    <TextTourDescription key={index} text={item.text} value={item.value} icon={item.icon}/>
                )}
            </DescriptionContainer>

            <PlanText>Lịch trình</PlanText>

            <AccordionItemWrapper>
                {dates.map((date, index) => (
                    <AccordionItem 
                        key={index} 
                        index={index + 1} 
                        date={date}
                        isExpanded={index === expandedIndex}
                        toggleAccordion={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        selectedTour={selectedTour}
                        type={"display"}
                    />
                ))}
            </AccordionItemWrapper>
            <ShareCodeModal
                visible={isShareModalVisible}
                code={genCode}
                onClose={() => setShareModalVisible(false)}
            />

        </Container>
    )
}