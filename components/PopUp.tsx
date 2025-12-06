import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "@/constants/Colors";

type PopupProps = {
  visible: boolean;
  message: string;
  onHide: () => void;
};

const PopupContainer = styled(Animated.View)`
  position: absolute;
  top: 30px;
  right: 10px;
  background-color: ${COLORS.YELLOW};
  padding: 10px 18px;
  border-radius: 18px;
  z-index: 999;
  elevation: 5;
`;

const PopupText = styled.Text`
  font-size: 14px;
  font-family: "Nunito-SemiBold";
  color: ${COLORS.DARKGREEN};
`;

export function Popup({ visible, message, onHide }: PopupProps) {
  const slideAnim = useRef(new Animated.Value(200)).current; // start off-screen (right)

  useEffect(() => {
    if (visible) {
      // ➜ Slide IN
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();

      // ➜ Auto close
      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 200,
          duration: 250,
          useNativeDriver: true,
        }).start(() => onHide());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <PopupContainer style={{ transform: [{ translateX: slideAnim }] }}>
      <PopupText>{message}</PopupText>
    </PopupContainer>
  );
}
