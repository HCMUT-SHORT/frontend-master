import { LoadingScreen } from "@/components/LoadingScreen";
import { SkeletonImage } from "@/components/SkeletonImage";
import { TextTourDescription } from "@/components/TextTourDescription";
import { COLORS } from "@/constants/Colors";
import { fetchPlacesToStay, fetchPlacesToVisit, fetchTransportations } from "@/hooks/fetchTourData";
import { AppDispatch, RootState } from "@/redux/store";
import { formatDateDMY } from "@/utility/timeConverter";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

const Container = styled.ScrollView`
    flex: 1;
    background-color: ${COLORS.LIGHTYELLOW};
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
            <LoadingScreen bgColor={COLORS.LIGHTYELLOW}/>
        )
    }

    const checkInDateFormated = selectedTour.checkInDate ? formatDateDMY(selectedTour.checkInDate) : "";
    const checkOutDateFormated = selectedTour.checkOutDate ? formatDateDMY(selectedTour.checkOutDate) : "";

    const Items: ItemDescription[] = [
        {text: "Điểm đến", value: selectedTour.destination, icon: <EvilIcons name="location" size={24} color="black" />},
        {text: "Thời gian", value: `${checkInDateFormated} - ${checkOutDateFormated}`, icon: <FontAwesome name="calendar" size={24} color="black" />},
        {text: "Dự trù kinh phí chuyến đi", value: "123", icon: <FontAwesome name="money" size={24} color="black" />},
        {text: "Phương tiện di chuyển", value: "123", icon: <SimpleLineIcons name="plane" size={24} color="black" />}
    ];

    return (
        <Container>
            <SkeletonImage uri={selectedTour.imageUrl || "" } height={225}/>
            <ToolContainer>
                <ToolButton>
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
        </Container>
    )
}