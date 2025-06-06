import { z } from "zod"
import { taskSchema } from "../schemas/zod-task-schema"

export type Task = z.infer<typeof taskSchema>

export type DraftTask = Omit<Task, 'id'>
