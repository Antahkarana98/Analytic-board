import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { DraftTask, Task } from '../types';

type TaskState = {
  tasks: Task[],
  activeId: Task['id'],
  getAllTasks: (tasks: Task[]) => void,
  addTask: (task: Task) => void,
  deleteTask: (id: Task['id']) => void,
  getTaskById: (id: Task['id']) => void,
  updateTask: (task: DraftTask) => void,
}

export const useTasksStore = create<TaskState>()(
  devtools(
  persist((set) => ({
    tasks: [],
    activeId: '',

    // Acciones

    getAllTasks: (tasks) => set(() => ({ tasks })),

    addTask: (data) => {
      set((state) => ({
        tasks: [...state.tasks, data] 
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
    storage: createJSONStorage(() => localStorage),

    //Solo guarda tasks en el localStorage y no activeId
    partialize: (state) => ({
      tasks: state.tasks,
    }),
  })
))