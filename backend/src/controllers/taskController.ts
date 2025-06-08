import { Request, Response } from "express";
import pool from "../config/db";
import axios from "axios"

export const getTasks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  const validStatuses = ["todo", "in progress", "done"];
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title is required and must be a string." });
  }

  if (description && typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string." });
  }

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      error: "Status must be one of 'todo', 'in progress', or 'done'.",
    });
  }
  try {
    
    const result = await pool.query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Invalid task ID." });
  }
  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [parsedId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export const searchTasks = async (req: Request, res: Response) => {
  const { query } = req.body;

  try {
    const { data } = await axios.post("http://localhost:5000/embedding", { text: query });
    const embedding = data.embedding;

    const result = await pool.query(
      `SELECT id, title, description, status,
         1 - (embedding <=> $1::vector) AS similarity
       FROM tasks
       WHERE embedding IS NOT NULL
       ORDER BY embedding <=> $1::vector
       LIMIT 3`,
      [embedding]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Vector search failed" });
  }
};
