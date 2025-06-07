import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useTasksStore } from "@/store/tasksStore";
import { yupSchema } from "@/schemas/yup-schema";
import { createTask } from "@/utils/createIdTask";
import { useTasksApi } from "@/hooks/useTaskApi";
import type { DraftTask } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { transformToColombiaTime } from "@/utils/formatDates";

const Form = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(yupSchema)
  })

  const { addTask, updateTask, tasks,activeId } = useTasksStore()
  const { addTaskApi, updateTaskApi } = useTasksApi();

  useEffect(() => {
    if (!activeId) return;

    const activeTask = tasks.filter((task) => task.id === activeId)[0]
    
    reset({
      taskName: activeTask.taskName,
      category: activeTask.category,
      startDate: transformToColombiaTime(new Date(activeTask.startDate)),
      endDate: transformToColombiaTime(new Date(activeTask.endDate)),
    });
  }, [activeId])

  const handleSubmitForm = async (data: DraftTask) => {
    if(activeId) {
      await updateTaskApi(activeId, data)
      updateTask({
        ...data,
        isCompleted: tasks.filter((task) => task.id === activeId)[0].isCompleted
      })
    } else {
      await addTaskApi(createTask(data))
      addTask(createTask(data))
    }
    
    reset({
      taskName: '',
      category: '',
      startDate: '',
      endDate: '',
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
          />
          {errors.taskName && <p>{errors.taskName.message?.toString()}</p>}
        </fieldset>

        <fieldset>
          <legend>Categoria</legend>
          <label htmlFor="category">Categoria</label>
          <select 
            id="category"
            {...register('category')}
          >
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
        
        <button type="submit">{activeId ? 'Actualizar tarea' : 'Agregar tarea'}</button>
      </form>
    </>
  )
}

export default Form
