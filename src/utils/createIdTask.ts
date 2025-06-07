import { v4 as uuidv4} from 'uuid'
import type { DraftTask } from "../types"

export const createTask = (task: DraftTask) => {
  return {
    id: uuidv4(),
    ...task,
    isCompleted: false
  }
}