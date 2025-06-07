import express from "express";
import { getTasks, addTask, deleteTask } from "../controllers/taskController";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask as express.RequestHandler);
router.delete("/:id", deleteTask as express.RequestHandler);

export default router;
