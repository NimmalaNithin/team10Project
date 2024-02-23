import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};

function LineGraph({ graphData }) {
  const data = {
    labels: graphData.months,
    datasets: [
      {
        label: graphData.type,
        data: graphData.EIS, //api call
        borderColor: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} height={"100"} width={"180px"} />;
}

LineGraph.propTypes = {
  graphData: PropTypes.shape({
    type: PropTypes.string.isRequired,
    months: PropTypes.array.isRequired,
    EIS: PropTypes.array.isRequired,
  }).isRequired,
};

export default LineGraph;
