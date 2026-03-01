export function dateFormatter(currentDate) {

    const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return formattedDate

}

export function timeFormatter(currentTime) {

    const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour12: false, // 24-hour format; set to true for AM/PM
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return formattedTime
}

export function formatDateTime(dateTime) {
    return dateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}