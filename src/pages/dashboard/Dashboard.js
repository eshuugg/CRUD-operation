import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { v4 } from "uuid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { findAllByTestId } from "@testing-library/react";
import Box from "@mui/material/Box";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  // const classes = useStyle();
  const [rows, setRows] = useState([]);
  const [model, setModel] = useState(false);
  const [edit, setEdit] = useState({
    name: "",
    useName: "",
  });

  const onAdd = (data) => {
    setRows((p) => [{ id: v4(), ...data }, ...p]);
  };

  const onDelete = (id) => {
    setRows((p) => p.filter((item) => item.id !== id));
  };

  const onEdit = (id, data) => {
    setRows((p) => p.map((item) => (item.id === id ? data : item)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof model === "string") {
      onEdit(model, edit);
    } else {
      onAdd(edit);
    }
    setEdit({
      name: "",
      useName: "",
    });
    setModel(false);
  };

  return (
    <>
      <Button onClick={() => setModel(true)}>Add</Button>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, marginTop: 15 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.userName}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => {
                      setEdit({ name: row.name, userName: row.userName });
                      setModel(row.id);
                    }}
                  >
                    Edit
                  </Button>
                  {localStorage.getItem("role") === "admin" ? (
                    <Button onClick={() => onDelete(row.id)}>Delete</Button>
                  ) : null}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={model}
        onClose={() => setModel(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <TextField
              value={edit.name}
              label={"Name"}
              onChange={(e) => setEdit((p) => ({ ...p, name: e.target.value }))}
            />
            <TextField
              value={edit.userName}
              label={"USername"}
              onChange={(e) =>
                setEdit((p) => ({ ...p, userName: e.target.value }))
              }
            />
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
