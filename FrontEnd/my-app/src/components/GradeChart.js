import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import StudentsGrades from '../jsonFiles/grades.json';
import { 
    Chart, 
    LineController, 
    BarController, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    BarElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';

Chart.register(
    LineController, 
    BarController, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    BarElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
);

const GradeChart = () => {
  const [gradesData, setGradesData] = useState({
    labels: ['4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        label: 'Number of Students',
        data: Array(7).fill(0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ]
  });

  const [averageGrade, setAverageGrade] = useState(0);

  useEffect(() => {
    const fetchGradesData = async () => {
      try {
        const data = StudentsGrades;
        const gradeFrequencies = Array(7).fill(0);
        let totalGrades = 0;

        data.forEach(student => {
          gradeFrequencies[student.grade - 4]++;
          totalGrades += student.grade;
        });

        const avgGrade = totalGrades / data.length;
        setAverageGrade(avgGrade.toFixed(2));

        setGradesData({
          labels: ['4', '5', '6', '7', '8', '9', '10'],
          datasets: [
            {
              label: 'Number of Students',
              data: gradeFrequencies,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              barPercentage: 0.6,
            },
          ]
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }

    fetchGradesData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div className="grade-chart" style={{ width: '55vw', height: '55vh' }}>
        <Bar
          data={gradesData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of students'
                },
                ticks: {
                  // This will convert floats to integers
                  callback: function(value) {
                    if (value % 1 === 0) {
                      return value;
                    }
                  }
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Grades'
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
              }
            }
          }}
        />
      </div>
      <div style={{padding: '10px'}}>
        <h4>Average Grade</h4>
        <p>{averageGrade}</p>
      </div>
    </div>
  );
}

export default GradeChart;