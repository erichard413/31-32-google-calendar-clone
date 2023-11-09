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

export function addEvent(
  data: eventTypes,
  events: Array<any>,
  key: string | any
) {
  let evtArr: Array<any> = [];
  if (events[key]) evtArr = [...events[key]];
  if (!data.id) data.id = crypto.randomUUID();
  return { ...events, [key]: [...evtArr, data] };
}
