import { COLORS } from "@/constants/Colors";
import Entypo from '@expo/vector-icons/Entypo';
import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const ReturnButton = styled.TouchableOpacity`
    background-color: ${COLORS.PUREWHITE};
    margin-inline: 24px;
    margin-top: 24px;
    border-radius: 50px;
    padding: 12px;
    align-self: flex-start;
`;

export default function ProfileLayout() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.LIGHTGREEN }}>
            <ReturnButton onPress={() => router.back()}>
                <Entypo name="chevron-thin-left" size={20} color="black" />
            </ReturnButton>

            <Slot/>
        </SafeAreaView>
    );
}