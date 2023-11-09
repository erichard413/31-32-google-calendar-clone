export function addToTime(str: string, mins: number) {
  const hour = str.split(":")[0];
  const minutes = str.split(":")[1];
  if (+minutes + mins < 60) return `${hour}:${+minutes + mins}`;
  if (+minutes + mins - 60 < 10) return `${hour + 1}:0${+minutes + mins - 60}`;
  return `${+hour + 1}:${+minutes + mins - 60}`;
}
