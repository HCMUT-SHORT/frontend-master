import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { login } from "@/redux/userSlice";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const ErrorText = styled.Text`
    color: ${COLORS.RED};
    padding: 0;
    margin-top: -10px;
    margin-bottom: -10px;
`;

type LoginModalProps = {
    onSignupPress: () => void;
}

interface LoginForm {
    email: string;
    password: string;
}

export function LoginModal ({ onSignupPress } : LoginModalProps) {
    const router = useRouter();
    const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.user.loading);
    const error = useSelector((state: RootState) => state.user.error );
    const userId = useSelector((state: RootState) => state.user.userId);
    
    useEffect(() => {
        if (userId) {
            router.replace("/home");
        }
    }, [userId, router]);

    return (
        <LayoutModal modalTitle={"Đăng nhập"} backgroundColor={COLORS.WHITE}>
            <FormContainer>
                <InputField 
                    value={form.email}
                    onChange={(text: string) => setForm(prev => ({ ...prev, email: text}))}
                    placeholder={"Email" }
                    fieldType={"default"}
                    keyboardType={"email-address"}
                />

                <InputField 
                    value={form.password}
                    onChange={(text: string) => setForm(prev => ({ ...prev, password: text}))} 
                    placeholder={"Mật khẩu"}
                    fieldType={"secure"}
                    keyboardType={"default"}
                />

                <ErrorText>{error}</ErrorText>

                <Button style={{ opacity: loading ? 0.5 : 1 }} disabled={loading} onPress={() => dispatch(login(form))}>
                    <ButtonText>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </ButtonText>
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