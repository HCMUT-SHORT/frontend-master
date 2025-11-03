import { COLORS } from "@/constants/Colors";
import React from "react";
import styled from "styled-components/native";
import { LayoutModal } from "./LayoutModal";

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const LoginText = styled.Text`
    
`;

const LoginButton = styled.TouchableOpacity`
    
`;

const LoginButtonText = styled.Text`

`;

type SignupModalProps = {
    onLoginPress: () => void;
}

export function SignupModal ({ onLoginPress } : SignupModalProps) {

    return (
        <LayoutModal modalTitle={"Đăng ký tài khoản"} backgroundColor={COLORS.WHITE}>


            <ButtonContainer>
                <LoginText>Bạn đã có tài khoản? </LoginText>
                <LoginButton onPress={onLoginPress}>
                    <LoginButtonText>Đăng nhập</LoginButtonText>
                </LoginButton>
            </ButtonContainer>
        </LayoutModal>
    )
}