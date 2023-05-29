import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import axiosConfig from "../../../axiosConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "white", // Set the color for legend labels
      },
    },
    title: {
      display: true,
      text: "Users Bar Chart",
      color: "white", // Set the color for the chart title
      font: {
        size: 16,
      },
    },
  },
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        precision: 0,
        color: "white", // Set the color for y-axis ticks
        font: {
          size: 12,
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
      title: {
        display: true,
        text: "Number of Users",
        color: "white", // Set the color for y-axis title
        font: {
          size: 14,
        },
      },
    },
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
      title: {
        display: true,
        text: "Interval",
        color: "white", // Set the color for x-axis title
        font: {
          size: 14,
        },
      },
    },
  },
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [intervalType, setIntervalType] = useState("day");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosConfig.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const getIntervalUsers = () => {
    let intervalUsers = {};

    users.forEach((user) => {
      const date = new Date(user.createdAt);
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

      if (intervalUsers[intervalDate]) {
        intervalUsers[intervalDate]++;
      } else {
        intervalUsers[intervalDate] = 1;
      }
    });

    return intervalUsers;
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

  const intervalUsers = getIntervalUsers();
  const labels = Object.keys(intervalUsers).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Users",
        data: labels.map((date) => intervalUsers[date]),
        backgroundColor: "#F09C9C",
      },
    ],
  };

  //   ------------------------------------------------------------

  const getUsersByRole = () => {
    const roleCounts = {};

    users.forEach((user) => {
      if (roleCounts[user.role]) {
        roleCounts[user.role]++;
      } else {
        roleCounts[user.role] = 1;
      }
    });

    const roles = Object.keys(roleCounts);
    const data = roles.map((role) => roleCounts[role]);
    const colors = roles.map((role) => getColorByRole(role));

    // console.log(dataUser);
    return {
      labels: roles,
      datasets: [
        {
          data,
          backgroundColor: colors,
        },
      ],
    };
  };

  const getColorByRole = (role) => {
    const colorPalette = {
      farmer: "#44CF6C",
      consumer: "#F25F5C",
      admin: "#247BA0",
      customersupport: "#FFE066",
      transporter: "#7C7C7C",
    };

    return colorPalette[role.toLowerCase()];
  };
  const dataUser = getUsersByRole();

  const options1 = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Users by Role",
      },
      legend: {
        position: "bottom",
      },
    },
  };
  console.log(dataUser);

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
      <div style={{ display: "flex" }}>
        <div style={{ width: "700px", height: "500px" }}>
          <Bar data={data} options={options} />
        </div>
        <div style={{ marginLeft: "100px", width: "600px", height: "400px" }}>
          <Doughnut data={dataUser} options={options1} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
