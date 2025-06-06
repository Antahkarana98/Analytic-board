import { useTasksStore } from "../store/tasksStore";
import CardTask from "./CardTask";


const TaskList = () => {

  const { tasks } = useTasksStore()

  return (
    <>
      <h2 className="text-2xl font-bold">Lista de tareas</h2>

      <div>
        {tasks.map((task) => (
          <CardTask key={task.id} task={task} />
        ))}
      </div>
    </>
  )
}

export default TaskList
