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
  } catch (error) {
    console.log(error);
  }
});

// Read one

// Read many

// Update

app.listen(5000, console.log("Server started on port 5000"));
