import { COLORS } from "@/constants/Colors";
import { getRoundedRating } from "@/utility/round";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

export function StarRender({ rating }: { rating: number }) {
    const rounded = getRoundedRating(rating); // e.g., 4.5

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rounded >= i) {
            stars.push(<FontAwesome key={i} name="star" size={14} color={COLORS.DARKGREEN} />);
        } else if (rounded + 0.5 === i) {
            stars.push(<FontAwesome key={i} name="star-half-full" size={14} color={COLORS.DARKGREEN} />);
        } else {
            stars.push(<FontAwesome key={i} name="star-o" size={14} color={COLORS.DARKGREEN} />);
        }
    }

    return <>{stars}</>;
}
