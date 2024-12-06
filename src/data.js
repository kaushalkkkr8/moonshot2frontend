export const LineChartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  datasets: [
    {
      label: "Steps By A",
      data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
      borderColor: "rgb(75,192,192)",
    },
    {
      label: "Steps By B",
      data: [3000, 5000, 5500, 6500, 8600, 3000, 9500],
      borderColor: "red",
    },
  ],
};

export const BarChartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  datasets: [
    {
      label: "Steps By A",
      data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
      backgroundColor: "rgb(95,92,192)",
      borderColor: "blue",
      borderWidth: 1,
    },
    {
      label: "Steps By B",
      data: [3000, 5000, 5500, 6500, 8600, 3000, 9500],
      backgroundColor: "red",
      borderColor: "blue",
      borderWidth: 1,
    },
  ],
};

export const pieChartData = {
  labels: ["Facebook", "Twitter", "Instagram"],
  datasets: [
    {
      label: "Time Spent",
      data: [120, 60, 30],
      backgroundColor: ["rgba(255,99,132,0.9)", "rgba(54,162,235,0.9)", "rgba(255,206,86,0.9)"],
    
    },
  ],
  hoverOffSet: 4,
};
