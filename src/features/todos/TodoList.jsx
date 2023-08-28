import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../api/apiSlice";
import { PulseLoader } from "react-spinners";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [addTodo] = useAddTodoMutation();

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, complete: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form action="" onSubmit={handleSubmit} className="form">
      <label htmlFor="new-todo">Enter a new new todo item</label>
      <br />
      <div className="div-new-todo">
        <input
          type="text"
          id="new-todo"
          name="newtodo"
          value={newTodo}
          className="form-input"
          onChange={handleChange}
          autoComplete="off"
        />
        <button className="form-button">
          <FontAwesomeIcon icon={faUpload} className="upload-button" />
        </button>
      </div>
    </form>
  );

  let content;
  if (isLoading) {
    content = <PulseLoader color="#fff" />;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.complete}
              id={todo.id}
              onChange={() => updateTodo({ ...todo, complete: !todo.complete })}
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button
            className="form-button-delete"
            onClick={() => deleteTodo({ id: todo.id })}
          >
            <FontAwesomeIcon icon={faTrash} className="trash-button" />
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
