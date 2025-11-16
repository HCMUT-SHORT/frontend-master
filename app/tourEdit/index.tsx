import { WaitingCounter } from "@/components/WaitingCounter";
import { COLORS } from "@/constants/Colors";
import styled from "styled-components/native";

const Container = styled.View`
    background-color: ${COLORS.LIGHTGREEN};
    padding: 24px;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.Image`
    width: 200px;
    height: 200px;
`;

export default function TourEdit() {

    return (
        <Container>
            <Logo source={require("../../assets/images/travel.gif")}/>
            <WaitingCounter/>
        </Container>
    )
}