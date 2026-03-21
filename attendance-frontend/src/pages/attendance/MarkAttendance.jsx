import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import attendanceApi from '../../api/attendanceApi';
// import courseApi from '../../api/courseApi';
// import userApi from '../../api/userApi';
import './MarkAttendance.css';

const MarkAttendance = () => {
    // const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState({});
    // const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Fetch courses on component mount
    useEffect(() => {
        // fetchCourses();
    }, []);

    // Fetch students when course is selected
    useEffect(() => {
        if (selectedCourse) {
            // fetchStudents();
        } else {
            setStudents([]);
            setAttendanceData({});
        }
    }, [selectedCourse]);

    // const fetchCourses = async () => {
    //     try {
    //         const data = await courseApi.getAllCourses();
    //         setCourses(Array.isArray(data) ? data : []);
    //     } catch (error) {
    //         console.error('Error fetching courses:', error);
    //         showMessage('error', 'Failed to load courses');
    //     }
    // };

    // const fetchStudents = async () => {
    //     setLoading(true);
    //     try {
    //         const data = await userApi.getStudents();
    //         const studentList = Array.isArray(data) ? data : [];
    //         setStudents(studentList);
    //
    //         // Initialize attendance data with all students as PRESENT
    //         const initialAttendance = {};
    //         studentList.forEach(student => {
    //             initialAttendance[student.id] = 'PRESENT';
    //         });
    //         setAttendanceData(initialAttendance);
    //     } catch (error) {
    //         console.error('Error fetching students:', error);
    //         showMessage('error', 'Failed to load students');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleAttendanceChange = (studentId, status) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSelectAll = (status) => {
        const updatedAttendance = {};
        students.forEach(student => {
            updatedAttendance[student.id] = status;
        });
        setAttendanceData(updatedAttendance);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourse) {
            showMessage('error', 'Please select a course');
            return;
        }

        if (students.length === 0) {
            showMessage('error', 'No students to mark attendance');
            return;
        }

        setSubmitLoading(true);

        try {
            // Prepare attendance records
            const attendanceRecords = students.map(student => ({
                studentId: student.id, // FIXED FIELD NAME
                courseId: parseInt(selectedCourse),
                date: selectedDate,
                status: attendanceData[student.id] || 'PRESENT'
            }));

            // Submit all attendance records
            await attendanceApi.markBulkAttendance(attendanceRecords);

            showMessage('success', `Attendance marked successfully for ${students.length} students`);

            // Reset form after 2 seconds
            setTimeout(() => {
                setSelectedCourse('');
                setStudents([]);
                setAttendanceData({});
                setSelectedDate(new Date().toISOString().split('T')[0]); // RESET DATE
            }, 2000);

        } catch (error) {
            console.error('Error submitting attendance:', error);
            showMessage('error', 'Failed to mark attendance. Please try again.');
        } finally {
            setSubmitLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => {
            setMessage({ type: '', text: '' });
        }, 5000);
    };

    const getPresentCount = () => {
        return Object.values(attendanceData).filter(status => status === 'PRESENT').length;
    };

    const getAbsentCount = () => {
        return Object.values(attendanceData).filter(status => status === 'ABSENT').length;
    };

    return (
        <div className="mark-attendance-container">
            <div className="page-header">
                <h1>Mark Attendance</h1>
                <p>Select a course and date to mark student attendance</p>
            </div>

            {message.text && (
                <div className={`message message-${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="attendance-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="course">Select Course *</label>
                                <select
                                    id="course"
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                    required
                                >
                                    <option value="">-- Select Course --</option>
                                    {/*{courses.map(course => (*/}
                                    {/*    <option key={course.id} value={course.id}>*/}
                                    {/*        {course.courseName}*/}
                                    {/*    </option>*/}
                                    {/*))}*/}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Select Date *</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    max={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {selectedCourse && students.length > 0 && (
                        <>
                            <div className="attendance-summary">
                                <div className="summary-card summary-total">
                                    <span className="summary-label">Total Students</span>
                                    <span className="summary-value">{students.length}</span>
                                </div>
                                <div className="summary-card summary-present">
                                    <span className="summary-label">Present</span>
                                    <span className="summary-value">{getPresentCount()}</span>
                                </div>
                                <div className="summary-card summary-absent">
                                    <span className="summary-label">Absent</span>
                                    <span className="summary-value">{getAbsentCount()}</span>
                                </div>
                            </div>

                            <div className="bulk-actions">
                                <Button
                                    type="button"
                                    variant="success"
                                    size="small"
                                    onClick={() => handleSelectAll('PRESENT')}
                                >
                                    Mark All Present
                                </Button>
                                <Button
                                    type="button"
                                    variant="danger"
                                    size="small"
                                    onClick={() => handleSelectAll('ABSENT')}
                                >
                                    Mark All Absent
                                </Button>
                            </div>

                            <div className="students-list">
                                <div className="students-list-header">
                                    <span className="header-cell header-name">Student Name</span>
                                    <span className="header-cell header-email">Email</span>
                                    <span className="header-cell header-status">Attendance</span>
                                </div>

                                {/*{loading ? (*/}
                                    <div className="loading-state">Loading students...</div>
                                ) : (
                                    <div className="students-list-body">
                                        {students.map((student, index) => (
                                            <div key={student.id} className="student-row">
                                                <span className="student-number">{index + 1}</span>
                                                <span className="student-name">{student.name}</span>
                                                <span className="student-email">{student.email}</span>

                                                <div className="attendance-toggle">
                                                    <label className="radio-label">
                                                        <input
                                                            type="radio"
                                                            name={`attendance-${student.id}`}
                                                            value="PRESENT"
                                                            checked={attendanceData[student.id] === 'PRESENT'}
                                                            onChange={() => handleAttendanceChange(student.id, 'PRESENT')}
                                                        />
                                                        <span className="radio-custom radio-present">Present</span>
                                                    </label>

                                                    <label className="radio-label">
                                                        <input
                                                            type="radio"
                                                            name={`attendance-${student.id}`}
                                                            value="ABSENT"
                                                            checked={attendanceData[student.id] === 'ABSENT'}
                                                            onChange={() => handleAttendanceChange(student.id, 'ABSENT')}
                                                        />
                                                        <span className="radio-custom radio-absent">Absent</span>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                {/*)}*/}
                            </div>

                            <div className="form-actions">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="large"
                                    loading={submitLoading}
                                    // disabled={loading}
                                >
                                    Submit Attendance
                                </Button>
                            </div>
                        </>
                    )}

                    {/*{selectedCourse && students.length === 0 && !loading && (*/}
                    {/*    <div className="empty-state">*/}
                    {/*        <p>No students found for this course</p>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </form>
            </div>
        </div>
    );
};

export default MarkAttendance;