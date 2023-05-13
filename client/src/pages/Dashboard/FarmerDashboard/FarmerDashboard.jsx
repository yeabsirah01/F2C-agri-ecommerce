import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axiosConfig from "../../../axiosConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        precision: 0,
      },
    },
  },
};

const FarmerDashboards = () => {
  const [orders, setOrders] = useState([]);
  const [intervalType, setIntervalType] = useState("day");

  useEffect(() => {
    axiosConfig.get("/orders/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const getIntervalOrders = () => {
    let intervalOrders = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      let intervalDate;

      if (intervalType === "day") {
        intervalDate = date.toLocaleDateString();
      } else if (intervalType === "week") {
        const weekNumber = getWeekNumber(date);
        intervalDate = `Week ${weekNumber}`;
      } else if (intervalType === "month") {
        intervalDate = `${date.toLocaleString("default", {
          month: "long",
        })} ${date.getFullYear()}`;
      }

      if (intervalOrders[intervalDate]) {
        intervalOrders[intervalDate]++;
      } else {
        intervalOrders[intervalDate] = 1;
      }
    });

    return intervalOrders;
  };

  const getWeekNumber = (date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(
      ((date - oneJan) / millisecsInDay + oneJan.getDay() + 1) / 7
    );
  };

  const handleIntervalChange = (event, value) => {
    setIntervalType(value);
  };

  const intervalLabels = {
    day: "Per Day",
    week: "Per Week",
    month: "Per Month",
  };

  const intervalOrders = getIntervalOrders();
  const labels = Object.keys(intervalOrders).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  console.log(labels);
  const data = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: labels.map((date) => intervalOrders[date]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div>
        {Object.keys(intervalLabels).map((key) => (
          <button
            key={key}
            onClick={(event) => handleIntervalChange(event, key)}
          >
            {intervalLabels[key]}
          </button>
        ))}
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default FarmerDashboards;
