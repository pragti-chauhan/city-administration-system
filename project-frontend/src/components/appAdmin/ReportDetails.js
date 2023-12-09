import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { getAllReports, updateReport } from '../../services/AdminCommunicationService';
import '../../styles/ReportDetails.css';

function ReportDetails() {

  const [solution, setSolution] = useState('');
  const [status, setStatus] = useState('');
  const reportParam = useParams();
  const [report, setReport] = useState([]);

  useEffect(() => {
    console.log(reportParam.id);
    axios.get(`http://localhost:8090/reports/${reportParam.id}`)
      .then((response) => {
        setReport(response.data);
      })
      .catch((error) => {
        console.error("Error fetching report data:", error);
      });
  }, [reportParam.id]);


  const handleUpdateReport = async () => {
    const updatedReport = { ...report, solution, status };
    try {
      await updateReport(updatedReport);
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  return (
    <div className='report-details'>
      <h2>Report No. {report.id}</h2>

      <h3>Title: {report.title}</h3>
      <p>Description: {report.description}</p>
      <p>Current Solution: {report.solution}</p>
      <p>Current Status: {report.status}</p>
      <p>{report.soltution}</p>
      <textarea
        placeholder="Update solution"
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
      /><br></br>
      <label>
        Update Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Resolved">Resolved</option>
        </select>
      </label><br></br>
      <button onClick={() => handleUpdateReport(report.id)}>Submit Solution</button>
    </div>
  );
}

export default ReportDetails;
