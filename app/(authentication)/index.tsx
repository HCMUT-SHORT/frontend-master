import { LoginModal } from "@/components/LoginModal";
import { SignupModal } from "@/components/SignupModal";
import { useRef } from "react";
import { Dimensions, FlatList, ImageBackground } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

const Container = styled(ImageBackground)`
    flex: 1;
`;

type SlideItem = {
    id: string,
    context: React.ReactNode
}

export default function Authentication() {
    const flatListRef = useRef<FlatList<SlideItem>>(null);

    const goToSignup = () => {
        flatListRef.current?.scrollToIndex({ index: 1, animated: true });
    }

    const goToLogin = () => {
        flatListRef.current?.scrollToIndex({ index: 0, animated: true});
    };

    const SLIDES: SlideItem[] = [
        {id: "0", context: <LoginModal onSignupPress={goToSignup}/>},
        {id: "1", context: <SignupModal onLoginPress={goToLogin}/>}
    ];

    const renderItem = ({ item }: { item: SlideItem }) => {
        return (
            <Animated.View style={{ width, justifyContent: "center", alignItems: "center" }}>{item.context}</Animated.View>
        )
    };

    return (
        <Container
            source={require("@/assets/images/scenery.jpg")}
            resizeMode="cover"
        >
            <Animated.FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
            />
        </Container>
    )
}