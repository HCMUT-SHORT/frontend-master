import BusIcon from '@/assets/Icons/busIcon';
import CarIcon from '@/assets/Icons/carIcon';
import PlaneIcon from '@/assets/Icons/planeIcon';
import TrainIcon from '@/assets/Icons/trainIcon';
import { COLORS } from '@/constants/Colors';
import { Transportation } from '@/constants/type';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Linking } from 'react-native';
import styled from "styled-components/native";

const Container = styled.View`
    align-items: center;
    flex-direction: row;
    column-gap: 15px;
    background-color: ${COLORS.LIGHTYELLOW};
    padding: 10px 15px;
    border-radius: 8px;
`;

const DetailWrapper = styled.View`
    flex: 1;
`;

const TransportType = styled.Text`
    font-family: "Nunito-Medium";
    font-size: 16px;
`;

const HeaderWrapper = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const TransportButton = styled.TouchableOpacity`
    
`;

const TransportDetail = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    color: ${COLORS.PUREGRAY};
`;

const TransportLinkWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const TransportLinkText = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    color: ${COLORS.DARKGRAY};
` ;

const TransportLinkButton = styled.TouchableOpacity`
    
`;

const TransportLinkButtonText = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    text-decoration: underline;
`;

type TransportCardProps = {
    transport: Transportation;
    onPress: () => void;
}

export function TransportCard({ transport, onPress } : TransportCardProps) {
    const transportType = 
        transport.type === "flight" ? "Máy bay" : 
        transport.type === "train" ? "Tàu lửa" :
        transport.type === "bus" ? "Xe khách" : "Tự lái";


    const handleOpenURL = async (url: string) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            }
        } catch (error) {
            console.error("Failed to open URL:", error);
        }
    };

    return (
        <Container>
            {transport.type === "flight" ? (
                <PlaneIcon/>
            ) : transport.type === "bus" ? (
                <BusIcon/>
            ) : transport.type === "train" ? (
                <TrainIcon/>
            ) : (
                <CarIcon/>
            )}
    
            <DetailWrapper>
                <HeaderWrapper>
                    <TransportType>{transportType}</TransportType>
                    <TransportButton onPress={onPress}>
                        {transport.isSelected ? (
                            <Feather name="check" size={20} color={COLORS.DARKGREEN} />
                        ) : (
                            <AntDesign name="plus-circle" size={18} color="black" />
                        )}
                    </TransportButton>
                </HeaderWrapper>

                <TransportDetail>{transport.time}</TransportDetail>
                <TransportDetail>Giá vé: {transport.price.toLocaleString("en-US")} đồng</TransportDetail>

                {transport.type !== "self-drive" &&( 
                    <TransportLinkWrapper>
                        <TransportLinkText>Đặt vé tại: </TransportLinkText>
                        {transport.isPossible && (
                            <TransportLinkButton onPress={() => handleOpenURL(transport.bookingUrl)}>
                                <TransportLinkButtonText>{transportType}</TransportLinkButtonText>
                            </TransportLinkButton>
                        )}
                    </TransportLinkWrapper>
                )}
            </DetailWrapper>
        </Container>
    )
}