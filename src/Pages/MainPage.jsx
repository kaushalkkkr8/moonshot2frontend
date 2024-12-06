import { Bar, Line } from "react-chartjs-2";
import { Chart as Chartjs, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

Chartjs.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

const MainPage = () => {
  const [data, setData] = useState([]);
  const [gender, setGender] = useState("All");
  const [ageFilt, setAgeFilt] = useState("All");
  const [startDate, setStartDate] = useState("2022-10-04")
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [sumA, setSumA] = useState(0);
  const [sumB, setSumB] = useState(0);
  const [sumC, setSumC] = useState(0);
  const [sumD, setSumD] = useState(0);
  const [sumE, setSumE] = useState(0);
  const [sumF, setSumF] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3001/data");
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
  }, [data, gender,ageFilt,startDate,endDate]);

  
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
    if(ageFilt!=="All"){
      data2 = data2?.filter((d) => d.Age === ageFilt);
    }
   
    if (startDate && endDate) {
      data2 = data2.filter((d) => {
        const dbDate = normalizeDate(d.Day); // Normalize the database date
        console.log("Normalized DB Date:", dbDate);
  
        const start = new Date(startDate + "T00:00:00");  // Normalize start date to midnight
        const end = new Date(endDate + "T00:00:00");      // Normalize end date to midnight
  
        // Validate dates and check range
        if (isNaN(dbDate) || isNaN(start) || isNaN(end)) {
          console.warn("Invalid Date encountered:", d.Day, startDate, endDate);
          return false;
        }
  
        console.log("Comparing Dates:", dbDate, start, end, dbDate >= start && dbDate <= end);
        return dbDate >= start && dbDate <= end;
      });
    }
    console.log("filter",data2);
    

    setSumA(data2.reduce((a, b) => a + (b.A || 0), 0));
    setSumB(data2.reduce((a, b) => a + (b.B || 0), 0));
    setSumC(data2.reduce((a, b) => a + (b.C || 0), 0));
    setSumD(data2.reduce((a, b) => a + (b.D || 0), 0));
    setSumE(data2.reduce((a, b) => a + (b.E || 0), 0));
    setSumF(data2.reduce((a, b) => a + (b.F || 0), 0));
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
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Horizontal Bar Chart",
      },
    },
    indexAxis: "y",
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
  };

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
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
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
                <Line options={lineOptions} data={ChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
