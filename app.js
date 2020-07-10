const express = require("express");
const cors = require("cors");

const pool = require("./db");

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());

// Routes
// Create
app.post("/todos", async (req, res, next) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING * ;",
      [description]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Read many
app.get("/todos", async (req, res, next) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ;");
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Read one
app.get("/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1 ;", [
      id,
    ]);
    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update
app.put("/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING * ;",
      [description, id]
    );
    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Delete
app.delete("/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1 ;", [id]);
    res.status(204).json(null);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, console.log("Server started on port 5000"));
