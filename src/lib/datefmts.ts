export const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const dateFormat = (
  timestamp: number | string | null = new Date().valueOf(),
  format = "d/m/y"
) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  let ndate = `${year}-${month}-${day}`;
  switch (format) {
    case "y-m-d":
      ndate = `${year}-${month}-${day}`;
      break;
    case "d/m/y":
      ndate = `${day}/${month}/${year}`;
      break;
    case "d-m-y":
      ndate = `${day}-${month}-${year}`;
      break;
    case "d sm/y":
      ndate = `${day} ${shortMonths[+month - 1]}/${year}`;
      break;
    case "d/sm/y":
      ndate = `${day}/${shortMonths[+month - 1]}/${year}`;
      break;
    case "d/sm":
      ndate = `${day}/${shortMonths[+month - 1]}`;
      break;
    default:
      ndate = `${year}-${month}-${day}`;
      break;
  }
  return ndate;
};
