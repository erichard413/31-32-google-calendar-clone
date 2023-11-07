import React from "react";

type propTypes = {
  time?: string;
  name?: string;
  color?: string;
  setAddDeleteModalIsOpen: Function;
};

export function Event({
  time,
  name,
  color,
  setAddDeleteModalIsOpen,
}: propTypes) {
  function handleClick() {
    setAddDeleteModalIsOpen((val: boolean) => !val);
  }
  const ifTime = (
    <button className={`event`} onClick={handleClick}>
      <div className={`color-dot ${color}`}></div>
      <div className="event-time">{time}</div>
      <div className="event-name">{name}</div>
    </button>
  );

  const ifAllDay = (
    <button className={`all-day-event event ${color}`} onClick={handleClick}>
      <div className="event-name">{name}</div>
    </button>
  );
  return <>{time == null ? ifAllDay : ifTime}</>;
}
