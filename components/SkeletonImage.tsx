import { COLORS } from "@/constants/Colors";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import styled from "styled-components/native";

type SkeletonProps = {
    height: number;
}

const Wrapper = styled.View<{height: number}>`
    width: 100%;
    height: ${({ height } : SkeletonProps) => height}px;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
`;

const Skeleton = styled.View<{height: number}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${({ height } : SkeletonProps) => height}px;
    background-color: ${COLORS.GRAY};
    border-radius: 8px;
    z-index: 1;
`;

const StyledImage = styled(Animated.Image)<{ height: number }>`
    width: 100%;
    height: ${({ height } : SkeletonProps) => height}px;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
`;

export function SkeletonImage({ uri, height }: { uri: string, height: number }) {
    const opacity = useSharedValue(0);

    const imageStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Wrapper height={height}>
            <Skeleton height={height}/>
            <StyledImage
                source={{ uri }}
                resizeMode="stretch"
                onLoadEnd={() => {
                    opacity.value = withTiming(1, { duration: 500 });
                }}
                style={imageStyle}
                height={height}
            />
        </Wrapper>
    );
}
