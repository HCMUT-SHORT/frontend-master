import { COLORS } from "@/constants/Colors";
import styled from "styled-components/native";

type ButtonType = "cont" | "join";

interface ButtonProps {
    disabled: boolean;
    btntype: ButtonType;
}

const Button = styled.TouchableOpacity<ButtonProps>`
    align-self: flex-end;
    align-items: flex-end;
    margin-top: 25px;
    padding: 10px 15px;
    border-radius: 12px;
    background-color: ${({ btntype }: ButtonProps) => btntype === "cont" ? COLORS.DARKYELLOW : COLORS.DARKGREEN};
    opacity: ${({ disabled }: ButtonProps) => (disabled ? 0.4 : 1)};
`;

const ButtonText = styled.Text<ButtonProps>`
    font-family: "Nunito-SemiBold";
    font-size: 14px;
    color: ${({ btntype }: ButtonProps) => btntype === "cont" ? COLORS.DARKGREEN : COLORS.DARKYELLOW};
`;

type ContinueButtonProps = {
    onPress: () => void | Promise<void>;
    disabled: boolean;
    text: string;
    type: ButtonType;
};

export function ContinueButton({ onPress, disabled, text, type }: ContinueButtonProps) {
    return (
        <Button onPress={onPress} disabled={disabled} btntype={type}>
            <ButtonText btntype={type}>{text}</ButtonText>
        </Button>
    );
}
