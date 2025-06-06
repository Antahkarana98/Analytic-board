import type { Task } from "../types"

const CardTask = ({ task }: { task: Task }) => {

  const { taskName, category, startDate, endDate, isCompleted } = task

  return (
    <>
      <div>
        <div>
          <p>{ taskName }</p>
          <p>{ category }</p>
          <p>{ startDate.toString() }</p>
          <p>{ endDate.toString() }</p>
          <button type="button">
            Completar
          </button>
          { isCompleted ? <p className="text-green-500">Completada</p> : <p className="text-red-500">Pendiente</p> }
          <button type="button">Eliminar</button>
        </div>
      </div>
    </>
  )
}

export default CardTask
