import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [edit, setEdit] = useState({
    userName: "",
    pass: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!["admin", "user"].includes(edit.userName)) {
      return alert("Invalid user");
    }
    if (edit.pass !== "123") {
      return alert("Invalid password");
    }
    localStorage.setItem("role", edit.userName);
    navigate("/");
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            value={edit.userName}
            label={"Username"}
            onChange={(e) =>
              setEdit((p) => ({ ...p, userName: e.target.value }))
            }
          />
          <TextField
            value={edit.pass}
            label={"Password"}
            onChange={(e) => setEdit((p) => ({ ...p, pass: e.target.value }))}
          />
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
