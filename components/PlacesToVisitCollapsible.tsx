import { COLORS } from "@/constants/Colors";
import { PlaceToVisit } from "@/constants/type";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from '@expo/vector-icons/Feather';
import styled from "styled-components/native";
import { SkeletonImage } from "./SkeletonImage";
import { StarRender } from "./StarRender";

const Container = styled.ScrollView`
    max-height: 400px;
    margin-top: 15px;
`;

const PlaceContainer = styled.View`
    background-color: ${COLORS.LIGHTYELLOW};
    border-radius: 8px;
`;

const DetailWrapper = styled.View`
    padding: 12px;  
`;

const HeaderContainer = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

const PlaceName = styled.Text`
    font-family: "Nunito-SemiBold";
    font-size: 16px;
`;

const PlaceButton = styled.TouchableOpacity`
    
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
    index: number;
    places: PlaceToVisit[] | [];
}

export function PlacesToVisitCollapsible({ index, places } : PlacesToVisitCollapsibleProps) {

    return (
        <Container contentContainerStyle={{ gap: 15 }}>
            {places.map((place) => (
                <PlaceContainer key={place.id}>
                    <SkeletonImage uri={place.imageUrl || ""} height={200}/>

                    <DetailWrapper>
                        <HeaderContainer>
                            <PlaceName>{place.name}</PlaceName>
                            <PlaceButton>
                                {place.dayVisit.includes(index) ? (
                                    <Feather name="check" size={20} color={COLORS.DARKGREEN} />
                                ) : (
                                    <AntDesign name="plus-circle" size={18} color="black" />
                                )}
                            </PlaceButton>
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