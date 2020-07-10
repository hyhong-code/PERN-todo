import React, { Fragment, useState } from "react";
import axios from "axios";

const InputTodo = () => {
  const [text, setText] = useState("");

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/todos", { description: text }, config);
      window.location = "/";
      console.log(res.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">PERN todo list</h1>
      <form className="d-flex mt-5">
        <input
          type="text"
          className="form-control"
          value={text}
          name="text"
          onChange={handleChange}
        />
        <button className="btn btn-success" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
