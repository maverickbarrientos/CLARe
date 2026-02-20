import { dateFormatter, timeFormatter } from "../utils/dateFormatter";
import { useCurrentDate } from "../hooks/useCurrentDate";

export function PageTitle({ pageTitle }) {

    const currentDate = useCurrentDate();

    return (
        <>
            <div className="prose text-left flex flex-col gap-3">
                <h1 className="text-5xl font-heading">{pageTitle}</h1>
                <p className="text-secondary font-heading">
                    as of {dateFormatter(currentDate)}. { timeFormatter(currentDate) }
                </p>
            </div>
        </>
    )

}