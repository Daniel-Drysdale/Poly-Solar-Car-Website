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
}

const LineChart: FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels:
      Array.isArray(data) && data.length > 0
        ? data.map((_, index) => index).reverse()
        : [],
    datasets: [
      {
        label: "Voltage / Time (s)",
        data: Array.isArray(data) ? data : [],
        backgroundColor: "rgba(255, 255, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20,
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
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        beginAtZero: true,
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
        height: "300px",
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
