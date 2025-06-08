import express from "express";
import { getTasks, addTask, deleteTask, searchTasks } from "../controllers/taskController";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask as express.RequestHandler);
router.delete("/:id", deleteTask as express.RequestHandler);
router.post("/search",searchTasks)
export default router;
