export function parseDays(input: string): number[] {
    if (!input) return [];
    return input.split(",").map(s => s.trim().replace(/^"|"$/g, "")).map(Number);
}