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

export const formatNaive = (date) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};