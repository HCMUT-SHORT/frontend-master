import { COLORS } from "@/constants/Colors";
import { PlaceToStay } from "@/constants/type";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Linking } from "react-native";
import styled from "styled-components/native";
import { SkeletonImage } from "./SkeletonImage";
import { StarRender } from "./StarRender";

const Container = styled.View`
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

const PlacePrice = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    color: ${COLORS.DARKGRAY};
`;

const PlaceLinkWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PlaceLinkText = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    color: ${COLORS.DARKGRAY};
` ;

const PlaceLinkButton = styled.TouchableOpacity`
    
`;

const PlaceLinkButtonText = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    text-decoration: underline;
    color: ${COLORS.DARKBLUE};
    text-decoration-color: ${COLORS.DARKBLUE};
`;

type PlaceToStayCardProps = {
    place: PlaceToStay;
    onPress: () => void;
}

export function PlaceToStayCard({ place, onPress } : PlaceToStayCardProps) {

    return (
        <Container>
            <SkeletonImage uri={place.imageUrl} height={200}/>
            <DetailWrapper>
                <HeaderContainer>
                    <PlaceName>{place.name}</PlaceName>
                    <PlaceButton onPress={onPress}>
                        {place.isSelected ? (
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
                <PlacePrice>Giá phòng: Từ {place.price.toLocaleString("en-US")} đồng</PlacePrice>
                <PlaceLinkWrapper>
                    <PlaceLinkText>Đặt phòng tại: </PlaceLinkText>
                    <PlaceLinkButton onPress={() => Linking.openURL(place.bookingUrl)}>
                        <PlaceLinkButtonText>{place.name}</PlaceLinkButtonText>
                    </PlaceLinkButton>
                </PlaceLinkWrapper>
            </DetailWrapper>
        </Container>
    )
}