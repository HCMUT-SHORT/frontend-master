import { COLORS } from "@/constants/Colors";
import { useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import styled from "styled-components/native";


const Container = styled.View`
    flex-direction: row;
    align-items: center;
    column-gap: 5px;
`;

const WaitingTimeText = styled.Text`
    font-family: "Nunito-Regular";
    color: ${COLORS.DARKGREEN};
    font-size: 16px;
`;

export function WaitingCounter() {
    const [seconds, setSeconds] = useState<number>(45);
    const scale = useSharedValue(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        scale.value = withSpring(1.2, {}, () => {
            scale.value = withSpring(1);
        });
    }, [seconds, scale]);
    
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));    

    return (
        <Container>
            <WaitingTimeText>Thời gian chờ đợi:</WaitingTimeText>
            <Animated.Text 
                style={[
                    {
                        fontFamily: "Nunito-Regular",
                        fontSize: 16,
                        color: COLORS.DARKGREEN
                    }, 
                    animatedStyle
                ]}
            >
                {seconds}s
            </Animated.Text>
        </Container>
    )
}