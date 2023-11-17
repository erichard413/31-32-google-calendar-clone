import { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import getDate from "date-fns/getDate";
import isSameMonth from "date-fns/isSameMonth";
import isToday from "date-fns/isToday";
import isPast from "date-fns/isPast";
import { deleteEvent } from "../helpers/deleteEvent.ts";
import { addEvent } from "../helpers/addEvent.ts";
import { updateEvent } from "../helpers/updateEvent.ts";
import { Event } from "./Event.tsx";
import { Header } from "./Header.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import { ModalContentAddDelete } from "./modals/ModalContentAddDelete.tsx";
import { ModalContentEvents } from "./modals/ModalContentEvents.tsx";
import { sortEvents } from "../helpers/sortEvents.ts";
import { Modal } from "./modals/Modal.tsx";

type eventTypes = {
  id?: string;
  color?: string;
  startTime?: string | null;
  endTime?: string | null;
  name?: string;
  isAllDay?: boolean;
};

export function Calendar() {
  // save visible month in state, this can be used to calculate start of month, end of month values.
  const [visibleMonth, setVisibleMonth] = useState(new Date());
  // state for selecting day
  const [selectedDay, setSelectedDay] = useState<string>("");
  // state for selecting event
  const initialEvent: Object = {};
  const [selectedEvent, setSelectedEvent] = useState<Object>(initialEvent);
  // state for selected modal
  const [selectedModal, setSelectedModal] = useState<
    "closed" | "add-delete" | "events"
  >("closed");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { events, setEvents } = useLocalStorage();
  // ref for # of displayed events
  const eventsRef = useRef<any>();
  const plusMoreRef = useRef<any>();
  const [numEvents, setNumEvents] = useState<number>(0);

  // get visible dates, to build the calendar using fns-dates
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  function handleResize() {
    setNumEvents(
      Math.floor(
        eventsRef.current.clientHeight /
          document.querySelector(".event")!.clientHeight -
          1
      )
    );
  }
  useEffect(() => {
    // get HEIGHT of each date div on screen resize
    let height = document.querySelector(".event")!?.clientHeight || 23;
    setNumEvents(Math.floor(eventsRef.current.clientHeight / height - 1));
    window.addEventListener("resize", handleResize);
    //cleanup function to remove handler! *IMPORTANT*
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleModalClose() {
    setModalIsOpen(val => !val);
  }

  function handleDelete(id: string, key: string) {
    setEvents(
      (
        e: {
          id: string;
          color?: string | undefined;
          startTime?: string | null | undefined;
          endTime?: string | null | undefined;
          name?: string | undefined;
          isAllDay?: boolean | undefined;
        }[]
      ) => ({ ...e, [key]: deleteEvent(id, key, e) })
    );
  }

  function handleAdd(data: eventTypes, key: string) {
    setEvents(addEvent(data, events, key));
  }

  function handleUpdate(data: eventTypes, key: string) {
    setEvents(updateEvent(data, events, key));
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          handleModalClose();
        }}
      >
        {selectedModal === "events" && (
          <ModalContentEvents
            selectedDay={selectedDay}
            events={events[selectedDay]}
            onClose={() => {
              setModalIsOpen(false);
            }}
            event={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            setSelectedModal={setSelectedModal}
            setModalIsOpen={setModalIsOpen}
            modalIsOpen={modalIsOpen}
          />
        )}
        {selectedModal === "add-delete" && (
          <ModalContentAddDelete
            onClose={() => {
              setModalIsOpen(false);
            }}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            event={selectedEvent}
            selectedDay={selectedDay}
            setSelectedEvent={setSelectedEvent}
          />
        )}
      </Modal>
      <div className="calendar">
        <Header setVisibleMonth={setVisibleMonth} visibleMonth={visibleMonth} />
        <div className="days">
          {visibleDates.map((date, index) => (
            <div
              className={`day ${
                isSameMonth(date, visibleMonth) ? "" : "non-month-day"
              }
              ${isPast(date) && !isToday(date) ? "old-month-day" : ""}
            `}
              key={date.toString()}
            >
              <div className="day-header">
                {index < 7 && (
                  <div className="week-name">{format(date, "ccc")}</div>
                )}
                <div className={`day-number ${isToday(date) ? "today" : ""}`}>
                  {getDate(date)}
                </div>
                <button
                  className="add-event-btn"
                  onClick={() => {
                    setSelectedDay(format(date, "L-d-yyyy"));
                    setSelectedModal("add-delete");
                    setModalIsOpen(true);
                    setSelectedEvent(initialEvent);
                  }}
                >
                  +
                </button>
              </div>
              <div className="events" ref={eventsRef}>
                {sortEvents(events[format(date, "L-d-yyyy")])
                  ?.slice(0, numEvents)
                  ?.map(
                    (d: {
                      color?: string | undefined;
                      startTime?: string | null | undefined;
                      endTime?: string | null | undefined;
                      name?: string | undefined;
                      isAllDay?: boolean | undefined;
                    }) => (
                      <Event
                        key={crypto.randomUUID()}
                        modalIsOpen={modalIsOpen}
                        event={d}
                        date={date}
                        setSelectedEvent={setSelectedEvent}
                        setSelectedDay={setSelectedDay}
                        setSelectedModal={setSelectedModal}
                        setModalIsOpen={setModalIsOpen}
                      />
                    )
                  )}
              </div>
              {events[format(date, "L-d-yyyy")]?.length > numEvents ? (
                <button
                  className="events-view-more-btn"
                  onClick={() => {
                    setSelectedDay(format(date, "L-d-yyyy"));
                    setSelectedModal("events");
                    setModalIsOpen(true);
                  }}
                  ref={plusMoreRef}
                >
                  +{events[format(date, "L-d-yyyy")]?.length - numEvents} More
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
