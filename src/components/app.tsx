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

  // Create an array of dates in the range
  const dates = React.useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [startDate]);

  // Track which dates are in view
  const [datesInView, setDatesInView] = React.useState(
    () => new Set<number>(dates.map((date) => date.valueOf()))
  );

  const minDateInView = React.useMemo(() => {
    return new Date(Math.min(...datesInView));
  }, [datesInView]);

  const handleIntersectionChange = React.useCallback(
    (event: { date: Date; inView: boolean }) => {
      // Update set of dates in view
      setDatesInView((prev) => {
        const next = new Set(prev);
        if (event.inView) {
          next.add(event.date.valueOf());
        } else {
          next.delete(event.date.valueOf());
        }
        return next;
      });

      // Increase range when start comes into view
      if (event.inView && event.date.valueOf() === startDate.valueOf()) {
        setStartDate(addMonths(startDate, -1));
      }
    },
    [startDate]
  );

  return (
    <div className="flex h-screen w-screen flex-row-reverse overflow-auto supports-[height:100svh]:h-[100svh]">
      <div>
        <div className="table border-b border-divider">
          <div className="px-4 py-2">
            <h2 className="sticky left-4 inline-block py-2 text-3xl font-semibold leading-8">
              {MONTH_NAMES[minDateInView.getMonth()]}{" "}
              {minDateInView.getFullYear()}
            </h2>
            <div className="flex gap-1">
              {dates.map((date) => (
                <CalendarDate
                  key={date.valueOf()}
                  date={date}
                  onIntersectionChange={handleIntersectionChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CalendarDate = React.memo(
  (props: {
    date: Date;
    onIntersectionChange?: (event: { date: Date; inView: boolean }) => void;
  }) => {
    const { ref } = useInView({
      onChange: (inView) => {
        props.onIntersectionChange?.({ date: props.date, inView });
      },
      threshold: 1,
    });

    return (
      <div
        ref={ref}
        className="flex w-12 flex-col items-center gap-1 py-2 text-sm leading-4 text-text-secondary"
      >
        <span>{DAY_NAMES[props.date.getDay()].slice(0, 1)}</span>
        <span>{props.date.getDate()}</span>
      </div>
    );
  }
);
