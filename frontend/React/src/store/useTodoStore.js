import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useTodoStore = create((set, get) => ({
  tasks: [],
  areTasksLoading: false,

  createTask: async (task, done) => {
    try {
      const res = await axiosInstance.post("/task/new", {
        task,
        done,
      });
      set(state => ({ tasks: [...state.tasks, res.data] }))
      toast.success("Task has been created");
    } catch (error) {
      toast.error("Error, task not created");
      console.log("Error in createTask", error);
    }
  },

  deleteTask: async (id) => {
    try {
        await axiosInstance.delete(`/task/${id}/delete`);
        set(state => ({
          tasks: state.tasks.filter(t => t._id !== id)
        }))
        toast.success("Task has been deleted")
    } catch (error) {
      toast.error("Error, task not deleted");
      console.log("Error in deleteTask", error);
    }
  },

  getAllTasks: async () => {
    set({ areTasksLoading: true });
    try {
      const res = await axiosInstance.get("/task/all");
      set({ tasks: res.data });
    } catch (error) {
      console.log("Error in getAllTask", error);
    } finally {
      set({ areTasksLoading: false });
    }
  },

  getTaskById: async (id) => {
    try {
      const res = await axiosInstance.get(`/task/${id}`);
      set({ tasks: res.data });
    } catch (error) {
      console.log("Error in getTaskById", error);
    }
  },

  updateTask: async (id, done) => {
    try {
      await axiosInstance.put(`/task/${id}/update`, {
        done
      });
      set(state => ({
        tasks: state.tasks.map(t =>
          t._id === id ? { ...t, done } : t
        )
      }))
    } catch (error) {
      toast.error("Error, task not updated");
      console.log("Error in updateTask", error);
    }
  }
}));