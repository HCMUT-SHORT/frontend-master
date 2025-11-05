import { TourCard } from "@/components/TourCard";
import { COLORS } from "@/constants/Colors";
import { Dimensions } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, type SharedValue } from "react-native-reanimated";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 268;
const SPACING = width * 0.03;

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.LIGHTGREEN};
    padding: 20px;
`;

const MainContainer = styled.View`
    padding-top: 35%;
`;

const Title = styled.Text`
    font-size: 22px;
    font-family: "Nunito-SemiBold";
`;

const MytourTextContainer = styled.View`
    margin-top: 15%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-bottom: 3%;
`;

const MyTourText = styled.Text`
    font-family: "Nunito-SemiBold";
    font-size: 16px;
    color: ${COLORS.DARKGREEN};
`;

const SeeAllTour = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
    color: ${COLORS.DARKGREEN};
`;

type SlideItem = {
    id: string;
    context: React.ReactNode;
};

function AnimatedCard({ index, scrollX, children } : { index: number; scrollX: SharedValue<number>; children: React.ReactNode }) {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * (ITEM_WIDTH + SPACING),
            index * (ITEM_WIDTH + SPACING),
            (index + 1) * (ITEM_WIDTH + SPACING),
        ];

        const scale = interpolate(scrollX.value, inputRange, [0.9, 1, 0.9], Extrapolation.CLAMP);
        const opacity = interpolate(scrollX.value, inputRange, [0.7, 1, 0.7], Extrapolation.CLAMP);

        return {
            transform: [{ scale }],
            opacity,
        };
    });

    return (
        <Animated.View
            style={[
                {
                    width: ITEM_WIDTH,
                    height: 384,
                    marginRight: SPACING,
                },
                animatedStyle,
            ]}
        >
            {children}
        </Animated.View>
    );
}

export default function Home() {
    const SLIDES: SlideItem[] = [
        { id: "1", context: <TourCard destination="Quy Nhơn" tourCreatedDate="2/11/2025" tourImage="image1" /> },
        { id: "2", context: <TourCard destination="Hà Nội" tourCreatedDate="3/11/2025" tourImage="image2" /> },
        { id: "3", context: <TourCard destination="Hồ Chí Minh" tourCreatedDate="4/11/2025" tourImage="image3" /> },
    ];

    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const renderItem = ({ item, index }: { item: SlideItem; index: number }) => {
        return (
            <AnimatedCard index={index} scrollX={scrollX}>
                {item.context}
            </AnimatedCard>
        );
    };

    return (
        <Container>
            <MainContainer>
                <Title>Khám phá thế giới hùng vĩ</Title>

                <MytourTextContainer>
                    <MyTourText>Tour của tôi</MyTourText>
                    <SeeAllTour>Xem tất cả</SeeAllTour>
                </MytourTextContainer>

                <Animated.FlatList
                    data={SLIDES}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    snapToInterval={ITEM_WIDTH + SPACING}
                    decelerationRate={"fast"}
                    snapToAlignment={"center"}
                    bounces={false}
                />
            </MainContainer>
        </Container>
    );
}
