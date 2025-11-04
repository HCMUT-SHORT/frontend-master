import { COLORS } from "@/constants/Colors";
import React from "react";
import styled from "styled-components/native";
import { LayoutModal } from "./LayoutModal";
import { InputField } from "./InputField";

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const LoginText = styled.Text`
    
`;

const LoginButton = styled.TouchableOpacity`
    
`;

const LoginButtonText = styled.Text`
    color: #02954F;
    font-weight: 600;
`;
const FormContainer = styled.View`
  width: 321px;
	margin-top: 16px;
  gap: 16px
`;

const Button = styled.TouchableOpacity`
  background-color: #FFE06E;
  border-radius: 8px;
  padding: 16px 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #02954F;
  font-size: 16px;
  font-weight: 500;
`;

type SignupModalProps = {
    onLoginPress: () => void;
}

export function SignupModal ({ onLoginPress } : SignupModalProps) {

    return (
        <LayoutModal modalTitle={"Đăng ký tài khoản"} backgroundColor={COLORS.WHITE}>

            <FormContainer>
								<InputField placeholder="Họ và tên:"/>
								<InputField placeholder="Email:" keyboardType="email-address"/>
								<InputField placeholder="Mật khẩu:" secureText={true} />
                <Button>
                    <ButtonText>Đăng ký</ButtonText>
                </Button>
								<ButtonContainer>
										<LoginText>Bạn đã có tài khoản? </LoginText>
										<LoginButton onPress={onLoginPress}>
												<LoginButtonText>Đăng nhập</LoginButtonText>
										</LoginButton>
								</ButtonContainer>
            </FormContainer>

        </LayoutModal>
    )
}