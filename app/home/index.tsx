import { TourCard } from "@/components/TourCard";
import { COLORS } from "@/constants/Colors";
import { TourState } from "@/constants/type";
import { RootState } from "@/redux/store";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, type SharedValue } from "react-native-reanimated";
import { useSelector } from "react-redux";
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
    padding-top: 5%;
`;

const UserContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    padding-bottom: 10%;
    column-gap: 5px;
`;

const UserName = styled.Text`
    font-size: 16px;
    font-family: "Nunito-SemiBold";
`;

const UserButton = styled.TouchableOpacity`
    
`;

const Title = styled.Text`
    font-size: 22px;
    font-family: "Nunito-SemiBold";
`;

const MytourTextContainer = styled.View`
    margin-top: 10%;
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
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const tours = useSelector((state: RootState) => state.tours);
    const today = new Date().getTime();
    const top3Tours = [...tours].filter(t => t.createdAt).sort((a, b) => {
        const dateA = new Date(a.createdAt!).getTime();
        const dateB = new Date(b.createdAt!).getTime();
        return Math.abs(dateA - today) - Math.abs(dateB - today);
    }).slice(0, 3);
    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const renderItem = ({ item, index }: { item: TourState; index: number }) => {
        return (
            <AnimatedCard index={index} scrollX={scrollX}>
                <TourCard
                    key={item.id}
                    tourId={item.id}
                    destination={item.destination} 
                    imageUrl={item.imageUrl} 
                    checkInDate={item.checkInDate} 
                    checkOutDate={item.checkOutDate}
                    type={"default"}
                />
            </AnimatedCard>
        );
    };

    return (
        <Container>
            <MainContainer>
                <UserContainer>
                    <UserName>{user.username}</UserName>
                    <UserButton onPress={() => router.push("/profile")}>
                        <EvilIcons name="user" size={40} color="green" />
                    </UserButton>
                </UserContainer>

                <Title>Khám phá thế giới hùng vĩ</Title>

                <MytourTextContainer>
                    <MyTourText>Tour của tôi</MyTourText>
                    <SeeAllTour onPress={() => {router.push("/home/tours")}}>Xem tất cả</SeeAllTour>
                </MytourTextContainer>

                <Animated.FlatList
                    data={top3Tours}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
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
