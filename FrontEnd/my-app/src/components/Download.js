// Import necessary libraries
import React from 'react';
import Papa from 'papaparse';

// Download component
function Download({ students }) {
  const downloadCSV = () => {
    // Prepare the data: only include the UserID, FirstName, LastName, and the password is always "salasana"
    const preparedData = students.map(student => ({
      UserID: student.UserID,
      FirstName: student.FirstName,
      LastName: student.LastName,
      UserPassWord: "salasana",
    }));

    // Convert the data to CSV format
    const csv = Papa.unparse(preparedData);

    // Create a Blob object from the CSV string
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
    // Create link element
    let link = document.createElement('a');
    link.href = URL.createObjectURL(csvData);
    link.style.display = 'none';
    link.download = 'student_data.csv';
    
    // Append to html link element page
    document.body.appendChild(link);
    
    // Start download
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);
  }

  return (
    <button className='buttonAdd' onClick={downloadCSV}>
      Download CSV
    </button>
  );
}

export default Download;