import { useTasksStore } from "@/store/tasksStore";
import { useFilterTasks } from "@/hooks/useFilterTasks";
import CardTask from "@/components/CardTask";

const TaskList = () => {

  const { tasks } = useTasksStore()
  const { filteredTasks, setFilter } = useFilterTasks(tasks) 

  return (
    <>
      <div>
        <h2 className="text-4xl font-bold text-center bg-white p-2 w-1/4 mx-auto">Lista de tareas</h2>
        <div className="flex justify-end mb-3">
          <div>
            <div className="relative group">
              <select 
                name="filter" 
                id="filter" 
                onChange={(e) => setFilter(e.target.value)}
                className="mb-2 relative z-10 block w-full px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg bg-white focus:outline-none focus:ring-gray-900"
              >
                <option value="">Todas las tareas</option>
                <option value="completed">Tareas completadas</option>
                <option value="pending">Tareas pendientes</option>
              </select>
              <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
            </div>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-4 mb-16">

        <section className="mx-auto w-11/12 mt-3">
          <h2 className="text-2xl font-bold text-center mb-5 bg-white w-1/2 mx-auto">Tareas Pendientes</h2>
          { filteredTasks.filter((task) => !task.isCompleted).map((task) => (
            <CardTask key={task.id} task={task} />
          ))}
        </section>

        <section className="mx-auto w-11/12 mt-3">
          <h2 className="text-2xl font-bold text-center mb-5 bg-white w-1/2 mx-auto">Tareas Completadas</h2>
          { filteredTasks.filter((task) => task.isCompleted).map((task) => (
            <CardTask key={task.id} task={task} />
          ))}
        </section>
      </section>
    </>
  )
}

export default TaskList
