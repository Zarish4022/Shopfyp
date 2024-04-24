import "./userList.css";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { userRequest } from "../../requestMethods";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users");
        // Rename `_id` to `id` for compatibility with DataGrid
        const updatedUsers = res.data.map((user) => ({
          ...user,
          id: user._id,
        }));
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
        <div className="userListUser">{params.row.username}</div>
      ),
    },
    { field: "email", headerName: "Email", width: 250 }, // Add this line
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <DeleteOutline
            user={users}
            className="userListDelete"
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
        rowHeight={50} // Adjust row height as needed
      />
    </div>
  );
}
