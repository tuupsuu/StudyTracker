import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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
        label: '# of Students',
        data: Array(7).fill(0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barPercentage: 0.5,
      },
      {
        label: 'Average Grade',
        data: Array(7).fill(0),
        type: 'line',
        fill: false,
        borderColor: '#742774',
      }
    ]
  });

  useEffect(() => {
    const fetchGradesData = async () => {
      try {
        const response = await axios.get('grades.json');
        const data = response.data;
        const gradeFrequencies = Array(7).fill(0);
        let totalGrades = 0;

        data.forEach(student => {
          gradeFrequencies[student.grade - 4]++;
          totalGrades += student.grade;
        });

        const avgGrade = totalGrades / data.length;
        const avgGradeArray = Array(7).fill(avgGrade);

        setGradesData({
          labels: ['4', '5', '6', '7', '8', '9', '10'],
          datasets: [
            {
              label: '# of Students',
              data: gradeFrequencies,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              barPercentage: 0.5,
            },
            {
              label: 'Average Grade',
              data: avgGradeArray,
              type: 'line',
              fill: false,
              borderColor: '#742774',
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }

    fetchGradesData();
  }, []);

  return (
    <div className="grade-chart">
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
                text: 'Grade Distribution Chart'
              }
            }
          }}
      />
    </div>
  );
}

export default GradeChart;
