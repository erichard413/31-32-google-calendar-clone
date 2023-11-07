import React from "react";
import addMonths from "date-fns/addMonths";
import format from "date-fns/format";

export function Header({ visibleMonth, setVisibleMonth }) {
  return (
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
  );
}
