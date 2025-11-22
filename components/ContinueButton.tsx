import { COLORS } from "@/constants/Colors";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity<{ disabled: boolean }>`
    align-self: flex-end;
    align-items: flex-end;
    margin-top: 25px;
    background-color: ${COLORS.DARKYELLOW};
    padding: 10px 15px;
    border-radius: 8px;
    opacity: ${({ disabled } : { disabled: boolean }) => (disabled ? 0.4 : 1)};
`;

const ButtonText = styled.Text`
    color: ${COLORS.DARKGREEN};
    font-family: "Nunito-SemiBold";
    font-size: 14px;
`;

type ContinueButtonProps = {
    onPress: () => void | Promise<void>;
    disabled: boolean;
    text: string;
}

export function ContinueButton({ onPress, disabled, text }: ContinueButtonProps) {

    return (
        <Button onPress={onPress} disabled={disabled}>
            <ButtonText>{text}</ButtonText>
        </Button>
    )
}