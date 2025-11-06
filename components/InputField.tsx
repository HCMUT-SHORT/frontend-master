import { COLORS } from "@/constants/Colors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
import styled from "styled-components/native";

type InputFieldProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureText: boolean;
    keyboardType: "default" | "email-address" | "numeric";
};

const InputContainer = styled.View`
	position: relative;
`;

const StyledInput = styled.TextInput`
	background-color: #fff;
	border-radius: 12px;
	padding: 12px;
	font-size: 14px;
	border-width: 1px;
	border-color: #ddd;
`;

const IconContainer = styled.View`
	position: absolute;
	right: 12px;
	top: 12px;
`;

export function InputField({ placeholder, value, onChangeText, secureText, keyboardType = "default" }: InputFieldProps) {

	return (
		<InputContainer>

		<StyledInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			secureTextEntry={!!secureText}
			placeholderTextColor={COLORS.GRAY}
			keyboardType={keyboardType}
			hasIcon={!!secureText}
		/>

		{secureText && (
			<IconContainer>
				<MaterialIcons name="lock" size={18} color={COLORS.GRAY} />
			</IconContainer>
		)}
		
		</InputContainer>
	);
}
