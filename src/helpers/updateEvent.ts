type eventTypes = {
  id?: string;
  color?: string;
  startTime?: string | null;
  endTime?: string | null;
  name?: string;
  isAllDay?: boolean;
};

// {
//     id: crypto.randomUUID(),
//     startTime: "",
//     endTime: "",
//     name: "My birthday!",
//     color: "blue",
//     isAllDay: true,
//   },

export function updateEvent(
  data: eventTypes,
  events: Array<any>,
  key: string | any
) {
  return {
    ...events,
    [key]: events[key].map((e: eventTypes) => {
      if (e.id == data.id) {
        return data;
      }
      return e;
    }),
  };
}
