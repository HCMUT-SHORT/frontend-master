import { COLORS } from "@/constants/Colors";
import React from "react";
import styled from "styled-components/native";

const TitleDisplay = styled.Text`
    font-family: "Nunito-SemiBold";
    font-size: 24px;
    color: ${COLORS.DARKGREEN};
    margin-top: 25px;
    margin-bottom: 10px;
`;

const DescriptionDisplay = styled.Text`
    font-family: "Nunito-Regular";
    font-size: 16px;
    padding-inline: 24px;
    text-align: center;
    height: 125px;
`;

type OnBoardingItemProps = {
    title: string,
    description: string,
    image: React.ReactNode
}

export function OnBoardingItem ({ title, description, image } : OnBoardingItemProps) {
    return (
        <>
            {image}
            <TitleDisplay>{title}</TitleDisplay>
            <DescriptionDisplay>{description}</DescriptionDisplay>
        </>
    )
}