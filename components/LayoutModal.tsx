import styled from "styled-components/native";

interface ContainerProps {
    $backgroundColor: string;
}

const Container = styled.View<ContainerProps>`
    background-color: ${(props : ContainerProps) => props.$backgroundColor};
    border-radius: 10px;
    padding: 24px;
`;

const TitleDisplay = styled.Text`
    font-family: "Nunito-Medium";
    font-size: 28px;
    text-align: center;
`;

type LayoutModalProps = {
    modalTitle: string,
    backgroundColor: string,
    children: React.ReactNode,
}

export function LayoutModal ({ modalTitle, backgroundColor, children } : LayoutModalProps) {
    return (
        <Container backgroundColor={backgroundColor}>
            <TitleDisplay>{modalTitle}</TitleDisplay>
            {children}
        </Container>
    )
}