import { addMonths, eachDayOfInterval } from "date-fns";
import React from "react";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function App() {
  const today = new Date();

  const startDate = addMonths(
    new Date(today.getFullYear(), today.getMonth(), 1),
    -1
  );

  const endDate = today;

  const months = React.useMemo(() => {
    // Create an array of dates in the range
    const dates = eachDayOfInterval({ start: startDate, end: endDate });

    // Group the dates by month
    return Object.entries(
      groupBy(dates, (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return `${year}-${month}`;
      })
    );
  }, []);

  return (
    <div className="flex h-screen w-screen flex-row-reverse overflow-auto supports-[height:100svh]:h-[100svh]">
      <div>
        <div className="border-divider table border-b">
          <div className="flex">
            {months.map(([key, dates]) => {
              const [year, month] = key.split("-").map(Number);
              return <MonthHeader year={year} month={month} dates={dates} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthHeader(props: { year: number; month: number; dates: Date[] }) {
  return (
    <div className="px-4 py-2">
      <h2 className="sticky left-4 inline-block py-2 text-3xl font-semibold leading-8">
        {MONTH_NAMES[props.month]} {props.year}
      </h2>
      <div className="flex gap-1">
        {props.dates.map((date) => (
          <div className="text-text-secondary flex w-12 flex-col items-center gap-1 py-2 text-sm leading-4">
            <span>{DAY_NAMES[date.getDay()].slice(0, 1)}</span>
            <span>{date.getDate()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Group an array of items by a key. */
function groupBy<T, K extends string | number>(
  list: T[],
  keyGetter: (item: T) => K
): Record<K, T[]> {
  return list.reduce((acc, item) => {
    const key = keyGetter(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}
