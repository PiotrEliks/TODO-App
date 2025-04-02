import express from 'express'
import { getAllTasks, createTask, deleteTask, updateTask, getTaskById } from '../controllers/task.controller.js';

const router = express.Router();

router.get("/all", getAllTasks);
router.post("/new", createTask);
router.delete("/:id/delete", deleteTask);
router.put("/:id/update", updateTask);
router.get("/:id", getTaskById);

export default router;