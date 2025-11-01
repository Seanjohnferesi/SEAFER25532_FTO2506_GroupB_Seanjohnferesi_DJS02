/**
 * Format a date string into "Month Day, Year"
 * @param {string} dateStr - The date string to format
 * @returns {string} - Formatted date
 */
export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
