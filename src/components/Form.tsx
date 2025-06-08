import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useTasksStore } from "@/store/tasksStore";
import { yupSchema } from "@/schemas/yup-schema";
import type { FormValues } from "@/schemas/yup-schema";
import { createTask } from "@/utils/createIdTask";
import { useTasksApi } from "@/hooks/useTaskApi";
import type { DraftTask } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { transformToColombiaTime } from "@/utils/formatDates";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

const Form = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(yupSchema) })

  const { addTask, updateTask, tasks, activeId, getTaskById } = useTasksStore()
  const { addTaskApi, updateTaskApi } = useTasksApi();

  useEffect(() => {
    if (!activeId) return;

    // Llenar la informacion del formulario cuando el activeId esta activo
    const activeTask = tasks.filter((task) => task.id === activeId)[0]
    
    // Se utiliza reset por que es mas optimo y claro que utilizar setValues
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
      const task = createTask(data) // se crea un id unico para ambos metodos de guaradado
      addTask(task)
      await addTaskApi(task)
    }
    
    resetForm()
  }

  // Funcion para resetear todos los campos del formulario y el activeId
  const resetForm = () => {
    reset({
      taskName: '',
      category: '',
      startDate: '',
      endDate: '',
    })
    getTaskById('')
  }

  return (
    <div className="flex items-center w-full h-full">
      <form 
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col justify-center relative border-2 border-gray-900 rounded-lg p-6 w-full h-full space-y-4 bg-sky-200"  
      >
        <span className="absolute bottom-0 right-0 w-[101%] h-[101%] -mb-2 -mr-2 bg-gray-900 rounded-lg pointer-events-none -z-10"></span>
        
        <h2 className="font-bold text-center text-3xl">{ activeId ? "Editar la tarea" : "Crear una nueva tarea" }</h2>

        {activeId && (
          <button type="button" onClick={() => resetForm()} className="absolute top-2 right-3 cursor-pointer">x</button>
        )}
        
        <fieldset>
          <Input 
            register={ register } 
            errors={ errors }
            inputName="taskName"
            placeholder="Ingresa la tarea Ejemplo: Ir al gym"
            label="Tarea"
            type="text"
          />
        </fieldset>

        <fieldset>
          <Select 
            register={ register } 
            errors={ errors }
            inputName="category"
            label="Categoria"
          />
        </fieldset>

        <fieldset>
          <div>
            <Input 
              register={ register } 
              errors={ errors }
              inputName="startDate"
              placeholder="Ingresa la fecha de inicio"
              label="Fecha de inicio"
              type="datetime-local"
            />
          </div>
        </fieldset>

        <fieldset>
          <div>
            <Input 
              register={ register } 
              errors={ errors }
              inputName="endDate"
              placeholder="Ingresa la fecha de finalización"
              label="Fecha de finalización"
              type="datetime-local"
            />
          </div>
        </fieldset>

        <div className="flex justify-center">
          <Button type="submit">
            {activeId ? 'Actualizar tarea' : 'Agregar tarea'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form