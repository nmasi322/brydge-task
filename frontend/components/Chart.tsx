import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);
export type ChartArray = [date: string, value: string];
interface LineProps {
  incomingData: ChartArray[];
}

const Chart = ({ incomingData }: LineProps) => {
  const data = {
    labels: incomingData.map((entry: any) => entry[0]),
    datasets: [
      {
        label: "Amount",
        data: incomingData.map((entry: any) => entry[1].toFixed(2)),
        borderColor: "white",
        color: "white",
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};
export default Chart;
