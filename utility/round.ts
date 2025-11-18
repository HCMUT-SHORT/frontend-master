export function getRoundedRating(rating: number) {
    const decimal = rating % 1;

    if (decimal < 0.25) return Math.floor(rating);      // 4.1 → 4
    if (decimal < 0.75) return Math.floor(rating) + 0.5; // 4.25 → 4.5
    return Math.ceil(rating);                            // 4.76 → 5
}