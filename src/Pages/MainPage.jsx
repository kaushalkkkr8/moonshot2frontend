import { Bar, Line } from "react-chartjs-2";
import { Chart as Chartjs, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import zoomPlugin from "chartjs-plugin-zoom";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

Chartjs.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

const MainPage = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [gender, setGender] = useState("All");
  const [ageFilt, setAgeFilt] = useState("All");
  const [startDate, setStartDate] = useState("2022-10-04");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  const navigate = useNavigate();

  const [sumA, setSumA] = useState(0);
  const [sumB, setSumB] = useState(0);
  const [sumC, setSumC] = useState(0);
  const [sumD, setSumD] = useState(0);
  const [sumE, setSumE] = useState(0);
  const [sumF, setSumF] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("A");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = "https://moonshot2backend.vercel.app/data";
        const headers = {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        };
        const response = await fetch(url, headers);
        const result = await response.json();
        setData(result);
      } catch (err) {
        handleError(err);
      }
    };
    fetchProducts();
  }, []);


  useEffect(() => {
    filter();
  }, [data, gender, ageFilt, startDate, endDate]);

  useEffect(() => {
    const urlGender = searchParams.get("gender");
    const urlAgeFilt = searchParams.get("ageFilt");
    const urlStartDate = searchParams.get("startDate");
    const urlEndDate = searchParams.get("endDate");

    if (urlGender) setGender(urlGender);
    else if (Cookies.get("gender")) setGender(Cookies.get("gender"));

    if (urlAgeFilt) setAgeFilt(urlAgeFilt);
    else if (Cookies.get("ageFilt")) setAgeFilt(Cookies.get("ageFilt"));

    if (urlStartDate) setStartDate(urlStartDate);
    else if (Cookies.get("startDate")) setStartDate(Cookies.get("startDate"));

    if (urlEndDate) setEndDate(urlEndDate);
    else if (Cookies.get("endDate")) setEndDate(Cookies.get("endDate"));
  }, [searchParams]);

  useEffect(() => {
    Cookies.set("gender", gender, { expires: 7 });
    Cookies.set("ageFilt", ageFilt, { expires: 7 });
    Cookies.set("startDate", startDate, { expires: 7 });
    Cookies.set("endDate", endDate, { expires: 7 });

    setSearchParams({
      gender,
      ageFilt,
      startDate,
      endDate,
    });
  }, [gender, ageFilt, startDate, endDate, setSearchParams]);

  const normalizeDate = (dateString) => {
    const parts = dateString.split("/");

    if (parts.length !== 3) {
      throw new Error(`Invalid date format: ${dateString}`);
    }

    const [day, month, year] = parts.map(Number); 
    return new Date(year, month-1, day);
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
      data2 = data2?.filter((d) => {
        const dbDate = normalizeDate(d.Day);

        const start = new Date(startDate + "T00:00:00");
        const end = new Date(endDate + "T00:00:00");

        if (isNaN(dbDate) || isNaN(start) || isNaN(end)) {
          console.warn("Invalid Date encountered:", d.Day, startDate, endDate);
          return false;
        }

        return dbDate >= start && dbDate <= end;
      });
      console.log("datatatata", data2);
    }

    setFilterData(data2);

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
    maintainAspectRatio: false, 
    onClick: handleBarClick,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Features",
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
    maintainAspectRatio: false, 
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
          onPan: ({ chart }) => {},
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
          speed: 0.1,
          onZoom: ({ chart }) => {},
        },
      },
    },
  };

  const handleResetPreferences = () => {
    Cookies.remove("gender");
    Cookies.remove("ageFilt");
    Cookies.remove("startDate");
    Cookies.remove("endDate");

    setGender("All");
    setAgeFilt("All");
    setStartDate("2022-10-04");
    setEndDate(new Date().toISOString().split("T")[0]);
    setSearchParams({});
  };

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <div>
            <span className="navbar-brand mb-0 h1">Company Brand</span>
             <Link to="https://moonshot1-ten.vercel.app/" className="h5 mx-3 link-offset-2 link-underline link-underline-opacity-0" target="blank" style={{textDecoration:"none"}}>Module 1 </Link>
             <Link to="https://github.com/kaushalkkkr8/moonshot1" className="h5 link-offset-2 link-underline link-underline-opacity-0" target="blank" style={{textDecoration:"none"}}>Module 1 code</Link>
          </div>
          <div className="ms-auto">
            <button onClick={handleLogout} className="btn btn-danger">
              Log Out
            </button>
          </div>
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

            <div className="my-3">
              <button className="btn btn-danger" onClick={handleResetPreferences}>
                Reset Preferences
              </button>
            </div>
          </div>
        </div>

        <div className="card  my-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6" style={{ height: "400px" }}>
                <Bar options={barOptions} data={ChartData} />
              </div>
              <div className="col-md-6" style={{ height: "400px" }}>
                <Line options={lineOptions} data={lineChartData} />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default MainPage;
