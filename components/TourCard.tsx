import { COLORS } from "@/constants/Colors";
import { formatDateDMY } from "@/utility/timeConverter";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SkeletonImage } from "./SkeletonImage";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { ContinueButton } from "./ContinueButton";

const Container = styled.View`
    background-color: ${COLORS.LIGHTYELLOW};
    border-radius: 15px;
    padding: 14px;
`;

const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Block = styled.View`
    margin-top: 14px;
`;

const DestinationText = styled.Text`
    font-size: 16px;
    font-family: "Nunito-SemiBold";
    
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
    imageUrl: string | null,
    type: "default" | "share" | "join"
    onShare?: () => void,
    onJoin?: () => void
};

export function TourCard ({ tourId, destination, checkInDate, checkOutDate, imageUrl, type, onShare, onJoin } : TourCardProps) {
    const router = useRouter();
    const checkInDateFormated = checkInDate ? formatDateDMY(checkInDate) : "";
    const checkOutDateFormated = checkOutDate ? formatDateDMY(checkOutDate) : "";

    return (
        <Container testID={`tourcard-${destination}`}>
            <TouchableOpacity activeOpacity={1} onPress={() => router.replace(`/overviewTour/${tourId}`)}>  
                <SkeletonImage uri={imageUrl || ""} height={268}/>
            </TouchableOpacity>
            <Row>
                <Block>
                    <DestinationText>{destination}</DestinationText>
                    <TourCreatedDate>{checkInDateFormated} - {checkOutDateFormated}</TourCreatedDate>
                </Block>

                {type === "share" && (
                    <TouchableOpacity onPress={onShare!}>
                        <EvilIcons name="share-google" size={28} color="black" />
                    </TouchableOpacity>
                )}

                {type === "join" && (
                    <ContinueButton 
                        onPress={onJoin!}
                        disabled={false}
                        type="join"
                        text="Tham gia"
                    />
                )}
            </Row>
        </Container>
    )
}