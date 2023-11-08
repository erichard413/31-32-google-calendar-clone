import { formatEventTime } from "../helpers/formatEventTime.ts";
import format from "date-fns/format";

type propTypes = {
  event: {
    color?: string;
    startTime?: string | null;
    endTime?: string | null;
    name?: string;
    isAllDay?: boolean;
  };
  setAddDeleteModalIsOpen: Function;
  setSelectedEvent: Function;
  setSelectedDay?: Function;
  setEventsModalIsOpen: Function;
  date?: Date;
};

export function Event({
  event,
  setAddDeleteModalIsOpen,
  setSelectedEvent,
  setSelectedDay,
  date,
}: propTypes) {
  const { color, startTime, isAllDay, name } = event;
  function handleClick() {
    setSelectedEvent(event);
    if (setSelectedDay && date) setSelectedDay(format(date, "L-d-yyyy"));
    setAddDeleteModalIsOpen((val: boolean) => !val);
  }
  const ifTime = (
    <button className={`event`} onClick={handleClick}>
      <div className={`color-dot ${color}`}></div>
      <div className="event-time">
        {startTime && formatEventTime(startTime)}
      </div>
      <div className="event-name">{name}</div>
    </button>
  );

  const ifAllDay = (
    <button className={`all-day-event event ${color}`} onClick={handleClick}>
      <div className="event-name">{name}</div>
    </button>
  );
  return <>{isAllDay == true ? ifAllDay : ifTime}</>;
}
