import { addMonths, eachDayOfInterval } from "date-fns";
import React from "react";
import { useInView } from "react-intersection-observer";

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

  const [startDate, setStartDate] = React.useState(() =>
    addMonths(new Date(today.getFullYear(), today.getMonth(), 1), -1)
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
  }, [startDate]);

  return (
    <div className="flex h-screen w-screen flex-row-reverse overflow-auto supports-[height:100svh]:h-[100svh]">
      <div>
        <div className="table border-b border-divider">
          <div className="flex">
            {months.map(([key, dates]) => {
              const [year, month] = key.split("-").map(Number);
              return (
                <MonthHeader
                  key={key}
                  year={year}
                  month={month}
                  dates={dates}
                  onEnterView={() => {
                    const previousMonth = addMonths(
                      new Date(year, month, 1),
                      -1
                    );

                    if (previousMonth < startDate) {
                      setStartDate(previousMonth);
                    }
                  }}
                  onExitView={(to) => {
                    if (to === "left") {
                      setStartDate(dates[0]);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthHeader(props: {
  year: number;
  month: number;
  dates: Date[];
  onEnterView?: () => void;
  onExitView?: (to: "left" | "right") => void;
}) {
  const [previouslyInView, setPreviouslyInView] = React.useState(false);
  const { ref } = useInView({
    onChange: (inView, entry) => {
      console.log(entry);

      if (!previouslyInView && inView) {
        props.onEnterView?.();
        setPreviouslyInView(true);
      }

      if (previouslyInView && !inView) {
        props.onExitView?.(entry.boundingClientRect.x > 0 ? "right" : "left");
        setPreviouslyInView(false);
      }
    },
  });

  return (
    <div className="px-4 py-2">
      <h2
        ref={ref}
        className="sticky left-4 inline-block py-2 text-3xl font-semibold leading-8"
      >
        {MONTH_NAMES[props.month]} {props.year}
      </h2>
      <div className="flex gap-1">
        {props.dates.map((date) => (
          <div
            key={date.valueOf()}
            className="flex w-12 flex-col items-center gap-1 py-2 text-sm leading-4 text-text-secondary"
          >
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
