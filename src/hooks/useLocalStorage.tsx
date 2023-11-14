import { useState, useEffect } from "react";

export function useLocalStorage() {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events") || "{}")
  );

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return {
    events: events,
    setEvents: setEvents,
  };
}
