import { z } from "zod"

// Funcion para validar el objeto que llega de la api
export const taskSchema = z.object({
  id: z.string().uuid(),
  taskName: z.string().min(1, 'La tarea es requerida'),
  category: z.string().min(1, 'La categoria es requerida'),
  startDate: z.string(),
  endDate: z.string(),
  isCompleted: z.boolean().default(false),
})