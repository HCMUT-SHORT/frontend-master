import { COLORS } from "@/constants/Colors";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
import styled from "styled-components/native";

type InputFieldProps = {
	value: string | null;
	onChange: (value: string) => void;
	placeholder: string;
	fieldType: "default" | "secure" | "search";
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

export function InputField({ value, onChange, placeholder, fieldType, keyboardType }: InputFieldProps) {

	return (
		<InputContainer>

		<StyledInput
			value={value}
			onChangeText={onChange}
			placeholder= {placeholder}
			secureTextEntry={fieldType === "secure"}
			keyboardType={keyboardType}
		/>

		{fieldType === "secure" && (
			<IconContainer>
				<MaterialIcons name="lock" size={18} color={COLORS.GRAY} />
			</IconContainer>
		)}

		{fieldType === "search" && (
			<IconContainer>
				<EvilIcons name="search" size={24} color="black" />
			</IconContainer>
		)}
		
		</InputContainer>
	);
}
