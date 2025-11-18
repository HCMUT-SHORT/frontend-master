import { COLORS } from "@/constants/Colors";
import { formatDateDMY } from "@/utility/timeConverter";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    background-color: ${COLORS.LIGHTYELLOW};
    border-radius: 15px;
    padding: 14px;
`;

const Image = styled.Image`
    width: 100%;
    height: 268px;
    border-radius: 15px;
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
        <Container>
            <TouchableOpacity onPress={() => router.replace(`/overviewTour/${tourId}`)}>  
                <Image source={{ uri: imageUrl || "" }} resizeMode="cover"/>
            </TouchableOpacity>
            <DestinationText>{destination}</DestinationText>
            <TourCreatedDate>{checkInDateFormated} - {checkOutDateFormated}</TourCreatedDate>
        </Container>
    )
}