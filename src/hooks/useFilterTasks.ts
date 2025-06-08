import { useMemo, useState } from "react";
import type { Task } from "@/types";
import { FILTERS } from "@/constants/filters"

export const useFilterTasks = (tasks: Task[]) => {
  const [filter, setFilter] = useState('')
  
  // Funcion para filtrar solo las tareas o que estan completadas o que estan pendientes
  // segun el select, el useMemo es para que no se generen rederizaciones inncesarias
  const filteredTasks = useMemo(() => {
    if(filter === FILTERS.completed) return tasks.filter((task) => task.isCompleted)
    if(filter === FILTERS.pending) return tasks.filter((task) => !task.isCompleted)
    return tasks
  }, [filter, tasks])

  return {
    filteredTasks,
    setFilter
  }
}
