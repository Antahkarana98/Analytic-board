import * as yup from "yup";

// Funcion para validar el formulario
export const yupSchema = yup.object({
  taskName: yup.string().required('La tarea es requerida'),
  category: yup.string().required('La categoria es requerida'),
  startDate: yup.string().required('La fecha de inicio es requerida'),
  endDate: yup.string().required('La fecha de finalización es requerida'),
  isCompleted: yup.boolean().default(false),
})

export type FormValues = yup.InferType<typeof yupSchema>;
