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
    title: "🏋️‍♂️ Exercise",
  },
  {
    id: "3",
    title: "📚 Read",
  },
  {
    id: "4",
    title: "📝 Journal",
  },
  {
    id: "5",
    title: "💧 Drink water",
  },
  {
    id: "6",
    title: "🍎 Eat fruit",
  },
  {
    id: "7",
    title: "🥦 Eat vegetables",
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
    <div className="flex h-screen w-screen flex-row-reverse overflow-auto [-webkit-transform:translateZ(0)] supports-[height:100svh]:h-[100svh]">
      <div>
        <div className="sticky top-0 z-10">
          <Header
            dates={dates}
            increaseDateRange={() => setStartDate(addMonths(startDate, -1))}
          />
        </div>
        {habits.map((habit) => (
          <div key={habit.id} className="table">
            <div className="flex flex-col gap-2 px-4 py-2">
              <div className="flex h-12 items-center">
                <h3 className="sticky left-4 text-lg">{habit.title}</h3>
              </div>
              <div className="flex gap-1">
                {dates.map((date) => {
                  const isFirstOfMonth = date.getDate() === 1;
                  const isChecked = Math.random() > 0.5;
                  return (
                    <React.Fragment key={date.valueOf()}>
                      {isFirstOfMonth ? (
                        <div role="separator" className="w-2" />
                      ) : null}
                      <div
                        className={clsx(
                          "grid h-12 w-12 place-content-center rounded-lg",
                          isChecked
                            ? "bg-bg-checked text-text-checked shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)]"
                            : "bg-bg-unchecked"
                        )}
                      >
                        {isChecked ? <CheckIcon /> : null}
                      </div>
                    </React.Fragment>
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M20.184 4.58a1.5 1.5 0 0 1-.263 2.104c-4.198 3.265-6.572 7.483-8.528 12.373a1.5 1.5 0 0 1-2.454.504l-4.5-4.5a1.5 1.5 0 1 1 2.122-2.122l2.923 2.924c1.928-4.32 4.45-8.324 8.595-11.547a1.5 1.5 0 0 1 2.105.263Z" />
    </svg>
  );
}
