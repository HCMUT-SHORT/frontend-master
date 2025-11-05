import { COLORS } from "@/constants/Colors";
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
    destination: string,
    tourCreatedDate: string,
    tourImage: "image1" | "image2" | "image3";
};

const images: Record<string, any> = {
    "image1": require("../assets/temp/image1.png"),
    "image2": require("../assets/temp/image2.png"),
    "image3": require("../assets/temp/image3.png"),  
};

export function TourCard ({ destination, tourCreatedDate, tourImage } : TourCardProps) {
    return (
        <Container>
            <Image source={images[tourImage]} resizeMode="cover"/>
            <DestinationText>{destination}</DestinationText>
            <TourCreatedDate>{tourCreatedDate}</TourCreatedDate>
        </Container>
    )
}