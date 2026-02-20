export function timeFormatter(currentTime) {

    const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour12: true, // 24-hour format; set to true for AM/PM
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return formattedTime
}