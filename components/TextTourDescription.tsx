import { COLORS } from "@/constants/Colors";
import styled from "styled-components/native";

type TextTourDescriptionProps = {
    text: string;
    icon: React.ReactNode;
    value: string | null | undefined;
}

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    column-gap: 15px;
`;

const TextWrapper = styled.View`

`;

const TextDisplay = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 14px;
`;

const ValueDisplay = styled.Text`
    font-family: "Nunito-Medium";
    font-size: 16px;
    color: ${COLORS.DARKGREEN};
`;

export function TextTourDescription({ text, value, icon } : TextTourDescriptionProps) {

    return (
        <Container>
            {icon}
            <TextWrapper>
                <TextDisplay>{text}</TextDisplay>
                <ValueDisplay>{value}</ValueDisplay>
            </TextWrapper>
        </Container>
    )
}