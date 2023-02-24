import { addMonths, eachDayOfInterval } from "date-fns";
import React from "react";
import { Header } from "./header";
import clsx from "clsx";
import { CheckIcon, MoreIcon, PlusIcon } from "./icons";
import { IconButton } from "./icon-button";

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
      <div className="table">
        <div className="sticky top-0 z-10">
          <Header
            dates={dates}
            increaseDateRange={() => setStartDate(addMonths(startDate, -1))}
          />
        </div>
        {habits.map((habit) => (
          <div key={habit.id} className="flex flex-col gap-2 py-2">
            <div className="sticky left-0 flex h-12 w-screen items-center justify-between px-4">
              <h3 className="text-lg">{habit.title}</h3>
              <IconButton>
                <MoreIcon />
              </IconButton>
            </div>
            <div className="flex gap-1 px-4">
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
                      {isChecked ? (
                        <div className="-mt-[3px] flex">
                          <CheckIcon />
                        </div>
                      ) : null}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
        <div className="sticky left-0 w-screen p-4">
          <IconButton>
            <PlusIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
