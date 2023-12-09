import axios from "axios";

// const commUrl = 'https://jsonplaceholder.typicode.com/comm';
const reportUrl = 'http://localhost:8090/reports';
const noticeUrl = 'http://localhost:4200/notices';

const getUserReports = (userId) => {
    console.log(userId);
    return axios.get(`${reportUrl}/user/${userId}`);
};

const getAllReports = () => {
    return axios.get(reportUrl);
};

const getAllNotices = () => {
    return axios.get(noticeUrl);
};

const addReport = (userReport) => {
    console.log(userReport);
    return axios.post(reportUrl, userReport);
};

const editReportUrl = 'http://localhost:8090/update-report';
const editReport = (updatedReport) => {
    console.log(updatedReport);
    return axios.post(editReportUrl, updatedReport);
};

const deleteReportUrl = 'http://localhost:8090/delete-report';
const deleteReport = (reportId) => {
    return axios.delete(`${deleteReportUrl}/${reportId}`);
};

// const addNotice = (adminNotice) => {
//     console.log(adminNotice);
//     return axios.post(noticeUrl, adminNotice);
// };

export { getUserReports, getAllReports, getAllNotices, addReport, editReport, deleteReport };