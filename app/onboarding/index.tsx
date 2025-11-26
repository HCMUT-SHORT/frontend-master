import { IconOnboarding1 } from "@/assets/Icons/Onboarding1";
import { IconOnboarding2 } from "@/assets/Icons/Onboarding2";
import { IconOnboarding3 } from "@/assets/Icons/Onboarding3";
import { OnBoardingItem } from "@/components/OnBoardingItem";
import { COLORS } from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, type SharedValue } from "react-native-reanimated";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.LIGHTGREEN};
    padding-top: 40%;
`;

const FlatListContainer = styled.View`

`;

const PaginationDotContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const Dot = styled(Animated.View)`
    height: 10px;
    border-radius: 5px;
    margin: 0 5px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-inline: 24px;
    margin-top: 50px;
`;

const NextButton = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    background-color: ${COLORS.DARKYELLOW};
    justify-content: center;
    align-items: center;
    border-radius: 60px;
`;

const SkipButton = styled.TouchableOpacity`
    
`;

const SkipText = styled.Text`
    color: ${COLORS.GRAY};
    font-family: "Nunito-Medium";
`;

type SlideItem = {
    id: string;
    content: React.ReactNode
}

const SLIDES: SlideItem[] = [
    {id: "1", content: 
        <OnBoardingItem 
            title={"Khám phá dễ dàng"} 
            description={"Thông tin địa điểm chi tiết, hình ảnh sinh động và đánh giá tin cậy giúp trải nghiệm khám phá trở nên trọn vẹn"} 
            image={<IconOnboarding1/>}
        />
    },
    {id: "2", content:
        <OnBoardingItem
            title={"Lên kết hoạch thông minh"} 
            description={"Công nghệ AI gợi ý các địa điểm phù hợp với sở thích của bạn, tối ưu hóa lịch trình giúp bạn tiết kiệm thời gian và chi phí"} 
            image={<IconOnboarding2/>}
        />
    },
    {id: "3", content:
        <OnBoardingItem
            title={"Chia sẻ cùng với mọi người"} 
            description={"Dễ dàng chia sẻ lịch trình đã tạo với mọi người, cùng nhau lên kế hoạch và tận hưởng huyến đi hoàn hảo"} 
            image={<IconOnboarding3/>}
        />
    }
];

export default function Onboarding() {
    const router = useRouter();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        router.prefetch("/authentication");
    }, [router]);

    const renderItem = ({ item }: { item: SlideItem }) => {
        return (
            <Animated.View style={{width, justifyContent: "center", alignItems: "center"}}>
                {item.content}
            </Animated.View>
        );
    };

    const scrollX = useSharedValue<number>(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        }
    });

    const handleNext = async () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < SLIDES.length) {
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        } else {
            await AsyncStorage.setItem("hasOnboarded", "true");
            router.replace("/authentication");
        }
    };

    const handleSkip = async () => {
        await AsyncStorage.setItem("hasOnboarded", "true");
        router.replace("/authentication");
    };

    return (
        <Container>
            <FlatListContainer>
                <Animated.FlatList
                    ref={flatListRef}
                    data={SLIDES}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    onScroll={scrollHandler}
                    onScrollToIndexFailed={() => {}}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / width);
                        setCurrentIndex(index);
                    }}
                />
            </FlatListContainer>

            <PaginationDotContainer>
                {SLIDES.map((_, index) => (
                    <PaginationDot key={index} index={index} scrollX={scrollX}/>
                ))}
            </PaginationDotContainer>

            <ButtonContainer>
                <SkipButton onPress={handleSkip}><SkipText>Bỏ qua</SkipText></SkipButton>
                <NextButton testID={"next-button"} onPress={handleNext}><AntDesign name="right" size={24} color="white"/></NextButton>
            </ButtonContainer>
        </Container>
    )
}

type DotProps = {
    index: number;
    scrollX: SharedValue<number>;
};
  
function PaginationDot({index, scrollX }: DotProps) {
    const animatedDotStyle = useAnimatedStyle(() => {
        const inputRange = [index - 1, index, index + 1];

        const widthAnimated = interpolate(scrollX.value / width, inputRange, [10, 30, 10], Extrapolation.CLAMP);

        const opacity = interpolate(scrollX.value / width, inputRange, [0.5, 1, 0.5], Extrapolation.CLAMP);

        return {
            width: widthAnimated,
            opacity,
            backgroundColor: COLORS.DARKBLUE,
        }
    })

    return (
        <Dot style={animatedDotStyle}/>
    )
}