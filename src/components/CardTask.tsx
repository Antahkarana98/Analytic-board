import { useState } from "react"
import { useTasksApi } from "@/hooks/useTaskApi"
import { useTasksStore } from "@/store/tasksStore"
import type { Task } from "@/types"
import { formatDateHtml } from "@/utils/formatDates"
import Button from "./Button"
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";
import Modal from "./Modal"

const CardTask = ({ task }: { task: Task }) => {

  const { updateTask, getTaskById, deleteTask } = useTasksStore()
  const { updateTaskApi, deleteTaskApi } = useTasksApi()

  const [isCompletedTask, setIsCompletedTask] = useState(task.isCompleted)
  const { taskName, category, startDate, endDate } = task

  // Esta funcion solo actualiza el isCompleted
  const handleUpdateTask = async (task: Task) => {
    await updateTaskApi(task.id, { ...task, isCompleted: !task.isCompleted })    
    getTaskById(task.id)
    setIsCompletedTask(!task.isCompleted)
    updateTask({ ...task, isCompleted: !task.isCompleted })
  }

  const handleDeleteTask = async (id: Task['id']) => {
    await deleteTaskApi(id)
    deleteTask(id)
  }

  return (
    <>
      <article className="relative mb-5">
        <div className="relative block w-full px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 border-2 border-gray-900 rounded-lg bg-sky-200">
          <header>
            <h3 className="text-xl font-bold">{ taskName }</h3>
            <div className="absolute top-2 right-2">
              { isCompletedTask ? (
                <IoMdCheckmarkCircleOutline className="w-7 h-7" />
              ) : (
                <FaClockRotateLeft className="w-6 h-6" />
              )}
            </div>
          </header>

          <main>
            <p className="text-gray-500">{ category }</p>
            <p className="mt-3"><span className="font-bold">Fecha de inicio:</span> { formatDateHtml(startDate) }</p>
            <p className="mt-1"><span className="font-bold">Fecha de finalización:</span> { formatDateHtml(endDate) }</p>
          </main>

          <footer>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => handleUpdateTask(task)}
              >
              {isCompletedTask ? 'Pendiente' : 'Completar'}
            </Button>
            <Button 
              type="button" 
              onClick={() => getTaskById(task.id)}
            >
              Editar
            </Button>
            <Modal
              handleDeleteTask={handleDeleteTask}
              idTask={task.id}
            />
          </div>
        </footer>
        </div>
        <span className="absolute -z-10 bottom-0 right-0 w-full h-full -mb-1.5 -mr-1.5 bg-gray-900 rounded-lg"></span>
      </article>
    </>
  )
}

export default CardTask
