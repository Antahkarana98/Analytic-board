import { useTasksStore } from "@/store/tasksStore";
import CardTask from "@/components/CardTask";
import { useFilterTasks } from "@/hooks/useFilterTasks";

const TaskList = () => {

  const { tasks } = useTasksStore()
  const { filteredTasks, setFilter } = useFilterTasks(tasks)

  return (
    <>
      <div className="flex justify-between items-center w-1/2 mx-auto">
        <h2 className="text-2xl font-bold">Lista de tareas</h2>
        <div>
          <select name="" id="" onChange={(e) => setFilter(e.target.value)}>
            <option value="">Todas las tareas</option>
            <option value="completed">Tareas completadas</option>
            <option value="pending">Tareas pendientes</option>
          </select>
        </div>
      </div>

      <div>
        {filteredTasks.map((task) => (
          <CardTask key={task.id} task={task} />
        ))}
      </div>
    </>
  )
}

export default TaskList
