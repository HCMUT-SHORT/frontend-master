import { COLORS } from "@/constants/Colors";
import React, { useState } from "react";
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

type SignupModalProps = {
    onLoginPress: () => void;
}

interface SignupForm {
	fullName: string;
	email: string;
	password: string;
}

export function SignupModal ({ onLoginPress } : SignupModalProps) {
	const [form, setForm] = useState<SignupForm>({
		fullName: '',
		email: '',
		password: '',
	});

	const handleChange = (key: keyof SignupForm, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const handleSignup = () => {
		console.log(form);
	};

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

                <Button onPress={handleSignup}>
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