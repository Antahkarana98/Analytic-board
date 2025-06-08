import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

import type { ChartOptions, ChartData } from 'chart.js'
import { useTasksStore } from '@/store/tasksStore'

ChartJS.register(ArcElement, Tooltip, Legend)

const options: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

const PieChart: React.FC = () => {

  const { tasks } = useTasksStore()

  // Calculos para determinar que tareas estan completadas y pendientes
  const completed = tasks.filter((task) => task.isCompleted).length
  const pending = tasks.length - completed

  const data: ChartData<'pie', number[], string> = {
    labels: ['Completadas', 'Pendientes'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ['#B8E6FF', 'oklch(82.3% 0.12 346.018)'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className='bg-white rounded-lg flex justify-center p-5 max-h-[350px]'>
      <Pie data={data} options={options} height={300} />
    </div>
  ) 
};

export default PieChart
