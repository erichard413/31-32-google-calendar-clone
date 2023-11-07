import { useState, useEffect } from "react";

export function useLocalStorage() {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events") || "{}")
  );
  useEffect(() => {
    console.log("page loaded -> get local storage events");
  }, []);
  useEffect(() => {
    console.log("events have changed -> save to LS!");
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return {
    events: events,
    setEvents: setEvents,
  };
}
