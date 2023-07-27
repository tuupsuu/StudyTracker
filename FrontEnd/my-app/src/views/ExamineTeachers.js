import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import "./OfficialView.css";
import accounts from "../jsonFiles/accounts.json";
import StudentsGrades from "../jsonFiles/grades.json";

function processCityData(cityData) {
    // Group data by classNumber and subject
    const groupedData = cityData.reduce((acc, student) => {
      const key = `${student.classNumber}_${student.subject}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(student);
      return acc;
    }, {});
  
    // Process each class's and subject's data
    const processedData = Object.entries(groupedData).map(([key, students]) => {
      const [classNumber, subject] = key.split("_");
  
      // Calculate average grade
      const avgGrade =
        students.reduce((acc, student) => acc + student.grade, 0) /
        students.length;
  
      // Find best and worst schools
      const schoolAvgs = students.reduce((acc, student) => {
        if (!acc[student.school]) {
          acc[student.school] = { total: 0, count: 0 };
        }
        acc[student.school].total += student.grade;
        acc[student.school].count += 1;
        return acc;
      }, {});
  
      let worstSchool,
        bestSchool,
        worstAvg = Infinity,
        bestAvg = -Infinity;
      for (let school in schoolAvgs) {
        const avg = schoolAvgs[school].total / schoolAvgs[school].count;
        if (avg < worstAvg) {
          worstAvg = avg;
          worstSchool = school;
        }
        if (avg > bestAvg) {
          bestAvg = avg;
          bestSchool = school;
        }
      }
  
      return {
        subject,
        classNumber,
        students: students.length,
        avgGrade: avgGrade.toFixed(2),
        worstSchool: worstSchool,
        worstSchoolAvg: worstAvg.toFixed(2),
        bestSchool: bestSchool,
        bestSchoolAvg: bestAvg.toFixed(2),
      };
    });
  
    return processedData;
  }

function OfficialView() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [officialName, setOfficialName] = useState("");
  const [officialCity, setOfficialCity] = useState("");
  const [cityData, setCityData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isTokenExpired = () => {
      const expirationTime = localStorage.getItem("jwtTokenExpiration");
      return new Date().getTime() > expirationTime;
    };

    const intervalId = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.clear();
        navigate("..");
      }
    }, 1000); // checks every second

    sessionStorage.setItem("isRefreshing", "true");

    const loggedInOfficialName = localStorage.getItem("loggedInOfficialName");
    if (loggedInOfficialName) {
      setOfficialName(loggedInOfficialName);
    }

    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      if (!sessionStorage.getItem("isRefreshing")) {
        localStorage.clear();
      }
    });

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        if (!sessionStorage.getItem("isRefreshing")) {
          localStorage.clear();
        }
      });
    };
  }, [navigate]);

  useEffect(() => {
    const loggedInOfficialId = localStorage.getItem("loggedInOfficialId");
    const officialCity = localStorage.getItem("officialCity");
    if (loggedInOfficialId && officialCity) {
      const officialInfo = accounts.officials.find(
        (official) =>
          official.id === loggedInOfficialId && official.city === officialCity
      );
      if (officialInfo) {
        setOfficialName(officialInfo.name);
        setOfficialCity(officialCity);
      }
    }
  }, []);

  useEffect(() => {
    const data = StudentsGrades.filter((student) => student.city === officialCity);
    setCityData(processCityData(data));
  }, [officialCity]);

  // Rest of the code remains unchanged

  return (
    <div className="official-view">
      <header className="header">
        <FaBars className="hamburger" onClick={() => setSidebarOpen(true)} />
        <div className="HeaderOfficial">
          <h1 className="TitleOfficial">Examine teachers</h1>
        </div>
        <Link
          to=".."
          className="LogoutButtonOfficial"
          onClick={() => {
            localStorage.clear();
          }}
        >
          <BiLogOut></BiLogOut>
        </Link>
      </header>

      {isSidebarOpen && (
        <aside className="sidebar">
          <FaBars
            className="close-button"
            onClick={() => setSidebarOpen(false)}
          >
            Close
          </FaBars>
          <ul>
            <li><Link to="/official">Homepage</Link></li>
            <li onClick={() => alert("Not implemented yet")}>Print Reports</li>
            <li><Link to="/examine-schools">Examine Schools</Link></li>
            <li>Examine teachers</li>
          </ul>
        </aside>
      )}

      <section className="content">
        <h2>Citys teachers</h2>
      </section>
    </div>
  );
}

export default OfficialView;
