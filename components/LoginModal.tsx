import { COLORS } from "@/constants/Colors";
import React from "react";
import styled from "styled-components/native";
import { LayoutModal } from "./LayoutModal";
import { InputField } from "./InputField";

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const SignupText = styled.Text`
    
`;

const SignupButton = styled.TouchableOpacity`
    
`;

const SignupButtonText = styled.Text`
    color: #02954F;
    font-weight: 600;
`;

const FormContainer = styled.View`
  width: 321px;
  margin-top: 16px;
  gap: 16px
`;

const Button = styled.TouchableOpacity`
  background-color: #02954F;
  border-radius: 8px;
  padding: 16px 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #FFE06E;
  font-size: 16px;
  font-weight: 500;
`;

type LoginModalProps = {
    onSignupPress: () => void;
}

export function LoginModal ({ onSignupPress } : LoginModalProps) {

    return (
        <LayoutModal modalTitle={"Đăng nhập"} backgroundColor={COLORS.WHITE}>


            <FormContainer>
                <InputField placeholder="Email:" keyboardType="email-address"/>
                <InputField placeholder="Mật khẩu:" secureText={true} />
                <Button>
                    <ButtonText>Đăng nhập</ButtonText>
                </Button>
                    <ButtonContainer>
                        <SignupText>Bạn chưa có tài khoản? </SignupText>
                        <SignupButton onPress={onSignupPress}>
                                <SignupButtonText>Đăng ký</SignupButtonText>
                        </SignupButton>
                    </ButtonContainer>
            </FormContainer>
        </LayoutModal>
    )
}