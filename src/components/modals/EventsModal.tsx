import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { Event } from "../Event";
import { sortEvents } from "../../helpers/sortEvents";

type propTypes = {
  setEventsModalIsOpen: Function;
  setAddDeleteModalIsOpen: Function;
  setSelectedEvent: Function;
  eventsModalIsOpen: boolean;
  selectedDay: string;
  events: Array<object>;
};

export function EventsModal({
  setEventsModalIsOpen,
  selectedDay,
  setSelectedEvent,
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
          {selectedDay.replaceAll("-", "/")}
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="events">
          {sortEvents(events)?.map(d => (
            <Event
              key={crypto.randomUUID()}
              event={d}
              setEventsModalIsOpen={setEventsModalIsOpen}
              setAddDeleteModalIsOpen={setAddDeleteModalIsOpen}
              setSelectedEvent={setSelectedEvent}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body.querySelector("#modal-div")!
  );
}
