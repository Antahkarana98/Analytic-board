import type { DraftTask } from "@/types";
import { createTask } from "@/utils/createIdTask";

export const useTasksApi = () => {
  
  const addTaskApi = async (data: DraftTask) => {
    try {
      const url = 'http://localhost:3001/tasks';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createTask(data))
      });
      return await response.json();
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
      throw error;
    }
  };

  const updateTaskApi = async (id: string, data: DraftTask) => {
    try {
      const url = `http://localhost:3001/tasks/${id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id })
      });
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      throw error;
    }
  }

  const deleteTaskApi = async (id: string) => {
    try {
      const url = `http://localhost:3001/tasks/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      throw error;
    }
  }

  return {
    addTaskApi,
    updateTaskApi,
    deleteTaskApi
  };
};