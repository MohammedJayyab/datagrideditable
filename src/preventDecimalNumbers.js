import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const preventDecimalNumbers = (params, event) => {
  const newValue = event.target.value;
  if (newValue && newValue.includes(".")) {
    event.preventDefault();
    // Optionally, you can show an error message or provide feedback to the user
    console.log("Decimal numbers are not allowed.");
  }
};

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
    editable: true,
  },
];

const rows = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  { id: 3, name: "Bob Johnson", age: 35 },
];

const App = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellEditCommit={preventDecimalNumbers}
        // Additional props...
      />
    </div>
  );
};

export default App;
