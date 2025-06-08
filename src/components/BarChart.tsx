import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

import type { ChartOptions, ChartData } from 'chart.js'

import { useTasksStore } from '@/store/tasksStore';
import { CATEGORIES } from '@/constants/categories';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const BarChart: React.FC = () => {
  
  const { tasks } = useTasksStore()

  // Funcion para calcular la cantidad de tareas por cada una de las categorias
  const categoriesCount = CATEGORIES.reduce((sum, category) => {
    const count = tasks.filter((task) => task.category === category.value).length;
    sum[category.value] = count;
    return sum;
  }, {} as Record<string, number>);  

  const data: ChartData<'bar', number[], string> = {
    labels: CATEGORIES.map((category) => category.label),
    datasets: [
      {
        label: 'Cantidad de tareas',
        data: Object.values(categoriesCount),
        backgroundColor: ['oklch(82.3% 0.12 346.018)'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className='bg-white rounded-lg flex justify-center p-5'>
      <Bar data={data} options={options} />
    </div>
  )
};

export default BarChart;
