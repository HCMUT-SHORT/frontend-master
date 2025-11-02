import styled from "styled-components/native";

const Image = styled.Image`
    width: 289px;
    height: 318px;
`;

export const IconOnboarding2 = () => {
    return (
        <Image source={require("../images/character.png")}/>
    )
}