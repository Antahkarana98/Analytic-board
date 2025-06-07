import type { Task } from "@/types";
import { useMemo, useState } from "react";

const FILTERS = {
  completed: 'completed',
  pending: 'pending'
}

export const useFilterTasks = (tasks: Task[]) => {
  const [filter, setFilter] = useState('')

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
