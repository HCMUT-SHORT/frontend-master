import { COLORS } from "@/constants/Colors";
import styled from "styled-components/native";

const Container = styled.View`
    background-color: ${COLORS.LIGHTGREEN};
    padding: 24px;
    flex: 1;
`;

const TextDisplay = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 20px;
    margin-bottom: 15px;
`;
export default function Transportation() {

    return (
        <Container>
            <TextDisplay>Hãy chọn phương tiện phù hợp nhé!</TextDisplay>
        </Container>
    )
}