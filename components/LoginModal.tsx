import { COLORS } from "@/constants/Colors";
import React from "react";
import styled from "styled-components/native";
import { LayoutModal } from "./LayoutModal";

const ButtonContainer = styled.View`
    flex-direction: row;
`;

const SignupText = styled.Text`
    
`;

const SignupButton = styled.TouchableOpacity`
    
`;

const SignupButtonText = styled.Text`

`;

type LoginModalProps = {
    onSignupPress: () => void;
}

export function LoginModal ({ onSignupPress } : LoginModalProps) {

    return (
        <LayoutModal modalTitle={"Đăng nhập"} backgroundColor={COLORS.WHITE}>


            <ButtonContainer>
                <SignupText>Bạn chưa có tài khoản? </SignupText>
                <SignupButton onPress={onSignupPress}>
                    <SignupButtonText>Đăng ký</SignupButtonText>
                </SignupButton>
            </ButtonContainer>
        </LayoutModal>
    )
}