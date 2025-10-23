import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Todo from "./Todo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect, useMemo } from "react";
import { useContext } from "react";
import { TodoContext } from "../contexts/todoContext";
import { ToastContext } from "../contexts/ToastContext";
// Filter Buttons Imports
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// === Filter Buttons Imports
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const { todos, setTodos } = useContext(TodoContext);
  const { showHideToast } = useContext(ToastContext);
  const [displayedTodoType, setDisplayedTodoType] = useState("all");

  useEffect(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      if (Array.isArray(storedTodos)) {
        setTodos(storedTodos);
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      setTodos([]);
    }
  }, []);

  //   FILTERATION ARRAY

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const nonCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendred = todos;

  if (displayedTodoType == "completed") {
    todosToBeRendred = completedTodos;
  } else if (displayedTodoType == "non-completed") {
    todosToBeRendred = nonCompletedTodos;
  } else {
    todosToBeRendred = todos;
  }

  const todosJsx = todosToBeRendred.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  function changeDisplayedType(e) {
    setDisplayedTodoType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: inputValue,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputValue("");
    showHideToast("Task added successfully !");
  }

  return (
    <form>
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ fontFamily: "mainFont", color: "rgba(24, 11, 99, 1)" }}
            >
              Tasks
            </Typography>
            <Divider variant="middle" flexItem />
            {/* FILTER BUTTONS */}
            <ToggleButtonGroup
              style={{ marginTop: "30px" }}
              value={displayedTodoType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="task filter"
            >
              <ToggleButton
                value="all"
                aria-label="all"
                sx={{
                  color: displayedTodoType === "all" ? "white" : "#2a1b9a",
                  backgroundColor:
                    displayedTodoType === "all" ? "#2a1b9a" : "white",
                  border: "1px solid #2a1b9a",
                  "&:hover": {
                    backgroundColor: "#4b33cc",
                    color: "white",
                  },
                }}
              >
                All
              </ToggleButton>
              <ToggleButton
                value="completed"
                aria-label="completed"
                sx={{
                  color: displayedTodoType === "completed" ? "white" : "green",
                  backgroundColor:
                    displayedTodoType === "completed" ? "green" : "white",
                  border: "1px solid green",
                  "&:hover": {
                    backgroundColor: "#33cc66",
                    color: "white",
                  },
                }}
              >
                Completed
              </ToggleButton>
              <ToggleButton
                value="non-completed"
                aria-label="not completed"
                sx={{
                  color:
                    displayedTodoType === "non-completed" ? "white" : "red",
                  backgroundColor:
                    displayedTodoType === "non-completed" ? "red" : "white",
                  border: "1px solid red",
                  "&:hover": {
                    backgroundColor: "#ff6666",
                    color: "white",
                  },
                }}
              >
                Not Completed
              </ToggleButton>
            </ToggleButtonGroup>
            {/* === FILTER BUTTONS === */}
            {/* ALL TODOS */}

            {todosJsx}

            {/* === ALL TODOS === */}
            {/* INPUT + ADD BUTTON */}
            <Grid container spacing={2}>
              <Grid size={8}>
                <TextField
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  style={{ marginTop: "27px", width: "300px" }}
                  id="standard-basic"
                  label="New Task"
                  variant="standard"
                />
              </Grid>
              <Grid size={4}>
                <Button
                  id="addBtn"
                  onClick={() => {
                    handleAddClick();
                  }}
                  variant="contained"
                  style={{
                    marginTop: "35px",
                    width: "150px",
                    fontSize: "17px",
                    backgroundColor:
                      inputValue.trim().length === 0 ? "#d3d3d3" : "#442ebeff",
                    color: inputValue.trim().length === 0 ? "#666" : "white",
                    cursor:
                      inputValue.trim().length === 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                  disabled={inputValue.trim().length === 0}
                >
                  <b>ADD</b>
                </Button>
              </Grid>
            </Grid>
            {/* === INPUT + ADD BUTTON === */}
          </CardContent>
        </Card>
      </Container>
    </form>
  );
}
