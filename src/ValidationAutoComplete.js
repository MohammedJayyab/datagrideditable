function hasSlashOrDot(str) {
  return str.includes("/") || str.includes(".");
}
function getSeparator(str) {
  if (str.includes("/")) {
    return "/";
  } else if (str.includes(".")) {
    return ".";
  } else {
    return null;
  }
}
export function isValidDate(str) {
  const regex = /^(\d{2})[/.](\d{2})[/.](\d{4})$/;
  return regex.test(str);
}
export function getFormattedDate(dateString) {
  if (hasSlashOrDot(dateString)) {
    var separator = getSeparator(dateString);
    const dateParts = dateString.split(separator); // separator = '/'   or '.'
    if (dateParts.length >= 2 && dateParts[1] !== "") {
      var day = dateParts[0].padStart(2, "0");
      if (day === "00") day = "01";

      const month = dateParts[1].padStart(2, "0");
      var year = "";
      if (dateParts[2]) {
        year = dateParts[2].padStart(2, "0");
        if (dateParts[2].length === 2) year = "20" + year;
      } else {
        year = new Date().getFullYear();
      }
      return WithZero(`${day}/${month}/${year}`);
    }
  }
}

export function WithZero(dateString) {
  const parts = dateString.split("/");
  if (parts.length === 3 && parts[2] !== "") {
    const [day, month, year] = getFullDateParts(dateString);
    return `${day}/${month}/${year}`;
  }
  return dateString;
}

export function getFullDateParts(dateString) {
  if (isValidDate(dateString)) {
    var separator = getSeparator(dateString);
    const dateParts = dateString.split(separator); // separator = '/'   or '.'

    const day = dateParts[0].padStart(2, "0");
    const month = dateParts[1].padStart(2, "0");
    const year = dateParts[2].padStart(2, "0");

    return [day, month, year];
  }
  return dateString;
}

export function getNextEndDate(dateString) {
  if (isValidDate(dateString)) {
    const [day, month, year] = getFullDateParts(dateString);

    const numDays = new Date(year, month, 0).getDate();

    return `${numDays}/${month}/${year}`;
  }
}

export function isDateLessThanToDay(dateString) {
  if (isValidDate(dateString)) {
    const [day, month, year] = getFullDateParts(dateString);
    const inputDate = new Date(`${year}/${month}/${day}`);
    const today = new Date();

    return inputDate < today;
  }
  return false;
}
export function isDate2LessDate1(dateString1, dateString2) {
  if (isValidDate(dateString1) && isValidDate(dateString2)) {
    const [day1, month1, year1] = getFullDateParts(dateString1);
    const inputDate1 = new Date(`${year1}/${month1}/${day1}`);

    const [day2, month2, year2] = getFullDateParts(dateString2);
    const inputDate2 = new Date(`${year2}/${month2}/${day2}`);

    return inputDate2 < inputDate1;
  }
  return false;
}
