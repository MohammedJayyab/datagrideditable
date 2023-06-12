import EditableDataTable from "./EditableDataTable";

function App() {
  const students = [
    { id: 1, studentName: "Dana Al-Shammari" },
    { id: 2, studentName: "Fahad Al-Sayed" },
    { id: 3, studentName: "Ali Al-Ali" },
  ];

  //const selectedStudents = [1, 2];
  const defaultStudents = [
    { id: 1, studentName: "ss" },
    { id: 3, studentName: "ss3" },
  ];
  const studentIds = defaultStudents.map((student) => student.id);
  const items = [
    { id: 1, text: "John Doe" },
    { id: 2, text: "Jane Smith" },
    { id: 3, text: "Michael Johnson" },
    { id: 4, text: "Emily Davis" },
    { id: 5, text: "David Brown" },
    { id: 6, text: "Olivia Wilson" },
    { id: 7, text: "Daniel Martinez" },
    { id: 8, text: "Sophia Anderson" },
    { id: 9, text: "Matthew Taylor" },
    { id: 10, text: "Ava Thomas" },
  ];
  return (
    <div>
      <button>Open Dialog</button>
      {/* <MyComponent students={students} selectedStudents={studentIds} /> */}
      {/* <MyComponent2></MyComponent2> */}
      {/* <ExampleGrid></ExampleGrid> */}
      {/* <ExampleEditCell></ExampleEditCell> */}
      {/* <StudentTreeView></StudentTreeView> */}
      {/* <TreeExample></TreeExample> */}
      {/* <EditableDataGrid></EditableDataGrid> */}
      {/* <EditableDataGrid2></EditableDataGrid2> */}
      {/* <BasicDataGrid></BasicDataGrid> */}
      {/* <SimpleDataGrid2></SimpleDataGrid2> */}
      {/* <CourseGrid></CourseGrid> */}
      {/* <Table></Table> */}
      {/* <EditableTable></EditableTable> */}

      <EditableDataTable></EditableDataTable>

      {/* <DropdownMenu items={items} /> */}
      {/* <button>Open Dialog</button> */}
      {/* <Example></Example> */}
      {/* <MyTable></MyTable> */}
    </div>
  );
}

export default App;
