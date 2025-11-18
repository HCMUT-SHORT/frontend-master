import { COLORS } from "@/constants/Colors";
import { PlaceToVisit } from "@/constants/type";
import styled from "styled-components/native";
import { StarRender } from "./StarRender";

const Container = styled.ScrollView`
    max-height: 400px;
    margin-top: 15px;
`;

const PlaceContainer = styled.View`
    background-color: ${COLORS.LIGHTYELLOW};
    border-radius: 8px;
`;

const PlaceImage = styled.Image`
    width: 100%;
    height: 150px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const DetailWrapper = styled.View`
    padding: 12px;  
`;

const HeaderContainer = styled.View`
    
`;

const PlaceName = styled.Text`
    font-family: "Nunito-SemiBold";
    font-size: 16px;
`;

const RatingContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
    column-gap: 5px;
`;

const RatingScore = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
`;

const PlaceDetail = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
`;

const PlaceBestTimeToVisit = styled.Text`
    margin-top: 5px;
    font-family: "Nunito-Regular";
    font-size: 14px;
    color: ${COLORS.DARKGRAY};
`;

const PlacePrice = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    color: ${COLORS.DARKGRAY};
`;

type PlacesToVisitCollapsibleProps = {
    places: PlaceToVisit[] | [];
}

export function PlacesToVisitCollapsible({ places } : PlacesToVisitCollapsibleProps) {

    return (
        <Container contentContainerStyle={{ gap: 15 }}>
            {places.map((place) => (
                <PlaceContainer key={place.id}>
                    <PlaceImage source={{ uri: place.imageUrl || "" }}/>

                    <DetailWrapper>
                        <HeaderContainer>
                            <PlaceName>{place.name}</PlaceName>
                        </HeaderContainer>

                        <RatingContainer>
                            <RatingScore>{place.rating}</RatingScore>
                            <StarRender rating={place.rating}/>
                            <RatingScore>({place.totalRating} lượt đánh giá)</RatingScore>
                        </RatingContainer>

                        <PlaceDetail>{place.detail}</PlaceDetail>
                        <PlaceBestTimeToVisit>Thời gian tham quan: {place.bestTimeToVisit}</PlaceBestTimeToVisit>
                        <PlacePrice>Giá vé: {place.price} đồng</PlacePrice>
                    </DetailWrapper>
                </PlaceContainer>
            ))}
        </Container>
    )
}