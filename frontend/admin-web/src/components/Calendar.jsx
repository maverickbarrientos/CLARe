import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function Calendar() {
  return (
    <DayPicker
      mode="single"
      classNames={{
        disabled: true,
        root: "p-2 bg-black rounded-2xl shadow overflow-hidden",
        month_caption: "flex font-bold text-lg mb-2 font-heading uppercase",
        nav: "flex items-center gap-2 ml-auto",
        button_previous: "px-2 py-1 today text-xs rounded-full hover:bg-gray-100",
        button_next: "px-2 py-1 today text-xs rounded-full hover:bg-gray-100",
        month_grid: "w-full border-collapse",
        weekdays: "flex w-full mb-1 gap-1",
        weekday: "text-xs font-medium text-center text-gray-400 flex-1 gap-1",
        week: "flex w-full my-1",
        day: "flex-1 flex items-center font-bold justify-center text-disabled h-10 rounded-full overflow-hidden cursor-pointer font-heading hover:bg-gray-100",
        day_button: "flex items-center justify-center w-8 h-10 rounded-full",
        today: "today rounded-full text-glow",
        chevron: "fill-orange-400",
    }}
    />
  );
}