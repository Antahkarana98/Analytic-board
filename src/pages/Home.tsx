
import { useTasksStore } from "../store/tasksStore";
import { useEffect } from "react";
import Form from "../components/Form";
import TaskList from "../components/TaskList";

const Home = () => {

  const { getAllTasks } = useTasksStore()
  
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
      <h1 className="text-5xl font-bold text-center my-5">Bienvenido al To Do List de Camilo 📆</h1>
      <section className="flex justify-center">
        <Form />
      </section>

      <section>
        <TaskList />
      </section>
    </>
  )
}

export default Home
