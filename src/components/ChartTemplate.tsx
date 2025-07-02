import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: number[];
  labels: string[];
  labelX: string;
  labelY: string;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const LineChart: FC<LineChartProps> = ({
  data,
  labels,
  labelX,
  labelY,
  minX,
  minY,
  maxX,
  maxY,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${labelY} / ${labelX}`,
        data: data,
        backgroundColor: "#e396ff",
        borderColor: "#e396ff",
        borderWidth: 0.75,
        pointBackgroundColor: "#d1baba",
        pointBorderColor: "#e396ff",
        pointHoverBackgroundColor: "rgba(125, 37, 224, 1)",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
        borderDash: [5, 1],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 0,
    },
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        min: minX,
        max: maxX,
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        min: minY,
        max: maxY,
        beginAtZero: false,
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "400px",
        height: "30%",
        margin: "auto",
        background: "black",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
