import { addMonths, eachDayOfInterval } from "date-fns";
import React from "react";
import { Header } from "./header";
import clsx from "clsx";

const habits = [
  {
    id: "1",
    title: "🧘‍♂️ Meditate",
  },
  {
    id: "2",
    title: "🏃‍♂️ Exercise",
  },
  {
    id: "3",
    title: "📚 Read",
  },
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

  return (
    <div className="flex h-screen w-screen flex-row-reverse overflow-auto supports-[height:100svh]:h-[100svh]">
      <div>
        <Header
          dates={dates}
          increaseDateRange={() => setStartDate(addMonths(startDate, -1))}
        />
        {habits.map((habit) => (
          <div key={habit.id} className="table">
            <div className="flex flex-col gap-2 px-4 py-2">
              <div className="flex h-12 items-center">
                <h3 className="sticky left-4 text-lg">{habit.title}</h3>
              </div>
              <div className="flex gap-1">
                {dates.map((date) => {
                  const checked = Math.random() > 0.5;
                  return (
                    <div
                      key={date.valueOf()}
                      className={clsx(
                        "grid h-12 w-12 place-content-center rounded-md ",
                        checked
                          ? "bg-bg-checked shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-2px_1px_rgba(0,0,0,0.2)]"
                          : "bg-bg-unchecked"
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
