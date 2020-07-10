import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      (async () => {
        try {
          const res = await axios.get("/todos");
          setTodos(res.data);
        } catch (error) {
          console.error(error.response);
        }
      })();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      setTodos((ps) => ps.filter((todo) => todo.todo_id !== id));
      await axios.delete(`/todos/${id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdate = (newTodo) => {
    setTodos((ps) =>
      ps.map((todo) => (todo.todo_id !== newTodo.todo_id ? todo : newTodo))
    );
  };

  return (
    <Fragment>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} handleUpdate={handleUpdate} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
