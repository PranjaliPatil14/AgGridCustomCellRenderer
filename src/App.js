import React, { useState, useEffect } from "react";
import "./style.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community";
import ShowTodoStatus from "./ShowTodoStatus";
import ChangeTodoStatus from "./ChangeStatus";

export default function App() {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos", { mode: "cors" })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        setRowData(jsonResponse);
      });
  }, []);

  const columnData = [
    {
      headerName: "Title",
      field: "title",
      minWidth: 350
    },
    {
      headerName: "Completed",
      field: "completed",
      cellRendererFramework: ShowTodoStatus,
      cellEditorFramework: ChangeTodoStatus
    }
  ];

  const defaultConfigs = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: true
  };

  return (
    <div style={{ height: "100vh", width: "100%" }} className="ag-theme-alpine">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnData}
        defaultColDef={defaultConfigs}
        rowClassRules={{
          "strike-through": params => !!params.data.completed
        }}
      />
    </div>
  );
}
