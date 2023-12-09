// UserReport.js
import React, { useState, useEffect } from 'react';
import { getUserReports, deleteReport } from "../../services/CommunicationService";
import EditReportForm from './EditReportForm';

const UserReport = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentProfile'));

    const [userReports, setUserReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        getUserReports(currentUser.id)
            .then((resp) => {
                console.log(resp.data);
                const reports = resp.data;
                setUserReports(reports);
            })
            .catch((err) => {
                console.log(err);
                setUserReports([]);
            });
    }, []);

    const handleEditReport = (report) => {
        setSelectedReport(report);
    };

    const handleEditSuccess = (editedReport) => {
        // Update the local state with the edited report
        setUserReports((prevReports) =>
            prevReports.map((report) =>
                report.id === editedReport.id ? editedReport : report
            )
        );
    };

    const handleDeleteReport = (report) => {
        const reportId = report.id;
        if (window.confirm('Are you sure you want to delete this report?')) {
            deleteReport(reportId)
                .then(response => {
                    alert('Report deleted successfully:');
                    console.log(response.data);

                    setUserReports((prevReports) => prevReports.filter((report) => report.id !== reportId));
                })
                .catch(error => {
                    alert('Error deleting report:');
                    console.error(error);
                });
        }
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
    };

    // Filter reports based on the search term
    const filteredReports = userReports.filter((report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-report-container" style={styles.container}>
            <h2 style={styles.heading}>Your Reports</h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search by title..."
                onChange={handleSearch}
                value={searchTerm}
            />

            <ul style={styles.list}>
                {filteredReports.map(report => (
                    <li key={report.id} style={styles.listItem}>
                        <p style={styles.reportType}>{report.type}</p>
                        <strong style={styles.reportTitle}>{report.title}</strong>
                        <p style={styles.reportDescription}>{report.description}</p>
                        <p style={styles.reportDescription}>Status - {report.status}</p>
                        <p style={styles.reportDescription}>Solution - {report.solution}</p>
                        <button onClick={() => handleEditReport(report)} style={styles.button}>Edit</button>
                        <button onClick={() => handleDeleteReport(report)} style={styles.button}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Display the EditReportForm as a modal when selectedReport is not null */}
            {selectedReport && (
                <div className="edit-report-modal" style={styles.modal}>
                    <div className="modal-content" style={styles.modalContent}>
                        <span className="close" onClick={() => setSelectedReport(null)} style={styles.close}>
                            &times;
                        </span>
                        <h2 style={styles.modalHeading}>Edit Report</h2>
                        <EditReportForm
                            report={selectedReport}
                            onClose={() => setSelectedReport(null)}
                            onEditSuccess={handleEditSuccess}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    // Add your styling here
    container: {
        padding: '20px',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    subHeading: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    link: {
        fontSize: '16px',
        color: 'blue',
        textDecoration: 'underline',
        marginBottom: '20px',
        display: 'block',
    },
    hr: {
        border: '1px solid #ccc',
        margin: '20px 0',
    },
    list: {
        listStyle: 'none',
        padding: '0',
    },
    listItem: {
        marginBottom: '20px',
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '5px',
    },
    reportType: {
        fontSize: '16px',
        color: 'blue',
        marginBottom: '5px',
    },
    reportTitle: {
        fontSize: '18px',
        marginBottom: '5px',
    },
    reportDescription: {
        fontSize: '14px',
        marginBottom: '10px',
    },
    button: {
        padding: '5px 10px',
        margin: '5px',
        cursor: 'pointer',
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'relative',
        background: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '50%',
        minWidth: '300px',
        textAlign: 'center',
    },
    close: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '20px',
        cursor: 'pointer',
    },
    modalHeading: {
        fontSize: '24px',
        marginBottom: '20px',
    },
};

export default UserReport;
