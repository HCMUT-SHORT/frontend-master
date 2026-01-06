import React from "react";
import { Modal, TouchableOpacity} from "react-native";
import * as Clipboard from "expo-clipboard";
import { COLORS } from "@/constants/Colors";
import Feather from '@expo/vector-icons/Feather';
import styled from "styled-components/native";

type ModalProps = {
  visible: boolean;
  code: string | null;
  onClose: () => void;
}
const Overlay = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    
`;
const Container = styled.View`
    background-color: ${COLORS.LIGHTYELLOW};
    padding: 20px;
    width: 300px;
    align-items: center;
`;
const Row = styled.View`
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    align-items: center;
    width: 100%;
    
`;
const Title = styled.Text`
    font-size: 18px;
    font-family: "Nunito-SemiBold";
    font-weight: 800;
    color: ${COLORS.DARKGREEN};
    margin-bottom: 10px;
`;
const Code = styled.Text`
    font-size: 20px;
    font-family: "Nunito-SemiBold";
    color: #000;
    margin-bottom: 20px;
`;
const CloseButton = styled.TouchableOpacity`
    background-color: ${COLORS.DARKGREEN};
    padding: 10px;
    border-radius: 12px;
`;
const CloseButtonText = styled.Text`
    font-family: "Nunito-SemiBold";
    font-size: 14px;
    color: ${COLORS.DARKYELLOW}
`;

export function ShareCodeModal ({ visible, code, onClose } : ModalProps) {
    const copyToClipboard = async () => {
        if (code) {
        await Clipboard.setStringAsync(code);
        }
    };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Overlay>
        <Container>
            <Title>Mã chia sẻ</Title>
            <Row>
                <Code>{code}</Code>
                <TouchableOpacity>
                    <Feather name="copy" size={24} color={COLORS.DARKGREEN} onPress={copyToClipboard} />
                </TouchableOpacity>
            </Row>
            <CloseButton onPress={onClose}>
                <CloseButtonText>Đóng</CloseButtonText>
            </CloseButton>
        </Container>
      </Overlay>
    </Modal>
  );
};


