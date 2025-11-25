import { COLORS } from "@/constants/Colors";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.LIGHTGREEN};
`;

export default function Tours() {
    return (
        <Container testID="tours-container">
            
        </Container>
    )
}