function slice(str, length, ext) {
  if (length > 0 && str) {
    if (length >= str.length) return str;
    else {
      if (!ext) {
        return str.slice(0, length);
      } else return str.slice(0, length) + "...";
    }
  }
  return str;
}
function getKey(key1, key2) {
  return key1 + "-" + key2;
}
function replaceIf(str, condition, substr) {
  if (str === null || str === undefined) return "";
  if (str.toString().toLowerCase() === condition) return substr;
  return str;
}
function isEmpty(str) {
  if (!str) {
    return true;
  } else {
    return false;
  }
}
function getValue(str) {
  if (
    typeof str === "undefined" ||
    str === undefined ||
    str === null ||
    str === "" ||
    isNaN(parseInt(str))
  ) {
    return 0;
  }
  return parseInt(str);
}

function hasNumber(myString) {
  return /\d/.test(myString);
}
function containsNumberAndLetter(str) {
  const hasNumber = /\d/.test(str);
  const hasLetter = /[a-zA-Z]/.test(str);
  return hasNumber && hasLetter;
}

function RemoveComma(str) {
  var val = str.toString().replace(/,/g, "");
  //str = Number(str);

  return Number(val);
}
function getString(str) {
  if (
    typeof str === "undefined" ||
    str === undefined ||
    str === null ||
    str === ""
  ) {
    return "";
  }
  return str;
}

function isDate(str) {
  return !isNaN(Date.parse(str));
}

function showDateOnly(str) {
  return replaceIf(slice(str.toString(), 10), "0001-01-01", "");
  /*if (str.includes("T00:00:00")) return str.replace("T00:00:00", "");
  if (str.toString().toLowerCase() === "0001-01-01") return "";*/

  //return slice(str, 10, "");
}
function showDateOnlyFormatted(str) {
  if (str.includes("-")) {
    var currDate = showDateOnly(str);
    // 2023-10-25

    const [year, month, day] = currDate.split("-");
    return `${day}/${month}/${year}`;
  }
  return str;
}
function toUTC(date) {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

export function toJsonDateTime(date) {
  let newDate = new Date(date);
  let dateFormatted =
    newDate.getFullYear() +
    "-" +
    withZero(newDate.getMonth() + 1) +
    "-" +
    withZero(newDate.getDate()) +
    "T" +
    withZero(newDate.getHours()) +
    ":" +
    withZero(newDate.getMinutes()) +
    ":" +
    withZero(newDate.getSeconds()) +
    "Z";

  return dateFormatted;
}
function withZero(num) {
  if (num < 10) return "0" + num;
  return num;
}

function getFirstDayOfThisMonth() {
  let newDate = new Date();
  return newDate.getFullYear() + "-" + withZero(newDate.getMonth() + 1) + "-01";
}
function getToDay() {
  let newDate = new Date();
  return (
    newDate.getFullYear() +
    "-" +
    withZero(newDate.getMonth() + 1) +
    "-" +
    withZero(newDate.getDate())
  );
}

function getLastDayOfThisMonth() {
  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  //return new Date(y, m + 1, 0);

  let newDate = new Date(y, m + 1, 0);
  return (
    newDate.getFullYear() +
    "-" +
    withZero(newDate.getMonth() + 1) +
    "-" +
    newDate.getDate()
  );
}

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getColumnNames(columns) {
  return columns.map((column) => column.headerName);
}
function isNullOrWhiteSpace(str) {
  if (!str) {
    return true;
  } else {
    return false;
  }
}

export {
  slice,
  getKey,
  replaceIf,
  isEmpty,
  generateUUID,
  getString,
  getValue,
  hasNumber,
  containsNumberAndLetter,
  RemoveComma,
  showDateOnly,
  showDateOnlyFormatted,
  isDate,
  getToDay,
  getFirstDayOfThisMonth,
  getLastDayOfThisMonth,
  toUTC,
};
