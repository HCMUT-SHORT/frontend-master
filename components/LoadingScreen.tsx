import styled from "styled-components/native";

type ContainerType = {
    bgColor: string;
}

const Container = styled.View<{ bgColor: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: ${(props : ContainerType) => props.bgColor};
`;

const Logo = styled.Image`
    width: 200px;
    height: 200px;
`;

type LoadingScreenProps = {
    bgColor: string;
}

export function LoadingScreen({ bgColor }: LoadingScreenProps) {
    return (
        <Container bgColor={bgColor}>
            <Logo source={require("../assets/images/travel.gif")}/>
        </Container>
    );
}