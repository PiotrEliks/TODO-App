import Task from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    if (!tasks) {
        return res.status(404).json({ message: "No tasks found" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.log("Error in getAllTasks", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { task, done } = req.body;

    const newTask = new Task({
      task,
      done,
    });
    await newTask.save();

    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error in createTask: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }

        const tasks = await Task.find();

        return res.status(200).json(tasks);
      } catch (error) {
        console.log("Error in deleteTask: ", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
      }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, done } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, done },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error in updateTask: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error in getTaskById: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};