import { Bar, Line } from "react-chartjs-2";
import { Chart as Chartjs, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import zoomPlugin from "chartjs-plugin-zoom";

Chartjs.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

const MainPage = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [gender, setGender] = useState("All");
  const [ageFilt, setAgeFilt] = useState("All");
  const [startDate, setStartDate] = useState("2022-10-10");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [sumA, setSumA] = useState(0);
  const [sumB, setSumB] = useState(0);
  const [sumC, setSumC] = useState(0);
  const [sumD, setSumD] = useState(0);
  const [sumE, setSumE] = useState(0);
  const [sumF, setSumF] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState("A");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://moonshot2backend.vercel.app/data");
        const allData = await res.json();
        setData(allData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filter();
  }, [data, gender, ageFilt, startDate, endDate]);

  const normalizeDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const normalizedDate = new Date(`${year}-${month}-${day}T00:00:00`);
    return normalizedDate;
  };
  const filter = () => {
    let data2 = data;

    if (gender !== "All") {
      data2 = data2?.filter((d) => d.Gender === gender);
    }
    if (ageFilt !== "All") {
      data2 = data2?.filter((d) => d.Age === ageFilt);
    }

    if (startDate && endDate) {
      data2 = data2.filter((d) => {
        const dbDate = normalizeDate(d.Day);

        const start = new Date(startDate + "T00:00:00");
        const end = new Date(endDate + "T00:00:00");

        if (isNaN(dbDate) || isNaN(start) || isNaN(end)) {
          console.warn("Invalid Date encountered:", d.Day, startDate, endDate);
          return false;
        }

        return dbDate >= start && dbDate <= end;
      });
    }
setFilterData(data2)

    setSumA(data2.reduce((a, b) => a + (b.A || 0), 0));
    setSumB(data2.reduce((a, b) => a + (b.B || 0), 0));
    setSumC(data2.reduce((a, b) => a + (b.C || 0), 0));
    setSumD(data2.reduce((a, b) => a + (b.D || 0), 0));
    setSumE(data2.reduce((a, b) => a + (b.E || 0), 0));
    setSumF(data2.reduce((a, b) => a + (b.F || 0), 0));
  };

  const handleBarClick = (event, chartElement) => {
    const index = chartElement[0]?.index;
    if (index !== undefined) {
      setSelectedCategory(["A", "B", "C", "D", "E", "F"][index]);
    }
  };

  const ChartData = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "Steps By B",
        data: [sumA, sumB, sumC, sumD, sumE, sumF],
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.5)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    onClick: handleBarClick,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: " Features",
      },
    },
    indexAxis: "y",
  };

  const lineChartData = {
    labels: filterData.map((d) => d.Day),
    datasets: [
      {
        label: `${selectedCategory} Time Trend`,
        data: filterData.map((d) => d[selectedCategory] || 0),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        borderWidth: 1,
      },
    ],
  };


  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart with Zoom and Pan",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          enabled: true,
          mode: "xy",
          speed: 0.1,
          onZoom: ({ chart }) => {
            console.log(`Zoomed to: ${chart.scales.x.min} - ${chart.scales.x.max}`);
          },
          onPan: ({ chart }) => {
            console.log(`Panned to: ${chart.scales.x.min} - ${chart.scales.x.max}`);
          },
        },
      },
    },
  };
  
  
  
  

  // const lineOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Line Chart",
  //     },
  //   },
  //   zoom: {
  //     pan: {
  //       enabled: true,
  //       mode: "xy",
  //     },
  //     zoom: {
  //       enabled: true,
  //       mode: "xy",
  //       speed: 0.1,
  //     },
  //   },
  // };

  // const barOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Horizontal Bar Chart",
  //     },
  //   },
  //   indexAxis: "y",
  // };

  // const lineOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Line Chart",
  //     },
  //   },
  // };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Company Brand</span>
        </div>
      </nav>

      <div className="container my-3">
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div className="col-md-3">
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label htmlFor="gender">Gender:</label>
            <select className="form-select" id="gender" onChange={(e) => setGender(e.target.value)}>
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="age">Age:</label>
            <select className="form-select" id="age" onChange={(e) => setAgeFilt(e.target.value)}>
              <option value="All">All</option>
              <option value="15-25">15-25</option>
              <option value=">25">25</option>
            </select>
          </div>
        </div>

        <div className="card  my-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <Bar options={barOptions} data={ChartData} />
              </div>
              <div className="col-md-6">
                <Line options={lineOptions} data={lineChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
