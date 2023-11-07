import React from "react";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { Event } from "../Event";

type propTypes = {
  setEventsModalIsOpen: Function;
  setAddDeleteModalIsOpen: Function;
  eventsModalIsOpen: boolean;
  selectedDay: string;
  events: Array<object>;
};

export function EventsModal({
  setEventsModalIsOpen,
  selectedDay,
  events,
  setAddDeleteModalIsOpen,
  eventsModalIsOpen,
}: propTypes) {
  const modalRef = useRef<any>();
  const handleClose = () => {
    setEventsModalIsOpen((val: boolean) => !val);
  };
  function keyPress(e: KeyboardEvent) {
    if (eventsModalIsOpen && e.key === "Escape") setEventsModalIsOpen(false);
  }
  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    overlay?.addEventListener("click", handleClose);
    document.addEventListener("keydown", e => {
      keyPress(e);
    });
    return () => {
      overlay?.removeEventListener("click", handleClose);
      document.removeEventListener("keydown", e => keyPress(e));
    };
  }, []);

  return createPortal(
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body" ref={modalRef}>
        <div className="modal-title">
          {selectedDay}
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="events">
          {events?.map(d => (
            <Event
              key={crypto.randomUUID()}
              time={d.time}
              name={d.name}
              color={d.color}
              setAddDeleteModalIsOpen={setAddDeleteModalIsOpen}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body.querySelector("#modal-div")
  );
}
