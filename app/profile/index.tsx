import { COLORS } from "@/constants/Colors";
import { clearUser } from "@/redux/userSlice";
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

const Container = styled.View`
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 24px;
    font-family: "Nunito-SemiBold";
`;

const ItemWrapper = styled.View`
    margin-top: 5%;
    display: flex;
    row-gap: 10px;
`;

const SmallItemWrapper = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    column-gap: 10px;
`;

const Button = styled.TouchableOpacity<{ isPressed: boolean }>`
    padding: 15px;
    background-color: ${({ isPressed }: { isPressed: boolean }) => isPressed ? COLORS.DARKYELLOW : COLORS.LIGHTYELLOW};
`;

const ButtonText = styled.Text`
    font-size: 16px;
    font-family: "Nunito";
`;

export default function Profile() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [pressedIndex, setPressedIndex] = useState<number | null>(null);

    const items = [
        { label: "Tài khoản", icon: "user"}, 
        { label: "Thông báo", icon: "bell"}, 
        { label: "Đăng xuất", icon: "log-out"}
    ];

    const handlePress = async (label: string) => {
        if (label === "Đăng xuất") {
            dispatch(clearUser());
            await AsyncStorage.removeItem("token");
            router.replace("/authentication");
        }
    };

    return (
        <Container>
            <Title>Cài đặt và quyền riêng tư</Title>

            <ItemWrapper>
                {items.map((item, index) => (
                    <Button 
                        key={item.label} 
                        isPressed={pressedIndex === index} 
                        activeOpacity={1}
                        onPress={() => handlePress(item.label)}
                        onPressIn={() => setPressedIndex(index)}
                        onPressOut={() => setPressedIndex(null)}
                    >
                        <SmallItemWrapper>
                            <Feather name={item.icon as any} size={16} color={COLORS.DARKGREEN} />
                            <ButtonText>{item.label}</ButtonText>
                        </SmallItemWrapper>
                    </Button>
                ))}
            </ItemWrapper>
        </Container>
    )
}