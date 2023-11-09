//takes time input as a STRING (example: 09:16) and converts it to calendar display format -> 9:16am

export function formatEventTime(str: string) {
  let amOrPm: string = +str.split(":", 1)[0] > 11 ? "pm" : "am";
  //if begins in 0, slice.
  if (str[0] === "0") return `${str.slice(1)}${amOrPm}`;
  if (+str.slice(0, -3) > 12)
    return `${+str.slice(0, -3) - 12}${str.slice(2)}${amOrPm}`;
  return `${str}${amOrPm}`;
}
