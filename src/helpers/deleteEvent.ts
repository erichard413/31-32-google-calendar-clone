export function deleteEvent(id: string, key: any, events: Array<any>) {
  return events[key].filter((ev: { id: string }) => ev.id !== id);
}
