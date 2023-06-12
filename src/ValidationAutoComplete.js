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
export function getDateRest(dateString) {
  if (hasSlashOrDot(dateString)) {
    var separator = getSeparator(dateString);
    const dateParts = dateString.split(separator); // separator = '/'   or '.'
    if (dateParts.length >= 2 && dateParts[1] !== "") {
      var day = dateParts[0].padStart(2, "0");
      if (day === "00") day = "01";
      const month = dateParts[1].padStart(2, "0");

      const year = new Date().getFullYear();

      return `${day}/${month}/${year}`;
    }
  }
}

export function formatDateWithZero(dateString) {
  const parts = dateString.split("/");
  if (parts.length === 3 && parts[2] !== "") {
    const day = parts[0].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[2];

    return `${day}/${month}/${year}`;
  }
  return dateString;
}

export function getFullDateIfValid(dateString) {
  if (isValidDate(dateString)) {
    var separator = getSeparator(dateString);
    const dateParts = dateString.split(separator); // separator = '/'   or '.'

    const day = dateParts[0].padStart(2, "0");
    const month = dateParts[1].padStart(2, "0");

    const year = new Date().getFullYear();
    return `${day}/${month}/${year}`;
  }
  return dateString;
}

export function getNextEndDate(dateString) {
  var separator = getSeparator(dateString);

  const dateParts = dateString.split(separator); // separator = '/'   or '.'

  const day = dateParts[0].padStart(2, "0");
  const month = dateParts[1].padStart(2, "0");

  const year = new Date().getFullYear();

  //const nextMonth = getNextMonth(month, year);
  const numDays = getNumDays(month, year);

  return `${numDays}/${month}/${year}`;
}

function getNumDays(month, year) {
  return new Date(year, month, 0).getDate();
}

function getNextMonth(month, year) {
  const date = new Date(year, month - 1);
  date.setMonth(date.getMonth() + 1);
  return date.getMonth() + 1;
}
function getNextYear(month, year) {
  const date = new Date(year, month - 1);
  date.setFullYear(date.getFullYear() + 1);
  return date.getFullYear();
}

// number

export function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

  return true;
}

export function isDateLessThanToDay(dateString) {
  if (isValidDate(dateString)) {
    var separator = getSeparator(dateString);
    const dateParts = dateString.split(separator); // separator = '/'   or '.'

    const day = dateParts[0].padStart(2, "0");
    const month = dateParts[1].padStart(2, "0");

    const year = new Date().getFullYear();
    const today = new Date();
    const inputDate = new Date(`${month}/${day}/${year}`);
    // Compare the input date with today's date
    return inputDate < today;
  }
  return false;
}
