import { COLORS } from "@/constants/Colors";
import React, { useState } from "react";
import styled from "styled-components/native";
import { InputField } from "./InputField";
import { LayoutModal } from "./LayoutModal";

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const SignupText = styled.Text`
    
`;

const SignupButton = styled.TouchableOpacity`
    
`;

const SignupButtonText = styled.Text`
    color: ${COLORS.DARKGREEN};
    font-weight: 600;
`;

const FormContainer = styled.View`
    width: 321px;
    margin-top: 16px;
    gap: 16px;
`;

const Button = styled.TouchableOpacity`
    background-color: ${COLORS.DARKGREEN};
    border-radius: 8px;
    padding: 16px 10px;
    align-items: center;
`;

const ButtonText = styled.Text`
    color: ${COLORS.YELLOW};
    font-size: 16px;
    font-weight: 500;
`;

type LoginModalProps = {
    onSignupPress: () => void;
}

interface LoginForm {
    email: string;
    password: string;
}

export function LoginModal ({ onSignupPress } : LoginModalProps) {
    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: '',
    });

    const handleChange = (key: keyof LoginForm, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleLogin = () => {
        console.log(form);
    };

    return (
        <LayoutModal modalTitle={"Đăng nhập"} backgroundColor={COLORS.WHITE}>
            <FormContainer>
                <InputField 
                    placeholder="Email:" 
                    keyboardType="email-address"
                    secureText={false}
                    value={form.email}
                    onChangeText={(text) => handleChange('email', text)}
                />

                <InputField 
                    placeholder="Mật khẩu:" 
                    keyboardType="email-address"
                    secureText={true}
                    value={form.password}
                    onChangeText={(text) => handleChange('password', text)}
                />

                <Button onPress={handleLogin}>
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