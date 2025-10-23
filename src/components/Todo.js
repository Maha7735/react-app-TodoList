import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { TodoContext } from "../contexts/todoContext";
import TextField from "@mui/material/TextField";
import { ToastContext } from "../contexts/ToastContext";
// DIALOG IMPORTS
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo({ todo }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodoContext);
  const { showHideToast } = useContext(ToastContext);

  //   HANDLE EVENTS
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    const updatedTodo = updatedTodos.find((t) => t.id === todo.id);

    if (updatedTodo.isCompleted) {
      showHideToast("Task marked as completed!");
    } else {
      showHideToast("Task marked as incomplete.");
    }
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleDeleteModalClose() {
    setShowDeleteDialog(false);
  }
  function handleUpdateModalClose() {
    setShowUpdateDialog(false);
  }
  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id != todo.id);

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
    showHideToast("Task deleted successfully");
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      }
      return t;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateDialog(false);
    showHideToast("Task updated successfully");
  }
  //  ==== HANDLE EVENTS ====
  return (
    <>
      {/* DELETE MODAL */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete the task ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo the deletion once it is completed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose}>Close</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* === DELETE MODAL === */}
      {/* UPDATE MODAL */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Task </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Task title"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateModalClose}>Close</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* === UPDATE MODAL === */}
      <Card
        className="todoCard"
        sx={{
          marginTop: "10px",
          minWidth: 275,
          color: "white",
          backgroundColor: "#2a1b9a",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{ textAlign: "left", fontFamily: "mainFont" }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ textAlign: "left", fontFamily: "mainFont" }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* ACTION BUTTONS */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="check"
                style={{
                  height: "37px",
                  width: "37px",
                  color: todo.isCompleted ? "white" : "#4CAF50",
                  border: "solid 1px #4CAF50 ",
                  backgroundColor: todo.isCompleted ? "#4CAF50" : "white",
                  borderRadius: "50%",
                }}
              >
                <DoneSharpIcon />
              </IconButton>
              <IconButton
                open={showUpdateDialog}
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="edit"
                style={{
                  height: "37px",
                  width: "37px",
                  color: "blue",
                  border: "solid 1px blue ",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  height: "37px",
                  width: "37px",
                  color: "red",
                  border: "solid 1px red ",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
              >
                <DeleteOutlineSharpIcon />
              </IconButton>
              {/* === ACTION BUTTONS === */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
