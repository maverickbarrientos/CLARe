export function dateFormatter(currentDate) {

    const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return formattedDate

}

export function getWeekRange() {

    const today = new Date();
    const start = new Date();
    const end = new Date();

    start.setDate(today.getDate() - today.getDay());
    end.setDate(today.getDate() + (6 - today.getDay()));

    return { start, end }

}