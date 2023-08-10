import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import _ from "lodash";
import "./OfficialView.css";
import StudentsGrades from "../jsonFiles/grades.json";
import Header from "../components/Header";

function ExamineSchools() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [schoolData, setSchoolData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const location = useLocation();
  const navigate = useNavigate();
  const [officialName, setOfficialName] = useState("");

  const getParams = (query) => {
    return new URLSearchParams(query);
  };

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

  const params = getParams(location.search);
  const selectedSchoolFromUrl = params.get("school");
  const selectedGradeFromUrl = params.get("grade");

  useEffect(() => {
    setSelectedSchool(selectedSchoolFromUrl || "All");
    setSelectedClass(selectedGradeFromUrl || "All");
  }, [selectedSchoolFromUrl, selectedGradeFromUrl]);

  useEffect(() => {
    const data = _.chain(StudentsGrades)
      .groupBy("school")
      .map((value, key) => ({
        school: key,
        classes: _.chain(value)
          .groupBy("classNumber")
          .map((v, k) => ({
            classNumber: k,
            studentsCount: v.length,
            averageGrade: _.round(_.meanBy(v, "grade"), 2),
          }))
          .value(),
      }))
      .value();

    setSchoolData(data);
  }, []);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeSelectedSchool = (e) => {
    setSelectedSchool(e.target.value);
  };

  const handleChangeSelectedClass = (e) => {
    setSelectedClass(e.target.value);
  };

  const filteredData = schoolData
    .filter(
      (school) => selectedSchool === "All" || school.school === selectedSchool
    )
    .map((school) => ({
      ...school,
      classes: school.classes.filter(
        (classInfo) =>
          selectedClass === "All" || classInfo.classNumber === selectedClass
      ),
    }))
    .filter((school) => school.classes.length > 0)
    .filter((school) => {
      const schoolNameMatch = school.school
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const classNameMatch = school.classes.some((classInfo) =>
        classInfo.classNumber.includes(searchTerm)
      );
      return schoolNameMatch || classNameMatch;
    })
    .map((school) => {
      if (school.school.toLowerCase().includes(searchTerm.toLowerCase())) {
        return school;
      } else {
        return {
          ...school,
          classes: school.classes.filter((classInfo) =>
            classInfo.classNumber.includes(searchTerm)
          ),
        };
      }
    });

  const lowCountSchools = [];
  filteredData.forEach((school) =>
    school.classes.forEach((classInfo) => {
      if (classInfo.studentsCount < 13) {
        lowCountSchools.push({
          school: school.school,
          classNumber: classInfo.classNumber,
        });
      }
    })
  );

  const Links = [
    { label: "Homepage", path: "/official" },
    { label: "Print Reports" },
    { label: "Examine Teachers", path: "/examine-teachers" }
  ]; 

  return (
    <div className="official-view">
      <Header
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        links={Links} 
        title="Examine Schools" // Pass the custom title here
      />

      <section className="content">
        <h2>City's different Schools Score Average Distribution</h2>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            placeholder="Search school or class"
          />
          <select value={selectedSchool} onChange={handleChangeSelectedSchool}>
            <option value="All">All Schools</option>
            {_.uniqBy(schoolData, "school").map((school) => (
              <option key={school.school} value={school.school}>
                {school.school}
              </option>
            ))}
          </select>
          <select value={selectedClass} onChange={handleChangeSelectedClass}>
            <option value="All">All Classes</option>
            {_.chain(schoolData)
              .flatMap("classes")
              .uniqBy("classNumber")
              .map((classInfo) => (
                <option
                  key={classInfo.classNumber}
                  value={classInfo.classNumber}
                >
                  {classInfo.classNumber}
                </option>
              ))
              .value()}
          </select>
        </div>

        <table style={{ backgroundColor: "white" }}>
          <thead>
            <tr>
              <th>School</th>
              <th>Grade</th>
              <th>Students</th>
              <th>Avg</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((school) =>
              school.classes.map((classInfo) => {
                const lowStudentCount = classInfo.studentsCount < 13;
                return (
                  <tr
                    key={school.school + classInfo.classNumber}
                    className={lowStudentCount ? "low-student-count" : ""}
                  >
                    <td>{school.school}</td>
                    <td>{classInfo.classNumber}</td>
                    <td>{classInfo.studentsCount}</td>
                    <td>{classInfo.averageGrade}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {lowCountSchools.length > 0 && (
          <div className="warning-container">
            {lowCountSchools.map(({ school, classNumber }) => (
              <p key={school + classNumber}>
                {`${school} grade: ${classNumber}, doesn't have enough answers to be taken into account`}
              </p>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ExamineSchools;
