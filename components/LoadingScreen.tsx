import { COLORS } from "@/constants/Colors";
import styled from "styled-components/native";

const Container = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: ${COLORS.LIGHTGREEN};
`;

const Logo = styled.Image`
    width: 200px;
    height: 200px;
`;

export function LoadingScreen() {
    return (
        <Container>
            <Logo source={require("../assets/images/travel.gif")}/>
        </Container>
    );
}