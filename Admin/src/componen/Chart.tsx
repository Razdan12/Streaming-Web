import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

interface DataItem {
  venue: string;
  count1: number;
  count2: number;
}

const ChartSide = ({ data, id , title1, title2}: { data: DataItem[] , id: string, title1: string, title2: string}) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    Chart.register(...registerables);

    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: data.map((row) => row.venue),
        datasets: [
          {
            label: title1,
            data: data.map((row) => row.count1),
            fill: false,
            borderColor: 'red',
          },
          {
            label: title2,
            data: data.map((row) => row.count2),
            fill: false,
            borderColor: 'blue',
          },
        ],
      },
      options: {
        animation: {
          duration: 1000,
          delay: (context) => context.dataIndex * 100,
        },
      },
    };

    const chartElement = document.getElementById(id) as ChartItem;
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (chartElement) {
      chartRef.current = new Chart(chartElement, chartConfig);
    }
  }, [data]);

  return (
    <div className='w-full'>
      <canvas id={id}></canvas>
    </div>
  );
};

export default ChartSide;
