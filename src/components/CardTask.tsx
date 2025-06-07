import { useTasksApi } from "@/hooks/useTaskApi"
import { useTasksStore } from "@/store/tasksStore"
import type { Task } from "@/types"
import { useState } from "react"

const CardTask = ({ task }: { task: Task }) => {

  const { taskName, category, startDate, endDate, isCompleted } = task

  const [isCompletedTask, setIsCompletedTask] = useState(isCompleted)

  const { updateTask, getTaskById, deleteTask } = useTasksStore()
  const { updateTaskApi, deleteTaskApi } = useTasksApi()

  const handleUpdateTask = async (task: Task) => {    
    await updateTaskApi(task.id, { ...task, isCompleted: !task.isCompleted })    
    setIsCompletedTask(!task.isCompleted)
    getTaskById(task.id)
    updateTask({ ...task, isCompleted: !task.isCompleted })
  }

  const handleDeleteTask = async (id: Task['id']) => {
    await deleteTaskApi(id)
    deleteTask(id)
  }

  return (
    <>
      <div>
        <div>
          <p>{ taskName }</p>
          <p>{ category }</p>
          <p>{ startDate.toString() }</p>
          <p>{ endDate.toString() }</p>
          <button 
            type="button" 
            onClick={() => handleUpdateTask(task)}
            >
            Completar
          </button>

          <button 
            type="button" 
            onClick={() => getTaskById(task.id)}
          >
            Editar
          </button>

          { isCompletedTask ? <p className="text-green-500">Completada</p> : <p className="text-red-500">Pendiente</p> }
          <button 
            type="button" 
            onClick={() => handleDeleteTask(task.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  )
}

export default CardTask
