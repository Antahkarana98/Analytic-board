import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTasksStore } from "../store/tasksStore";

const schema = yup.object({
  taskName: yup.string().required('La tarea es requerida'),
  category: yup.string().required('La categoria es requerida'),
  startDate: yup.date().required('La fecha de inicio es requerida'),
  endDate: yup.date().required('La fecha de finalización es requerida'),
})

const Form = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const { addTask } = useTasksStore()

  const addTaskService = async (data: yup.InferType<typeof schema>) => {
    //TODO: Transforma la fecha a colombia en vez del UTC
    try {
      const url = 'http://localhost:3001/tasks'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error('Error al agregar la tarea:', error)
    }
  }

  const handleSubmitForm = async (data: yup.InferType<typeof schema>) => {
    await addTaskService(data)
    addTask({
      ...data,
      isCompleted: false
    })
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-3"
      >
        <fieldset>
          <legend>Tarea</legend>
          <label htmlFor="taskName">Tarea</label>
          <input
            type="text"
            id="taskName"
            placeholder="Ingresa la tarea Ejemplo: Ir al gym"
            className="border border-gray-300 rounded"
            {...register('taskName')}
            name="taskName"
          />
          {errors.taskName && <p>{errors.taskName.message?.toString()}</p>}
        </fieldset>

        <fieldset>
          <legend>Categoria</legend>
          <label htmlFor="category">Categoria</label>
          <select {...register('category')}>
            <option value="">Select a category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
          {errors.category && <p>{errors.category.message?.toString()}</p>}
        </fieldset>

        <fieldset>
          <legend>Fecha de la tarea</legend>
          <div>
            <label htmlFor="startDate">Fecha de inicio</label>
            <input type="datetime-local" 
            id="startDate"
            {...register('startDate')} />
          </div>
          <div>
            <label htmlFor="endDate">Fecha de finalización</label>
            <input type="datetime-local" 
            id="endDate"
            {...register('endDate')} />
          </div>
          {errors.startDate && <p>{errors.startDate.message?.toString()}</p>}
          {errors.endDate && <p>{errors.endDate.message?.toString()}</p>}
        </fieldset>
        
        <button type="submit">Crear tarea</button>
      </form>
    </>
  )
}

export default Form
