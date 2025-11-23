import { COLORS } from "@/constants/Colors";
import Entypo from '@expo/vector-icons/Entypo';
import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const ReturnButton = styled.TouchableOpacity`
    background-color: ${COLORS.PUREWHITE};
    margin-inline: 24px;
    border-radius: 50px;
    padding: 12px;
    align-self: flex-start;
`;

export default function TourOverviewLayout() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.LIGHTYELLOW }}>
            <ReturnButton onPress={() => router.replace('/home')}>
                <Entypo name="chevron-thin-left" size={20} color="black" />
            </ReturnButton>

            <Slot/>
        </SafeAreaView>
    )
}