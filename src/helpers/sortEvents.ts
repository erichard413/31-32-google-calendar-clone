export function sortEvents(array: Array<any>) {
  //array will be array of objects containing each event data, sort by start time.
  if (!array) return;
  let allDayEvents: any[] = [];
  let timedEvents: any[] = [];
  array.map(event => {
    event.isAllDay ? allDayEvents.push(event) : timedEvents.push(event);
  });
  return [
    ...allDayEvents,
    ...timedEvents.sort((a, b) =>
      a.startTime > b.startTime ? 1 : b.startTime > a.startTime ? -1 : 0
    ),
  ];
}
