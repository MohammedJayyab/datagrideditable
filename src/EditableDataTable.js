import { getString, getValue, showDateOnlyFormatted } from "./Common/Utility";
import "./EditableDataTable.css";
import "./OptionSelect.css";
import "./Button.css";
import React, { useState, useRef, useEffect } from "react";
import {
  getFormattedDate,
  getNextEndDate,
  getWeeks,
  increaseDateByOneDay,
  isDate2LessDate1,
  isDateLessThanToDay,
  isValidDate,
} from "./ValidationAutoComplete";
import { Key } from "@mui/icons-material";

const EditableTable = () => {
  const [data, setData] = useState([
    {
      id: 320,
      branchId: 2,
      studentId: 50,
      courseId: 4,
      priceId: 2,
      teacherId: 1,
      dateFrom: "2023-01-30T00:00:00",
      dateTo: "2023-08-31T00:00:00",
      numberHours: 25,
      numberHoursWeekly: 2,
    },
    {
      id: 323,
      branchId: 2,
      studentId: 50,
      courseId: 4,
      priceId: 1,
      teacherId: 2,
      dateFrom: "2023-05-01T00:00:00",
      dateTo: "2023-05-12T00:00:00",
      numberHours: 2,
      numberHoursWeekly: 3,
    },
  ]);
  const teachers = [
    { id: 1, teacherName: "Teacher 1" },
    { id: 2, teacherName: "Teacher 2" },
    { id: 3, teacherName: "Teacher 3" },
    { id: 4, teacherName: "Teacher 4" },
    { id: 5, teacherName: "Teacher 5" },
    { id: 6, teacherName: "Teacher 6" },
    { id: 7, teacherName: "Teacher 7" },
    { id: 8, teacherName: "Teacher 8" },
    { id: 9, teacherName: "Teacher 9" },
    { id: 10, teacherName: "Teacher 10" },
    { id: 11, teacherName: "Teacher 11" },
    { id: 12, teacherName: "Teacher 12" },
    { id: 13, teacherName: "Teacher 13" },
    { id: 14, teacherName: "Teacher 14" },
    { id: 15, teacherName: "Teacher 15" },
    { id: 16, teacherName: "Teacher 16" },
    { id: 17, teacherName: "Teacher 17" },
    { id: 18, teacherName: "Teacher 18" },
    { id: 19, teacherName: "Teacher 19" },
    { id: 20, teacherName: "Teacher 20" },
    { id: 21, teacherName: "Teacher 21" },
    { id: 22, teacherName: "Teacher 22" },
    { id: 23, teacherName: "Teacher 23" },
    { id: 24, teacherName: "Teacher 24" },
  ];
  const prices = [
    { id: 1, priceName: "E (32)" },
    { id: 2, priceName: "G (24)" },
  ];

  let branchId = 1,
    studentId = 50,
    courseId = 4;

  let IsEscPressed = false;

  const inputRefs = useRef([]);
  const tableRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [lastValue, setLastValue] = useState("");
  const [lastIdValue, setLastIdValue] = useState("");
  useEffect(() => {
    maintainDate();

    handleAdd();
  }, []); // comment

  function maintainDate() {
    data.map((record) => {
      record.dateFrom = showDateOnlyFormatted(record.dateFrom);
      record.dateTo = showDateOnlyFormatted(record.dateTo);
    });
  }
  const handleKeyDownSelect = (event, rowIndex, colIndex) => {
    if (
      (event.key === "Tab" ||
        event.key === "Enter" ||
        event.key === "ArrowRight") &&
      event.target.name === "priceId"
    ) {
      //event.preventDefault();
      if (!isEmptyRow(rowIndex)) {
        event.preventDefault();
        handleAdd();
      } else {
        event.preventDefault();
        const rowsCount = tableRef.current.rows.length;
        if (rowsCount - 1 === rowIndex) {
          inputRefs.current[rowIndex][0]?.focus();
          inputRefs.current[rowIndex][0]?.select();
        }

        inputRefs.current[rowIndex + 1][0]?.focus();
        inputRefs.current[rowIndex + 1][0]?.select();
      }
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      inputRefs.current[rowIndex][colIndex - 1]?.focus();
      let component = inputRefs.current[rowIndex][colIndex - 1];
      if (!component?.innerHTML.includes("option"))
        inputRefs.current[rowIndex][colIndex - 1]?.select();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      inputRefs.current[rowIndex][colIndex + 1]?.focus();
      let component = inputRefs.current[rowIndex][colIndex + 1];
      if (!component?.innerHTML.includes("option"))
        inputRefs.current[rowIndex][colIndex + 1]?.select();
    } else if (event.key === "Enter") {
      event.preventDefault();
      inputRefs.current[rowIndex][colIndex + 1]?.focus();
      let component = inputRefs.current[rowIndex][colIndex + 1];
      if (!component?.innerHTML.includes("option"))
        inputRefs.current[rowIndex][colIndex + 1]?.select();
    }
  };

  const handleKeyDown = (event, rowIndex, colIndex, id) => {
    const { key, target } = event;
    if (IsEscPressed) {
      target.select();
      IsEscPressed = false;
    }
    var chars = '!"§$%&/()=?``.,°^+-*=@#<>|{[]}';
    var charsDate = '!"§$%&()=?``,°^+-*=@#<>|{[]}';
    console.log(Key);
    target.style.caretColor = "";
    if (
      event.target.name === "numberHours" ||
      event.target.name === "numberHoursWeekly" ||
      event.target.name === "dateFrom" ||
      event.target.name === "dateTo"
    ) {
      if (
        chars.includes(key) &&
        (event.target.name === "numberHours" ||
          event.target.name === "numberHoursWeekly")
      ) {
        //else
        event.preventDefault();
        return;
      } else if (
        charsDate.includes(key) &&
        (event.target.name === "dateFrom" || event.target.name === "dateTo")
      ) {
        //else
        event.preventDefault();
        return;
      } else if (
        event.keyCode === 46 ||
        event.keyCode === 8 ||
        event.keyCode === 9 ||
        (event.keyCode === 17) | (event.keyCode === 67) ||
        (event.keyCode === 17) | (event.keyCode === 86) ||
        (event.keyCode === 17) | (event.keyCode === 88) ||
        event.keyCode === 35 ||
        event.keyCode === 36 ||
        event.keyCode === 13 ||
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode === 37 ||
        event.keyCode === 38 ||
        event.keyCode === 39 ||
        event.keyCode === 40 ||
        ((event.keyCode === 111 || event.keyCode === 190) &&
          (event.target.name === "dateFrom" || event.target.name === "dateTo"))
      ) {
      } else {
        event.preventDefault();
      }
    }
    switch (key) {
      case "ArrowUp":
        if (rowIndex > 1) {
          inputRefs.current[rowIndex - 1][colIndex]?.focus();
          inputRefs.current[rowIndex - 1][colIndex]?.select();
          IsEscPressed = false;
        }
        break;
      case "ArrowDown":
        if (!isEmptyRow(rowIndex)) {
          handleAdd();
          event.preventDefault();
        } else if (rowIndex < data.length) {
          inputRefs.current[rowIndex + 1][colIndex]?.focus();
          inputRefs.current[rowIndex + 1][colIndex]?.select();
          IsEscPressed = false;
        }
        break;
      case "ArrowLeft":
        console.log("target.selectionStart ==> ", target.selectionStart);
        console.log("target.selectionEnd ==> ", target.selectionEnd);
        if (target.selectionStart === 0 && target.selectionEnd === 0) {
          if (colIndex > 0) {
            inputRefs.current[rowIndex][colIndex - 1]?.focus();
            let component = inputRefs.current[rowIndex][colIndex - 1];
            if (!component?.innerHTML.includes("option"))
              inputRefs.current[rowIndex][colIndex - 1]?.select();
            IsEscPressed = false;
          } else {
            tableRef.current.rows[rowIndex].cells[0].focus();
            console.log("target.selectionEnd ==> ", target.selectionEnd);
            setSelectedRow(rowIndex);
          }
        }

        break;
      case "ArrowRight":
        if (
          IsEscPressed ||
          (target.selectionStart === target.value.length &&
            target.selectionEnd === target.value.length)
        ) {
          if (colIndex < 5) {
            inputRefs.current[rowIndex][colIndex + 1]?.focus();
            let component = inputRefs.current[rowIndex][colIndex + 1];
            if (!component?.innerHTML.includes("option"))
              inputRefs.current[rowIndex][colIndex + 1]?.select();
            IsEscPressed = false;
          }
        }

        break;
      case "F2":
        target.focus();
        target.setSelectionRange(0, 0); // Set cursor at the beginning
        IsEscPressed = false;
        break;

      case "Escape":
        // if (IsEscPressed) return;
        target.focus();
        target.style.caretColor = "transparent";
        target.setSelectionRange(0, 0);

        IsEscPressed = true;
        target.value = lastValue;
        let item = data.find((item) => item.id === id);
        var propertyName = target.name;
        item[propertyName] = lastValue;

        break;
      case "Enter":
        if (IsEscPressed) {
          target.focus();
          //target.setSelectionRange(0, 0); // Set cursor at the beginning
          //target.select();
          IsEscPressed = false;
          break;
        }
        event.preventDefault();
        var nextRowIndex = rowIndex;
        var nextColIndex = colIndex;
        if (nextColIndex === 7) {
          nextColIndex = 0;
          nextRowIndex = rowIndex + 1;
        } else nextColIndex = colIndex + 1;
        if (nextRowIndex <= data.length) {
          setTimeout(() => {
            inputRefs.current[nextRowIndex][nextColIndex]?.focus();
            var component = inputRefs.current[rowIndex][colIndex + 1];
            if (!component?.innerHTML.includes("option"))
              inputRefs.current[nextRowIndex][nextColIndex]?.select();
          }, 0);
        }
        break;

      default:
        target.style.caretColor = ""; // Show the cursor
        IsEscPressed = false;

        break;
    }
  };

  function handleCellChange(event, id, property, content) {
    var { value } = event.target;
    if (content) {
      value = content;
    }
    var propToSet = event.target.name;
    if (property) propToSet = property;
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [propToSet]: value,
          };
        }
        return item;
      });
    });
  }

  const handleCellClick = (event) => {
    //event.target.select();
    // writeCellValue(data.length - 1);
  };

  function handleCellFocus(event, rowIndex, id) {
    var ID = tableRef.current?.rows[rowIndex]?.cells[1]?.innerText;
    console.log(
      "Value: ",
      lastValue + " id:" + ID,
      "#",
      event.target.value + " id:" + ID
    );
    if (lastIdValue === event.target.value + ID && lastValue.length > 0) {
      console.log(lastValue + ID, "#", event.target.value + ID);
      if (event.target.tagName === "SELECT") {
        event.target.focus();
      } else {
        event.target.select();
      }
      return;
    }
    writeCellValue(rowIndex);
    setLastValue(event.target.value);
    setLastIdValue(event.target.value + ID);
    if (event.target.name === "dateTo") {
      var item = data.find((item) => item.id === id);

      if (isValidDate(item.dateFrom) && getString(item.dateTo.trim()) === "") {
        var nextDate = getNextEndDate(item.dateFrom);
        handleCellChange(event, id, event.target.name, nextDate);
      } else {
        //  event.target.focus();
      }
    }

    requestAnimationFrame(() => {
      if (event.target.tagName === "SELECT") {
        event.target.focus();
      } else {
        event.target.select();
      }
    });
  }

  function handleCellLostFocusDate(event, id, rowIndex) {
    var value = event.target.value;
    if (value) {
      if (!isValidDate(value) && (value.includes("/") || value.includes("."))) {
        var result = getFormattedDate(value);
        if (typeof result === "undefined") return; // return false and set color red as error

        if (event.target.name === "dateFrom") {
          let item = data.find((item) => item.id === id);
          item.dateFrom = result;
        } else if (event.target.name === "dateTo") {
          let item = data.find((item) => item.id === id);
          item.dateTo = result;
        }

        //tableRef.current.rows[rowIndex].cells[2].innerText = result;
      }
      var resultDate = getFormattedDate(value);
      if (typeof resultDate === "undefined") {
        event.target.style.color = "red";
        event.target.focus();
        return;
      }
      //resultDate = formatDateWithZero(resultDate);

      if (event.target.name === "dateTo") {
        if (isDateLessThanToDay(resultDate)) {
          event.target.style.color = "red";
        } else {
          event.target.style.color = "black";
        }

        let lastDateFrom = inputRefs.current[rowIndex][0];

        if (lastDateFrom && isDate2LessDate1(lastDateFrom.value, resultDate)) {
          event.target.style.backgroundColor = "rgb(165, 42, 42)";

          lastDateFrom.style.backgroundColor = "rgb(246, 123, 123)";
        } else {
          event.target.style.backgroundColor = "transparent";
          lastDateFrom.style.backgroundColor = "transparent";
        }
        //
        var currItem = findItemById(id);
        if (
          getValue(currItem.numberHours) === 0 &&
          getValue(currItem.numberHoursWeekly) === 0 &&
          getValue(currItem.teacherId) === 0 &&
          getValue(currItem.priceId) === 0
        ) {
          var lastItem = getBeforeLastItem(id);
          if (lastItem && id.toString().includes("*")) {
            setData((prevData) => {
              return prevData.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    numberHours: getValue(lastItem.numberHours),
                    numberHoursWeekly: getValue(lastItem.numberHoursWeekly),
                    teacherId: lastItem.teacherId,
                    priceId: lastItem.priceId,
                  };
                }
                return item;
              });
            });
            return;
          }
        }
      }
    }
  }
  function handleCellLostFocusHoursWeekly(event, rowIndex) {
    const spanName = "numberHoursSpan" + rowIndex;
    const spanElement = document.querySelector('span[name="' + spanName + '"]');

    let numHoursDefault = inputRefs.current[rowIndex][2];
    if (!numHoursDefault) return;
    let numHoursDefaultValue = getValue(numHoursDefault.value);

    let numHoursWeekly = showNumberOfHoursAsToolTip(event, rowIndex);
    if (
      numHoursDefaultValue !== numHoursWeekly &&
      numHoursWeekly !== 0 &&
      numHoursDefaultValue !== 0
    ) {
      numHoursDefault.style.backgroundColor = "rgb(240, 230, 140)";
      if (spanElement) {
        spanElement.classList.add("tooltip");
        spanElement.setAttribute(
          "title",
          "\u00A0\u00A0" + numHoursWeekly.toString() + "\u00A0\u00A0"
        );
        //class="tooltip"
        //spanElement.classList.add("tooltip");
      }
      //numHoursDefault.title = numHoursWeekly;
    } else {
      numHoursDefault.style.backgroundColor = "transparent";
      spanElement.removeAttribute("title");
      spanElement.classList.remove("tooltip");
    }
  }
  function showNumberOfHoursAsToolTip(event, rowIndex) {
    let lastDateFrom = inputRefs.current[rowIndex][0];
    let lastDateTo = inputRefs.current[rowIndex][1];
    let numWeeks = getWeeks(lastDateFrom.value, lastDateTo.value);
    return event.target.value * numWeeks;
  }

  function getBeforeLastItem(id) {
    if (typeof id === "undefined") return null;
    var NewId = getValue(id.toString().replace("*", 0)) - 1;
    const itemWithMaxId = data.reduce((prev, current) => {
      return getValue(prev.id.toString().replace("*", 0)) === NewId
        ? prev
        : current;
    });
    if (itemWithMaxId) {
      return itemWithMaxId;
    }
    return null;
  }
  function getLastItem() {
    const itemWithMaxId = data.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    });
    if (itemWithMaxId) {
      return itemWithMaxId;
    }
    return null;
  }

  function findItemById(id) {
    return data.find((item) => item.id === id);
  }
  function handlePrintAll() {
    data.map((item, index) => {
      console.log("Item", index + 1, ":", item);
    });
  }
  function handleAdd() {
    var lastDateTo = "",
      DateFrom = "";

    const itemWithMaxId = getLastItem();
    if (itemWithMaxId) {
      lastDateTo = itemWithMaxId.dateTo;
      DateFrom = increaseDateByOneDay(lastDateTo);
    }
    var newId = getMaxId() + 1;
    setData([
      ...data,
      {
        id: "*" + newId.toString(),
        branchId,
        studentId,
        courseId,
        dateFrom: DateFrom,
        dateTo: "",
        numberHours: "",
        numberHoursWeekly: "",
        teacherId: 0,
        priceId: 0,
      },
    ]);
  }

  function getMaxId() {
    const maxId = data.reduce((max, item) => {
      const itemId =
        typeof item.id === "string" ? item.id.replace("*", "0") : item.id;
      const numericId = Number(itemId);
      return numericId > max ? numericId : max;
    }, 0);

    return maxId;
  }

  // write
  function writeCellValue(rowIndex) {
    if (selectedRow !== []) setSelectedRow([]);
    console.log("write Cell:  Index:", rowIndex);

    if (rowIndex === 0 || rowIndex > data.length) return;
    var currentRow = tableRef.current?.rows[rowIndex];
    console.log("write Cell:  currentRow:", currentRow);

    for (let index = 0; index < (tableRef.current?.rows.length || 0); index++) {
      if (tableRef.current?.rows[index]?.cells[0]) {
        tableRef.current.rows[index].cells[0].innerText = ""; //"&rarr;"
      }
    }

    if (tableRef.current?.rows[rowIndex]?.cells[0]) {
      tableRef.current.rows[rowIndex].cells[0].innerHTML =
        '<span class="arrow-icon"></span>'; //"&rarr;"
    }

    var lastCell = tableRef.current?.rows[rowIndex]?.cells[1];
    if (tableRef.current?.rows[rowIndex]?.cells[0]) {
      // if new Added
      console.log(
        "###############lastCell.Text=",
        getValue(lastCell.innerText)
      );
      if (getValue(lastCell.innerText) === 0) {
        tableRef.current.rows[rowIndex].cells[0].innerHTML = "&#9658;&#9733";
        tableRef.current.rows[rowIndex].cells[0].classList.add("arrow-icon-2");
      }
    }
  }
  const handleCellFirstColumnClick = (rowIndex) => {
    writeCellValue(rowIndex);
    setSelectedRow(rowIndex === selectedRow ? null : rowIndex);
    console.log("rowIndex Click: ", rowIndex);
  };
  function handleKeyDownAndDelete(e, rowIndex) {
    if (e.key === "Delete" && selectedRow !== null) {
      console.log("Delete pressed");
      if (selectedRow !== null && selectedRow !== []) {
        removeSelectedRow();
        if (rowIndex === 1) {
          rowIndex = 1;
          writeCellValue(rowIndex + 1);
          setSelectedRow(rowIndex);
        } else {
          writeCellValue(rowIndex - 1);
          setSelectedRow(rowIndex - 1);
        }
        var firstCell = tableRef.current?.rows[rowIndex - 1]?.cells[0];
        if (rowIndex === 1)
          firstCell = tableRef.current?.rows[rowIndex + 1]?.cells[0];
        if (firstCell) {
          firstCell.focus();
        }
      }
    } else if (e.key === "ArrowUp" && rowIndex > 1) {
      console.log("rowIndex:", rowIndex);
      var currentRow = tableRef.current?.rows[rowIndex];
      console.log(currentRow);
      writeCellValue(rowIndex - 1);
      setSelectedRow(rowIndex - 1);

      const firstCell = tableRef.current?.rows[rowIndex - 1]?.cells[0];
      const secCell = tableRef.current?.rows[rowIndex - 1]?.cells[1];
      console.log("secCell: at  ", rowIndex - 1, "= ", secCell.innerText);
      if (firstCell) {
        firstCell.focus();
      }
    } else if (
      e.key === "ArrowDown" &&
      rowIndex < (tableRef.current?.rows.length - 1 || 0)
    ) {
      console.log("rowIndex:", rowIndex);

      console.log(currentRow);
      writeCellValue(rowIndex + 1);
      setSelectedRow(rowIndex + 1);

      const firstCell = tableRef.current?.rows[rowIndex + 1]?.cells[0];
      const secCell = tableRef.current?.rows[rowIndex + 1]?.cells[1];
      console.log("secCell: at  ", rowIndex + 1, "= ", secCell?.innerText);
      if (firstCell) {
        firstCell.focus();
      }
    }
    // to put cursor next the editable cell
    else if (e.key === "ArrowRight") {
      setSelectedRow([]);

      const firstCell = tableRef.current?.rows[rowIndex]?.cells[2];

      console.log("firstCell: at  ", rowIndex, "= ", firstCell?.innerText);
      if (firstCell) {
        firstCell.focus();
        inputRefs.current[rowIndex][0]?.focus();
        inputRefs.current[rowIndex][0]?.select();
      }
    }
  }
  const removeSelectedRow = () => {
    setData((prevData) =>
      prevData.filter((row, index) => index + 1 !== selectedRow)
    );
    console.log("data: ", data);
    setSelectedRow([]);
  };

  function isEmptyRow(rowIndex) {
    const rowsCount = tableRef.current.rows.length;
    if (rowsCount - 1 !== rowIndex) return true;
    const row = tableRef.current.rows[rowIndex];
    var countEmpty = 0;
    for (let i = 2; i < row.cells.length; i++) {
      const inputElement = row.cells[i];
      const value = inputElement.querySelector("input")?.value;
      const selectElementValue = inputElement.querySelector("select")?.value;
      if (typeof value != "undefined" && value.trim() === "") {
        countEmpty = countEmpty + 1;
      }
      if (
        typeof selectElementValue != "undefined" &&
        selectElementValue.trim() === ""
      ) {
        countEmpty = countEmpty + 1;
      }
    }
    const lastRow = tableRef.current.rows[tableRef.current.rows.length - 1];
    var lastRowCountEmpty = 0;
    for (let i = 2; i < row.cells.length; i++) {
      const inputElement = lastRow.cells[i];
      const value = inputElement.querySelector("input")?.value;
      const selectElementValue = inputElement.querySelector("select")?.value;
      if (typeof value != "undefined" && value.trim() === "") {
        lastRowCountEmpty = lastRowCountEmpty + 1;
      }
      if (
        typeof selectElementValue != "undefined" &&
        selectElementValue.trim() === ""
      ) {
        lastRowCountEmpty = lastRowCountEmpty + 1;
      }
    }
    if (lastRowCountEmpty > 0) return true; // no Empty
    return countEmpty > 0 ? true : false; // true if no empty
  }
  function RemoveAllEmptyItems() {
    const filteredData = data.filter(
      (item) =>
        item.dateFrom.trim() !== "" ||
        item.dateTo.trim() !== "" ||
        getValue(item.priceId.toString()) !== 0 ||
        getValue(item.teacherId.toString()) !== 0 ||
        getValue(item.numberHours.toString().trim()) !== 0 ||
        getValue(item.numberHoursWeekly.toString().trim()) !== 0
    );
    setData(filteredData);
  }
  function IsValidItems() {
    var isValid = true;
    data.forEach((item, index) => {
      var row = tableRef.current.rows[index + 1];
      const dateFrom = row.cells[2].querySelector("input");
      const dateTo = row.cells[3].querySelector("input");
      const numHours = row.cells[4].querySelector("input");
      const numHoursWeekly = row.cells[5].querySelector("input");
      const teacherId = row.cells[6].querySelector("select");
      const priceId = row.cells[7].querySelector("select");

      dateFrom.style.backgroundColor = "transparent";
      dateTo.style.backgroundColor = "transparent";
      numHours.style.backgroundColor = "transparent";
      numHoursWeekly.style.backgroundColor = "transparent";
      teacherId.style.backgroundColor = "transparent";
      priceId.style.backgroundColor = "transparent";

      if (item.dateFrom.trim() === "" || !isValidDate(item.dateFrom)) {
        if (dateFrom) dateFrom.style.backgroundColor = "yellow";
        isValid = false;
      }
      if (
        item.dateTo.trim() === "" ||
        !isValidDate(item.dateTo) ||
        isDate2LessDate1(item.dateFrom, item.dateTo)
      ) {
        if (dateTo) dateTo.style.backgroundColor = "yellow";
        isValid = false;
      }
      if (getValue(item.numberHours) <= 0) {
        if (numHours) numHours.style.backgroundColor = "yellow";
        isValid = false;
      }
      if (getValue(item.numberHoursWeekly) <= 0) {
        if (numHoursWeekly) numHoursWeekly.style.backgroundColor = "yellow";
        isValid = false;
      }
      if (getValue(item.teacherId) === 0) {
        if (teacherId) teacherId.style.backgroundColor = "yellow";
        isValid = false;
      }
      if (getValue(item.priceId) === 0) {
        if (priceId) priceId.style.backgroundColor = "yellow";
        isValid = false;
      }
    });
    return isValid;
  }
  function handleCheckAll() {
    RemoveAllEmptyItems();
    IsValidItems();
  }

  function handleSave() {
    RemoveAllEmptyItems();
    if (IsValidItems()) {
      // parse data, convert to date yyyy-mm-dd , integer : 01 --> 1
      // Do Save API
    }
  }

  return (
    <div className="containers">
      <div>
        <button className="button" onClick={handleAdd}>
          Add
        </button>
        <button className="button" onClick={handlePrintAll}>
          PrintAll
        </button>
        <button className="button" onClick={handleCheckAll}>
          Check
        </button>
        <button className="button" onClick={handleSave}>
          Save
        </button>
      </div>
      <br />
      <table id="table" className="tablex" ref={tableRef}>
        <thead className="solid-header">
          <tr>
            <th></th>
            <th style={{ display: "none" }}>ID</th>
            <th>Von</th>
            <th>Zum</th>
            <th>Anzahl(Std)</th>
            <th>W/S</th>
            <th>Lehrer</th>
            <th>E/G (€)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const rowIndex = index + 1;
            inputRefs.current[rowIndex] = [];

            return (
              <tr
                key={item.id}
                // onClick={() => handleDoubleClick(rowIndex)}
                className={rowIndex === selectedRow ? "selected" : ""}
              >
                <td
                  className="cell-header"
                  tabIndex={0}
                  style={{ width: "55px", cursor: "pointer" }}
                  onClick={() => handleCellFirstColumnClick(rowIndex)}
                  onKeyDown={(event) => handleKeyDownAndDelete(event, rowIndex)}
                ></td>
                <td style={{ display: "none" }}>{item.id}</td>
                <td>
                  <input
                    autoFocus={index === data.length - 1}
                    name="dateFrom"
                    className="editable-cell"
                    style={{ width: "80px" }}
                    ref={(ref) => (inputRefs.current[rowIndex][0] = ref)}
                    type="text"
                    value={item.dateFrom}
                    autoComplete="off"
                    onChange={(event) => handleCellChange(event, item.id)}
                    onKeyDown={(event) =>
                      handleKeyDown(event, rowIndex, 0, item.id)
                    }
                    onClick={handleCellClick}
                    onFocus={(event) =>
                      handleCellFocus(event, rowIndex, item.id)
                    }
                    onBlur={(event) =>
                      handleCellLostFocusDate(event, item.id, rowIndex)
                    }
                    onDragStart={(e) => {
                      e.preventDefault();
                    }}
                    // onSelect={(event) => handleSelect(event)}
                  />
                </td>
                <td>
                  <input
                    name="dateTo"
                    className="editable-cell"
                    style={{ width: "80px" }}
                    ref={(ref) => (inputRefs.current[rowIndex][1] = ref)}
                    type="text"
                    value={item.dateTo}
                    autoComplete="off"
                    onChange={(event) => handleCellChange(event, item.id)}
                    onKeyDown={(event) =>
                      handleKeyDown(event, rowIndex, 1, item.id)
                    }
                    onClick={handleCellClick}
                    onFocus={(event) =>
                      handleCellFocus(event, rowIndex, item.id)
                    }
                    onBlur={(event) =>
                      handleCellLostFocusDate(event, item.id, rowIndex)
                    }
                    onDragStart={(e) => {
                      e.preventDefault();
                    }}
                  />
                </td>
                <td>
                  <span name={"numberHoursSpan" + rowIndex}>
                    <input
                      className="editable-cell"
                      name="numberHours"
                      style={{ width: "110px" }}
                      autoComplete="off"
                      ref={(ref) => (inputRefs.current[rowIndex][2] = ref)}
                      value={item.numberHours}
                      onChange={(event) => handleCellChange(event, item.id)}
                      onKeyDown={(event) =>
                        handleKeyDown(event, rowIndex, 2, item.id)
                      }
                      onClick={handleCellClick}
                      onFocus={(event) =>
                        handleCellFocus(event, rowIndex, item.id)
                      }
                      onDragStart={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </span>
                </td>
                <td>
                  <input
                    name="numberHoursWeekly"
                    className="editable-cell"
                    style={{ width: "50px" }}
                    autoComplete="off"
                    ref={(ref) => (inputRefs.current[rowIndex][3] = ref)}
                    type="text"
                    value={item.numberHoursWeekly}
                    onChange={(event) =>
                      handleCellChange(event, item.id, "numberHoursWeekly")
                    }
                    onKeyDown={(event) =>
                      handleKeyDown(event, rowIndex, 3, item.id)
                    }
                    onClick={handleCellClick}
                    onFocus={(event) =>
                      handleCellFocus(event, rowIndex, item.id)
                    }
                    onBlur={(event) =>
                      handleCellLostFocusHoursWeekly(event, rowIndex)
                    }
                    onDragStart={(e) => {
                      e.preventDefault();
                    }}
                  />
                </td>
                <td>
                  <select
                    autoComplete="on"
                    name="teacherId"
                    className="custom-select"
                    style={{ width: "200px", cursor: "pointer" }}
                    //onChange={(e) => handleCityChange(index, e)}
                    onChange={(event) => handleCellChange(event, item.id)}
                    value={item.teacherId}
                    ref={(ref) => (inputRefs.current[rowIndex][4] = ref)}
                    onFocus={(event) =>
                      handleCellFocus(event, rowIndex, item.id)
                    }
                    onKeyDown={(event) =>
                      handleKeyDownSelect(event, rowIndex, 4)
                    }
                  >
                    <option value=""></option>
                    {teachers.map((teacher) => {
                      return (
                        <option
                          id={teacher.id}
                          key={teacher.id}
                          value={teacher.id}
                          label={teacher.teacherName}
                        >
                          {teacher.id}
                        </option>
                      );
                    })}
                  </select>
                </td>

                <td>
                  <select
                    name="priceId"
                    className="custom-select"
                    style={{ width: "90px", cursor: "pointer" }}
                    //onChange={(e) => handleCityChange(index, e)}
                    onChange={(event) => handleCellChange(event, item.id)}
                    value={item.priceId}
                    ref={(ref) => (inputRefs.current[rowIndex][5] = ref)}
                    onFocus={(event) =>
                      handleCellFocus(event, rowIndex, item.id)
                    }
                    onKeyDown={(event) =>
                      handleKeyDownSelect(event, rowIndex, 5)
                    }
                  >
                    <option value=""></option>
                    {prices.map((price) => {
                      return (
                        <option
                          id={price.id}
                          key={price.id}
                          value={price.id}
                          label={price.priceName}
                        >
                          {price.id}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
