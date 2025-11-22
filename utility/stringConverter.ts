export function parseDays(input: string): number[] {
    if (!input) return [];
    return input.split(",").map(s => s.trim().replace(/^"|"$/g, "")).map(Number);
}

export function stringifyDays(days: number[]): string {
    if (!days || days.length === 0) return "";
    return days.join(",");
}