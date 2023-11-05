import React from "react";
import { useState } from "react";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import getDate from "date-fns/getDate";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import isToday from "date-fns/isToday";
import isPast from "date-fns/isPast";

type valueTypes = {
  currentMonth?: Date;
};

export function Calendar({ currentMonth }: valueTypes) {
  // save visible month in state, this can be used to calculate start of month, end of month values.
  const [visibleMonth, setVisibleMonth] = useState(currentMonth || new Date());
  // get visible dates, to build the calendar using fns-dates
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });
  console.log(visibleMonth);
  console.log(`next month: ${addMonths(visibleMonth, 1)}`);
  console.log(`previous month: ${addMonths(visibleMonth, -1)}`);
  return (
    <div className="calendar">
      <div className="header">
        <button className="btn">Today</button>
        <div>
          <button
            className="month-change-btn"
            onClick={() => setVisibleMonth(month => addMonths(month, -1))}
          >
            &lt;
          </button>
          <button
            className="month-change-btn"
            onClick={() => setVisibleMonth(month => addMonths(month, 1))}
          >
            &gt;
          </button>
        </div>
        <span className="month-title">{format(visibleMonth, "LLLL yyyy")}</span>
      </div>
      <div className="days">
        {visibleDates.map(date => (
          <div
            className={`day ${
              isSameMonth(date, visibleMonth) ? "" : "non-month-day"
            }
              ${isPast(date) && !isToday(date) ? "old-month-day" : ""}
            `}
            key={date.toString()}
          >
            <div className="day-header">
              <div className="week-name">{format(date, "ccc")}</div>
              <div className={`day-number ${isToday(date) ? "today" : ""}`}>
                {getDate(date)}
              </div>
              <button className="add-event-btn">+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
