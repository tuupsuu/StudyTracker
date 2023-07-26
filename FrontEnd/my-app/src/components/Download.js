// Import necessary libraries
import React from 'react';
import Papa from 'papaparse';

// Download component
function Download({ students }) {
  const downloadCSV = () => {
    const csv = Papa.unparse(students);
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
