import { COLORS } from "@/constants/Colors";
import { AppDispatch, RootState } from "@/redux/store";
import { signup } from "@/redux/userSlice";
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

const LoginText = styled.Text`
    
`;

const LoginButton = styled.TouchableOpacity`
    
`;

const LoginButtonText = styled.Text`
    color: ${COLORS.DARKGREEN};
    font-weight: 600;
`;
const FormContainer = styled.View`
    width: 321px;
    margin-top: 16px;
    gap: 16px;
`;

const Button = styled.TouchableOpacity`
	background-color: ${COLORS.YELLOW};
	border-radius: 8px;
	padding: 16px 10px;
	align-items: center;
`;

const ButtonText = styled.Text`
	color: ${COLORS.DARKGREEN};
	font-size: 16px;
	font-weight: 500;
`;

const ErrorText = styled.Text`
    color: ${COLORS.RED};
    padding: 0;
    margin-top: -10px;
    margin-bottom: -10px;
`;

type SignupModalProps = {
    onLoginPress: () => void;
}

interface SignupForm {
	fullName: string;
	email: string;
	password: string;
}

export function SignupModal ({ onLoginPress } : SignupModalProps) {
	const router = useRouter();
	const [form, setForm] = useState<SignupForm>({ fullName: '', email: '', password: '' });
	const [localError, setLocalError] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const loading = useSelector((state: RootState) => state.user.loading);
	const error = useSelector((state: RootState) => state.user.error);
	const userId = useSelector((state: RootState) => state.user.userId);

	const handleChange = (key: keyof SignupForm, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const handleSignup = () => {
		if (!form.fullName.trim()) {
			setLocalError("Vui lòng điền họ và tên");
			return;
		}
		if (!form.email.trim()) {
			setLocalError("Vui lòng điền email");
			return;
		}
		if (!form.password.trim()) {
			setLocalError("Vui lòng điền mật khẩu");
			return;
		}
		if (form.password.length < 6) {
			setLocalError("Mật khẩu phải có ít nhất 6 ký tự");
			return;
		}

		setLocalError('');
		dispatch(signup(form));
	};

	useEffect(() => {
		if (userId) {
            router.replace("/home");
        }
	}, [userId, router]);

    return (
        <LayoutModal modalTitle={"Đăng ký tài khoản"} backgroundColor={COLORS.WHITE}>
            <FormContainer>
				<InputField 
					placeholder="Họ và tên:" 
					keyboardType="default"
					secureText={false}
					value={form.fullName} 
					onChangeText={(text) => handleChange('fullName', text)}
				/>
								
                <InputField 
					placeholder="Email:" 
					keyboardType="email-address"
					secureText={false}
					value={form.email}
					onChangeText={(text) => handleChange('email', text)}
				/>

				<InputField 
					placeholder="Mật khẩu:"
					keyboardType="default" 
					secureText={true}
					value={form.password}
                 	onChangeText={(text) => handleChange('password', text)} 
				/>

				<ErrorText>{localError || error}</ErrorText>

                <Button style={{ opacity: loading ? 0.5 : 1 }} disabled={loading} onPress={handleSignup}>
                    <ButtonText>
						{loading ? "Đang đăng ký..." : "Đăng ký"}
					</ButtonText>
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