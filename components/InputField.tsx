import React, { useState } from "react";
import styled from "styled-components/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type InputFieldProps = {
  placeholder: string;
  value?: string;
  secureText?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
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

export function InputField({
  placeholder,
  value,
  secureText,
  keyboardType = "default",
}: InputFieldProps) {

  return (
    <InputContainer>
      <StyledInput
        placeholder={placeholder}
        value={value}
        secureTextEntry={!!secureText}
        placeholderTextColor="#BCBEC0"
        keyboardType={keyboardType}
        hasIcon={!!secureText}
      />
      {secureText && (
            <IconContainer>
                <MaterialIcons name="lock" size={18} color="#BCBEC0" />
            </IconContainer>
        )}
      
    </InputContainer>
  );
}
