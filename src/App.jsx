import { useState } from "react";
import TodoList from "./features/todos/TodoList";
import "./App.css";
import useTitle from "../../rtk-lesson3-blog-crud/src/feature/useTitle";

function App() {
  useTitle('rtk-lesson4-RTKQuery');
  return <TodoList />;
}

export default App;
