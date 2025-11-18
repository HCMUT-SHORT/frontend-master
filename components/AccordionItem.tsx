import { COLORS } from '@/constants/Colors';
import { PlaceToVisit } from '@/constants/type';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Collapsible from "react-native-collapsible";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from "styled-components/native";
import { PlacesToVisitCollapsible } from './PlacesToVisitCollapsible';

type HeaderContainerProps = {
    isExpanded: boolean;
};

const Container = styled.View`
    
`;

const HeaderContainer = styled.View<{ isExpanded: boolean }>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: ${({ isExpanded } : HeaderContainerProps) => isExpanded ? COLORS.GREEN : COLORS.PUREWHITE};
    border-radius: 8px;
`;

const DayText = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
`;

const ToggleButton = styled.TouchableOpacity`
    
`;

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

type AccordionItemProps = {
    index: number;
    date: string;
    isExpanded: boolean;
    toggleAccordion: (value: boolean | null) => void;
    places: PlaceToVisit[] | [];
}

export function AccordionItem({ index, date, isExpanded, toggleAccordion, places } : AccordionItemProps) {
    const rotation = useSharedValue(isExpanded ? 90 : 0);

    useEffect(() => {
        rotation.value = withTiming(isExpanded ? 90 : 0, { duration: 500 });
    }, [isExpanded, rotation]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
        };
    });

    return (
        <Container>
            <HeaderContainer isExpanded={isExpanded}>
                <DayText>Ngày {index} - {date}</DayText>
                <ToggleButton onPress={toggleAccordion}>
                    <AnimatedIcon
                        name="caret-right"
                        size={24}
                        color={COLORS.DARKGREEN}
                        style={animatedStyle}
                    />
                </ToggleButton>
            </HeaderContainer>

            <Collapsible collapsed={!isExpanded}>
                <View>
                    <PlacesToVisitCollapsible places={places}/>
                </View>
            </Collapsible>
        </Container>
    )
}