import addMonths from "date-fns/addMonths";
import format from "date-fns/format";

type propTypes = {
  visibleMonth: Date;
  setVisibleMonth: Function;
};

export function Header({ visibleMonth, setVisibleMonth }: propTypes) {
  return (
    <div className="header">
      <button className="btn">Today</button>
      <div>
        <button
          className="month-change-btn"
          onClick={() =>
            setVisibleMonth((month: Date) => addMonths(new Date(month), -1))
          }
        >
          &lt;
        </button>
        <button
          className="month-change-btn"
          onClick={() =>
            setVisibleMonth((month: Date) => addMonths(new Date(month), 1))
          }
        >
          &gt;
        </button>
      </div>
      <span className="month-title">
        {format(new Date(visibleMonth), "LLLL yyyy").toString()}
      </span>
    </div>
  );
}
