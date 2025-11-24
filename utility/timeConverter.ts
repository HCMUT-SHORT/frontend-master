export function parseTimestamp(timestamp: string) {
    const date = new Date(timestamp); // parse the timestamp string
    
    return {
        dd: date.getUTCDate(),    // day of month
        mm: date.getUTCMonth() + 1, // month (0-based, so +1)
        year: date.getUTCFullYear(),
        hour: date.getUTCHours(),
        min: date.getUTCMinutes(),
        sec: date.getUTCSeconds()
    };
}

export function formatDateDMY(dateString: string): string {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}

export const getNights = (checkIn: string | null, checkOut: string | null) => {
    if (!checkIn || !checkOut) return 0;

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    const diffMs = outDate.getTime() - inDate.getTime();
    const nights = diffMs / (1000 * 60 * 60 * 24);

    return Math.max(1, nights);
};