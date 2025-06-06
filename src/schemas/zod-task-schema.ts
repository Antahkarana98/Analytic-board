import { z } from "zod"

export const taskSchema = z.object({
  id: z.string().uuid(),
  taskName: z.string().min(1, 'La tarea es requerida'),
  category: z.string().min(1, 'La categoria es requerida'),
  startDate: z.date(),
  endDate: z.date(),
  isCompleted: z.boolean().default(false),
})