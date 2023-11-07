import React from "react";
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
import { Event } from "./Event.tsx";
import { Header } from "./Header.tsx";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import { AddDeleteModal } from "./modals/AddDeleteModal.tsx";
import { EventsModal } from "./modals/EventsModal.tsx";

type valueTypes = {
  currentMonth?: Date;
};

export function Calendar({ currentMonth }: valueTypes) {
  // save visible month in state, this can be used to calculate start of month, end of month values.
  const [visibleMonth, setVisibleMonth] = useState(currentMonth || new Date());
  // state for selecting day
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [eventsModalIsOpen, setEventsModalIsOpen] = useState<boolean>(false);
  const [addDeleteModalIsOpen, setAddDeleteModalIsOpen] =
    useState<boolean>(false);
  // get visible dates, to build the calendar using fns-dates
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  const { events, setEvents } = useLocalStorage();
  // FOR DEV USE ONLY -  useEffect to add in test Event Information
  // useEffect(() => {
  //   setEvents({
  //     [`${format(new Date(), "L-d-yyyy")}`]: [
  //       {
  //         time: "9am",
  //         name: "Test",
  //         color: "blue",
  //       },
  //       {
  //         time: "10am",
  //         name: "Test",
  //         color: "red",
  //       },
  //       {
  //         time: null,
  //         name: "full-day test",
  //         color: "green",
  //       },
  //     ],
  //   });
  // }, []);

  return (
    <>
      {addDeleteModalIsOpen && (
        <AddDeleteModal
          setAddDeleteModalIsOpen={setAddDeleteModalIsOpen}
          addDeleteModalIsOpen={addDeleteModalIsOpen}
        />
      )}
      {eventsModalIsOpen && (
        <EventsModal
          setEventsModalIsOpen={setEventsModalIsOpen}
          setAddDeleteModalIsOpen={setAddDeleteModalIsOpen}
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
                {events[format(date, "L-d-yyyy")]?.map(d => (
                  <Event
                    key={crypto.randomUUID()}
                    time={d.time}
                    name={d.name}
                    color={d.color}
                    setEventsModalIsOpen={setEventsModalIsOpen}
                    setAddDeleteModalIsOpen={setAddDeleteModalIsOpen}
                  />
                ))}
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
