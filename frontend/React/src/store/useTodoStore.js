import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useTodoStore = create((set, get) => ({
  tasks: [],
  areTasksLoading: false,

  createTask: async (task, done) => {
    set({ areTasksLoading: true });
    try {
      const res = await axiosInstance.post("/task/new", {
        task,
        done,
      });
      set({ tasks: res.data });
      toast.success("Task has been created");
    } catch (error) {
      console.log("Error in createTask", error);
    } finally {
        set({ areTasksLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ areTasksLoading: true });
    try {
        const res = await axiosInstance.delete(`/task/${id}/delete`);
        set({ tasks: res.data });
        toast.success("Task has been deleted")
    } catch (error) {
        console.log("Error in deleteTask", error);
    } finally {
        set({ areTasksLoading: false });
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
    set({ areTasksLoading: true });
    try {
      const res = await axiosInstance.put(`/task/${id}/update`, {
        done
      });
      set({ tasks: res.data });
    } catch (error) {
      console.log("Error in updateTask", error);
    } finally {
      set({ areTasksLoading: false });
    }
  }
}));