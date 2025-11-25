import { COLORS } from "@/constants/Colors";
import { formatDateDMY } from "@/utility/timeConverter";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SkeletonImage } from "./SkeletonImage";

const Container = styled.View`
    background-color: ${COLORS.LIGHTYELLOW};
    border-radius: 15px;
    padding: 14px;
`;

const DestinationText = styled.Text`
    font-size: 16px;
    font-family: "Nunito-SemiBold";
    margin-top: 14px;
`;

const TourCreatedDate = styled.Text`
    font-size: 12px;
    font-family: "Nunito-Regular";
    color: ${COLORS.PUREGRAY};
`;

type TourCardProps = {
    tourId: string | null,
    destination: string | null,
    checkInDate: string | null,
    checkOutDate: string | null,
    imageUrl: string | null
};

export function TourCard ({ tourId, destination, checkInDate, checkOutDate, imageUrl } : TourCardProps) {
    const router = useRouter();
    const checkInDateFormated = checkInDate ? formatDateDMY(checkInDate) : "";
    const checkOutDateFormated = checkOutDate ? formatDateDMY(checkOutDate) : "";

    return (
        <Container testID={`tourcard-${destination}`}>
            <TouchableOpacity activeOpacity={1} onPress={() => router.replace(`/overviewTour/${tourId}`)}>  
                <SkeletonImage uri={imageUrl || ""} height={268}/>
            </TouchableOpacity>
            <DestinationText testID={"tour-destination"}>{destination}</DestinationText>
            <TourCreatedDate>{checkInDateFormated} - {checkOutDateFormated}</TourCreatedDate>
        </Container>
    )
}