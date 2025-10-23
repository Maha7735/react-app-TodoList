import "./App.css";
import TodoList from "./components/TodoList";
import { TodoContext } from "./contexts/todoContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MySnackBar from "./components/MySnackBar";
import { ToastContext } from "./contexts/ToastContext";

var iniTodos = [
  {
    id: uuidv4(),
    title: "learn Js",
    details: "read a book about JS",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "learn math",
    details: "read a book about Math",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "learn english",
    details: "read a book about english",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(iniTodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast: showHideToast }}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "rgba(22, 20, 20, 1)",
        }}
      >
        <MySnackBar open={open} message={message} />
        <TodoContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ToastContext.Provider>
  );
}

export default App;
