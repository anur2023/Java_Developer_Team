import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Button from '../../components/Button';
import attendanceApi from '../../api/attendanceApi';
import courseApi from '../../api/courseApi';
import * as userApi from "../../api/userApi";
import './AttendanceReport.css';

const AttendanceReport = () => {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [reportData, setReportData] = useState(null);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const id = parseInt(localStorage.getItem('userId'));

        setUserRole(role);
        setUserId(id);

        fetchCourses();

        if (role === 'TEACHER') {
            fetchStudents();
        } else if (role === 'STUDENT') {
            setSelectedStudent(id);
        }
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await courseApi.getAllCourses();
            setCourses(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const data = await userApi.getAllUsers();
            setStudents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleGenerateReport = async () => {
        if (!selectedCourse || !selectedStudent) {
            alert('Please select both course and student');
            return;
        }

        setLoading(true);
        try {
            const percentageData = await attendanceApi.getAttendancePercentage(
                selectedStudent,
                selectedCourse
            );

            const records = await attendanceApi.getByStudentId(selectedStudent);

            const courseRecords = records.filter(
                record => record.courseId === parseInt(selectedCourse)
            );

            setReportData(percentageData);
            setAttendanceRecords(courseRecords);
        } catch (error) {
            console.error('Error generating report:', error);
            setReportData(null);
            setAttendanceRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (userRole === 'TEACHER') {
            setSelectedStudent('');
        }
        setSelectedCourse('');
        setReportData(null);
        setAttendanceRecords([]);
    };

    const getCourseName = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.courseName : `ID: ${courseId}`;
    };

    const getStudentName = (studentId) => {
        const student = students.find(s => s.id === parseInt(studentId));
        return student ? student.name : `ID: ${studentId}`;
    };

    const getPercentageColor = (percentage) => {
        if (percentage >= 75) return 'excellent';
        if (percentage >= 60) return 'good';
        if (percentage >= 50) return 'warning';
        return 'danger';
    };

    const columns = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
            width: '80px'
        },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (row) => new Date(row.date).toLocaleDateString('en-GB')
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (row) => (
                <span className={`status-badge status-${row.status.toLowerCase()}`}>
                    {row.status}
                </span>
            )
        }
    ];

    return (
        <div className="attendance-report-container">
            <div className="page-header">
                <h1>Attendance Report</h1>
                <p>Generate detailed attendance reports with percentage calculations</p>
            </div>

            <div className="report-controls-card">
                <h3>Generate Report</h3>

                <div className="controls-grid">
                    <div className="control-group">
                        <label htmlFor="course">Select Course *</label>
                        <select
                            id="course"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">-- Select Course --</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {userRole === 'TEACHER' && (
                        <div className="control-group">
                            <label htmlFor="student">Select Student *</label>
                            <select
                                id="student"
                                value={selectedStudent}
                                onChange={(e) => setSelectedStudent(e.target.value)}
                            >
                                <option value="">-- Select Student --</option>
                                {students.map(student => (
                                    <option key={student.id} value={student.id}>
                                        {student.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="control-actions">
                    <Button
                        variant="primary"
                        size="medium"
                        onClick={handleGenerateReport}
                        loading={loading}
                        disabled={!selectedCourse || !selectedStudent}
                    >
                        Generate Report
                    </Button>
                    <Button
                        variant="secondary"
                        size="medium"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {reportData && (
                <>
                    <div className="report-summary-card">
                        <div className="report-header">
                            <div className="report-info">
                                <h2>Attendance Summary</h2>
                                <div className="report-meta">
                                    <span><strong>Student:</strong> {getStudentName(selectedStudent)}</span>
                                    <span><strong>Course:</strong> {getCourseName(parseInt(selectedCourse))}</span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="small"
                                onClick={() => window.print()}
                            >
                                Print Report
                            </Button>
                        </div>

                        <div className="summary-stats">
                            <div className="summary-item">
                                <span className="summary-label">Total Classes</span>
                                <span className="summary-value">{reportData?.totalClasses || 0}</span>
                            </div>
                            <div className="summary-item summary-present">
                                <span className="summary-label">Present Days</span>
                                <span className="summary-value">{reportData?.presentDays || 0}</span>
                            </div>
                            <div className="summary-item summary-absent">
                                <span className="summary-label">Absent Days</span>
                                <span className="summary-value">{reportData?.absentDays || 0}</span>
                            </div>
                            <div className={`summary-item summary-percentage summary-${getPercentageColor(reportData?.percentage || 0)}`}>
                                <span className="summary-label">Attendance %</span>
                                <span className="summary-value-large">
                                    {reportData?.percentage ? reportData.percentage.toFixed(2) : 0}%
                                </span>
                            </div>
                        </div>

                        <div className="progress-bar-container">
                            <div className="progress-bar">
                                <div
                                    className={`progress-fill progress-${getPercentageColor(reportData?.percentage || 0)}`}
                                    style={{ width: `${reportData?.percentage || 0}%` }}
                                >
                                    <span className="progress-text">
                                        {reportData?.percentage ? reportData.percentage.toFixed(2) : 0}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="attendance-status-info">
                            <div className={`status-indicator status-${getPercentageColor(reportData?.percentage || 0)}`}>
                                {(reportData?.percentage || 0) >= 75 && <span>Excellent Attendance</span>}
                                {(reportData?.percentage || 0) >= 60 && (reportData?.percentage || 0) < 75 && <span>Good Attendance</span>}
                                {(reportData?.percentage || 0) >= 50 && (reportData?.percentage || 0) < 60 && <span>Needs Improvement</span>}
                                {(reportData?.percentage || 0) < 50 && <span>Poor Attendance</span>}
                            </div>
                        </div>
                    </div>

                    {attendanceRecords.length > 0 && (
                        <div className="detailed-records-card">
                            <h3>Detailed Attendance Records</h3>
                            <Table
                                columns={columns}
                                data={attendanceRecords}
                                emptyMessage="No attendance records found"
                            />
                        </div>
                    )}
                </>
            )}

            {!reportData && !loading && (
                <div className="empty-report-state">
                    <div className="empty-icon">📊</div>
                    <h3>No Report Generated</h3>
                    <p>Select course and student to generate report</p>
                </div>
            )}
        </div>
    );
};

export default AttendanceReport;