
import { useEffect } from "react";
import { useTasksStore } from "@/store/tasksStore";
import Form from "@/components/Form";
import TaskList from "@/components/TaskList";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";

const Home = () => {

  const { getAllTasks } = useTasksStore()
  
  // Funcion para traer todos las tareas
  const getTasks = async () => {
    const url = 'http://localhost:3001/tasks'
    const response  = await fetch(url)
    const tasks = await response.json()
    getAllTasks(tasks)
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <h1 className="text-5xl font-bold text-center my-5 bg-white p-2 w-1/4 mx-auto">App <span className="text-sky-300">To Do</span> List</h1>
      
      <section className="grid grid-cols-2 gap-5 w-3/4 h-full mx-auto">
        <section className="flex justify-center items-center">
          <Form />
        </section>

        <section className="grid gap-5">
          
          <div className="relative">
            <div className="relative z-10 block w-full px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 border-2 border-gray-900 rounded-lg bg-sky-200">
              <PieChart />
            </div>
            <span className="absolute bottom-0 right-0 w-full h-full -mb-1.5 -mr-1.5 bg-gray-900 rounded-lg"></span>
          </div>

          <div className="relative">
            <div className="relative z-10 block w-full px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 border-2 border-gray-900 rounded-lg bg-sky-200">
              <BarChart />
            </div>
            <span className="absolute bottom-0 right-0 w-full h-full -mb-1.5 -mr-1.5 bg-gray-900 rounded-lg"></span>
          </div>
        </section>
      </section>
      

      <section className="mt-10 w-3/4 mx-auto">
        <TaskList />
      </section>
    </>
  )
}

export default Home
