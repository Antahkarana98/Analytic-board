import { v4 as uuidv4} from 'uuid'
import type { DraftTask } from "../types"

// Funcion para generar un id unico
export const createTask = (task: DraftTask) => {
  return {
    id: uuidv4(),
    ...task,
    isCompleted: false
  }
}