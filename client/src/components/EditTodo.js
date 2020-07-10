import React, { Fragment, useState } from "react";
import axios from "axios";

const EditTodo = ({ todo, handleUpdate }) => {
  const [description, setDescription] = useState(todo.description);

  const handleChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        `/todos/${todo.todo_id}`,
        { description },
        config
      );
      console.log(res.data);
      handleUpdate(res.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleClose = () => {
    setDescription(todo.description);
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#modal-${todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal" id={`modal-${todo.todo_id}`} onClick={handleClose}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="modal-footer">
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
