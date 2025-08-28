import React from "react";
import "./App.css";
import { InputField } from "./components/InputField";
import { Button } from "./components/Button";
import { DataTable, Column } from "./components/DataTable";

// Define the data type for rows
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Tanmay", email: "tanmay@example.com" },
  { id: 2, name: "Alice", email: "alice@example.com" },
   { id: 3, name: "Bob", email: "bob@example.com" },
];


const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

function App() {
  const handleSelection = (rows: User[]) => {
    console.log("Selected rows:", rows);
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Group inputs with spacing */}
      <div className="space-y-5">
        <InputField
          label="Username"
          placeholder="Enter your username"
          helperText="This will be your login name"
        />
        <InputField
          label="Email"
          placeholder="Enter your email"
          invalid
          errorMessage="Invalid email format"
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <InputField
          label="Search"
          placeholder="Search something..."
          clearable
        />
        <InputField
          label="Disabled"
          placeholder="Can't type here"
          disabled
        />
        <InputField
          label="Loading State"
          placeholder="Please wait..."
          loading
        />
      </div>

      {/* Button with margin from inputs */}
      <div className="mt-6">
        <Button>Submit</Button>
      </div>

      {/* DataTable with margin from button */}
      <div className="mt-8">
        <DataTable
          data={users}
          columns={columns}
          selectable
          onRowSelect={(rows) => console.log("Selected:", rows)}
        />
      </div>
    </div>
  );
}

export default App;
