import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import { cx } from "../utils/cx";
import { DropdownMenu } from "./dropdown-menu";

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

export function Header(props: {
  dates: Date[];
  increaseDateRange?: () => void;
}) {
  // Track which dates are in view
  const [datesInView, setDatesInView] = React.useState(
    () => new Set<number>(props.dates.map((date) => date.valueOf()))
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
      if (event.inView && event.date.valueOf() === props.dates[0].valueOf()) {
        props.increaseDateRange?.();
      }
    },
    [props.dates]
  );

  return (
    <div className="table border-b border-border bg-bg bg-clip-padding	dark:bg-clip-border">
      <div className="py-2">
        <div className="sticky left-0 flex h-12 w-screen items-center justify-between px-4">
          <h2 className="text-3xl font-semibold">
            {MONTH_NAMES[minDateInView.getMonth()]}{" "}
            {minDateInView.getFullYear()}
          </h2>
          <DropdownMenu modal={false}>
            <DropdownMenu.Trigger asChild>
              <button className="grid h-12 w-12 place-content-center rounded-lg outline-none hover:bg-bg-secondary focus:ring-2 focus:ring-border-focus focus:ring-offset-1 focus:ring-offset-bg">
                <img
                  src="https://github.com/colebemis.png"
                  className="h-8 w-8 rounded-full"
                />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item>Sign out</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
        <div className="flex gap-1 px-4">
          {props.dates.map((date) => {
            const isFirstOfMonth = date.getDate() === 1;
            return (
              <React.Fragment key={date.valueOf()}>
                {isFirstOfMonth ? (
                  <div role="separator" className="w-2" />
                ) : null}
                <CalendarDate
                  key={date.valueOf()}
                  date={date}
                  onIntersectionChange={handleIntersectionChange}
                />
              </React.Fragment>
            );
          })}
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
    const isToday = props.date.toDateString() === new Date().toDateString();

    return (
      <div
        ref={ref}
        className={cx(
          "flex w-12 flex-col items-center gap-1 py-2 text-sm leading-4 text-text-secondary",
          isToday && "font-medium text-text-today"
        )}
      >
        <span>{DAY_NAMES[props.date.getDay()].slice(0, 1)}</span>
        <span>{props.date.getDate()}</span>
      </div>
    );
  }
);

CalendarDate.displayName = "CalendarDate";
