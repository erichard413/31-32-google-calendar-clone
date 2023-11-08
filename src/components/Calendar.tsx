import { useState, useEffect } from "react";
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
import { Event } from "./Event.tsx";
import { Header } from "./Header.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import { AddDeleteModal } from "./modals/AddDeleteModal.tsx";
import { EventsModal } from "./modals/EventsModal.tsx";

type valueTypes = {
  currentMonth?: Date;
};

type Event = {
  id: string;
  color?: string;
  startTime?: string | null;
  endTime?: string | null;
  name?: string;
  isAllDay?: boolean;
};

export function Calendar({ currentMonth }: valueTypes) {
  // save visible month in state, this can be used to calculate start of month, end of month values.
  const [visibleMonth, setVisibleMonth] = useState(currentMonth || new Date());
  // state for selecting day
  const [selectedDay, setSelectedDay] = useState<string>("");
  // state for selecting event
  const [selectedEvent, setSelectedEvent] = useState<Object>("");
  const [eventsModalIsOpen, setEventsModalIsOpen] = useState<boolean>(false);
  const [addDeleteModalIsOpen, setAddDeleteModalIsOpen] =
    useState<boolean>(false);
  const { events, setEvents } = useLocalStorage();
  // get visible dates, to build the calendar using fns-dates
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

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
    setAddDeleteModalIsOpen(val => !val);
  }
  // FOR DEV USE ONLY -  useEffect to add in test Event Information
  useEffect(() => {
    setEvents({
      [`${format(new Date(), "L-d-yyyy")}`]: [
        {
          id: crypto.randomUUID(),
          startTime: "09:00",
          endTime: "10:00",
          name: "Test",
          color: "blue",
          isAllDay: false,
        },
        {
          id: crypto.randomUUID(),
          startTime: "10:00",
          endTime: "11:00",
          name: "Test2",
          color: "red",
          isAllDay: false,
        },
        {
          id: crypto.randomUUID(),
          startTime: "",
          endTime: "",
          name: "full-day test",
          color: "green",
          isAllDay: true,
        },
      ],
      "10-24-2023": [
        {
          id: crypto.randomUUID(),
          startTime: "",
          endTime: "",
          name: "My birthday!",
          color: "blue",
          isAllDay: true,
        },
      ],
    });
  }, []);

  return (
    <>
      {addDeleteModalIsOpen && (
        <AddDeleteModal
          setAddDeleteModalIsOpen={setAddDeleteModalIsOpen}
          addDeleteModalIsOpen={addDeleteModalIsOpen}
          setSelectedEvent={setSelectedEvent}
          selectedDay={selectedDay}
          event={selectedEvent}
          handleDelete={handleDelete}
        />
      )}
      {eventsModalIsOpen && (
        <EventsModal
          setEventsModalIsOpen={setEventsModalIsOpen}
          setAddDeleteModalIsOpen={setAddDeleteModalIsOpen}
          setSelectedEvent={setSelectedEvent}
          selectedDay={selectedDay}
          events={events[selectedDay]}
          eventsModalIsOpen={eventsModalIsOpen}
        />
      )}
      <div className="calendar">
        <Header setVisibleMonth={setVisibleMonth} visibleMonth={visibleMonth} />
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
                <button
                  className="add-event-btn"
                  onClick={() => {
                    setSelectedDay(format(date, "L-d-yyyy"));
                    setAddDeleteModalIsOpen(val => !val);
                  }}
                >
                  +
                </button>
              </div>
              <div className="events">
                {events[format(date, "L-d-yyyy")]?.map(
                  (d: {
                    color?: string | undefined;
                    startTime?: string | null | undefined;
                    endTime?: string | null | undefined;
                    name?: string | undefined;
                    isAllDay?: boolean | undefined;
                  }) => (
                    <Event
                      key={crypto.randomUUID()}
                      event={d}
                      date={date}
                      setEventsModalIsOpen={setEventsModalIsOpen}
                      setAddDeleteModalIsOpen={setAddDeleteModalIsOpen}
                      setSelectedEvent={setSelectedEvent}
                      setSelectedDay={setSelectedDay}
                    />
                  )
                )}
              </div>
              {events[format(date, "L-d-yyyy")]?.length > 0 ? (
                <button
                  className="events-view-more-btn"
                  onClick={() => {
                    setSelectedDay(format(date, "L-d-yyyy"));
                    setEventsModalIsOpen((val: boolean) => !val);
                  }}
                >
                  +{events.length} More
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
