import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Category } from "../pages";

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, ArcElement, Tooltip);

interface DonughnutChartProps {
  budgets: Category[];
  balance: string;
}

const DonughnutChart = ({ budgets, balance }: DonughnutChartProps) => {
  const budgetNames = budgets.map((budget: Category) => budget.name);
  const budgetAmounts = budgets.map((budget: Category) => budget.allocated);
  const data = {
    labels: [...budgetNames, "Remaining Balance"],
    datasets: [
      {
        label: "Amount",
        data: [...budgetAmounts, balance],
        backgroundColor: [
          "#5D9B9B",
          "#E1CC4F",
          "#9B111E",
          "#A5A5A5",
          "#C35831",
          "#7D8471",
          "#924E7D",
        ],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};
export default DonughnutChart;
