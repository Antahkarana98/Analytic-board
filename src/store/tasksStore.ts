import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4} from 'uuid'
import type { DraftTask, Task } from '../types';

type TaskState = {
  tasks: Task[],
  activeId: Task['id'],
  getAllTasks: (tasks: Task[]) => void,
  addTask: (task: DraftTask) => void,
  deleteTask: (id: Task['id']) => void,
  getTaskById: (id: Task['id']) => void,
  updateTask: (task: DraftTask) => void,
}

const createTask = (task: DraftTask) => {
  return {
    id: uuidv4(),
    ...task,
    isCompleted: false
  }
}

export const useTasksStore = create<TaskState>()(
  devtools(
  persist((set) => ({
    tasks: [],
    activeId: '',

    // Actions
    
    getAllTasks: (tasks) => set(() => ({ tasks })),

    addTask: (data) => {
      const newTask = createTask(data)
      set((state) => ({
        tasks: [...state.tasks, newTask] 
      }))
    },

    deleteTask: (id) => {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      }))
    },

    getTaskById: (id) => {
      set(() => ({
        activeId: id
      }))
    },

    updateTask: (data) => {
      set((state) => ({
        tasks: state.tasks.map((task) => task.id === state.activeId ? {...data, id: state.activeId} : task),
        activeId: ''
      }))
    }
  }), {
    name: 'tasks-storage',
    storage: createJSONStorage(() => localStorage)
  })
))