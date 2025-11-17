import { COLORS } from "@/constants/Colors";
import { parseTimestamp } from "@/utility/timeConverter";
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
    destination: string | null,
    createdAt: string | null,
    imageUrl: string | null
};

export function TourCard ({ destination, createdAt, imageUrl } : TourCardProps) {
    const time = createdAt ? parseTimestamp(createdAt) : null;
    const formattedDate = time ? `${time.dd.toString().padStart(2, "0")}/${time.mm.toString().padStart(2, "0")}/${time.year}`: "";

    return (
        <Container>
            <Image source={{ uri: imageUrl || "" }} resizeMode="cover"/>
            <DestinationText>{destination}</DestinationText>
            <TourCreatedDate>{formattedDate}</TourCreatedDate>
        </Container>
    )
}