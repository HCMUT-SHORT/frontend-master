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