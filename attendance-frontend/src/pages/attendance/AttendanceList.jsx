import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Button from '../../components/Button';
import attendanceApi from '../../api/attendanceApi';
// import courseApi from '../../api/courseApi';
// import userApi from '../../api/userApi';
import './AttendanceList.css';

const AttendanceList = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    // const [courses, setCourses] = useState([]);
    // const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState(null);

    // Filters
    const [filterCourse, setFilterCourse] = useState('');
    const [filterStudent, setFilterStudent] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const id = parseInt(localStorage.getItem('userId'));

        setUserRole(role);
        setUserId(id);

        // fetchCourses();

        // if (role === 'TEACHER') {
        //     fetchStudents();
        // }

        fetchAttendance(role, id);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [attendanceRecords, filterCourse, filterStudent, filterDate, filterStatus]);

    // const fetchCourses = async () => {
    //     try {
    //         const data = await courseApi.getAllCourses();
    //         setCourses(Array.isArray(data) ? data : []);
    //     } catch (error) {
    //         console.error('Error fetching courses:', error);
    //     }
    // };

    // const fetchStudents = async () => {
    //     try {
    //         const data = await userApi.getStudents();
    //         setStudents(Array.isArray(data) ? data : []);
    //     } catch (error) {
    //         console.error('Error fetching students:', error);
    //     }
    // };

    const fetchAttendance = async (role, id) => {
        setLoading(true);
        try {
            let data;

            if (role === 'STUDENT') {
                data = await attendanceApi.getByStudentId(id);
            } else {
                data = await attendanceApi.getAllAttendance();
            }

            const records = Array.isArray(data) ? data : [];
            setAttendanceRecords(records);
            setFilteredRecords(records);
        } catch (error) {
            console.error('Error fetching attendance:', error);
            setAttendanceRecords([]);
            setFilteredRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...attendanceRecords];

        if (filterCourse) {
            filtered = filtered.filter(
                record => record.courseId === parseInt(filterCourse)
            );
        }

        if (filterStudent) {
            filtered = filtered.filter(
                record => record.studentId === parseInt(filterStudent)
            );
        }

        if (filterDate) {
            filtered = filtered.filter(
                record =>
                    new Date(record.date).toISOString().split('T')[0] === filterDate
            );
        }

        if (filterStatus) {
            filtered = filtered.filter(
                record => record.status === filterStatus
            );
        }

        setFilteredRecords(filtered);
    };

    const handleClearFilters = () => {
        setFilterCourse('');
        setFilterStudent('');
        setFilterDate('');
        setFilterStatus('');
    };

    // const getCourseName = (courseId) => {
    //     const course = courses.find(c => c.id === courseId);
    //     return course ? course.courseName : `ID: ${courseId}`;
    // };
    //
    // const getStudentName = (studentId) => {
    //     const student = students.find(s => s.id === studentId);
    //     return student ? student.name : `ID: ${studentId}`;
    // };

    const columns = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
            width: '80px'
        },
        // {
        //     key: 'studentId',
        //     label: 'Student Name',
        //     sortable: true,
        //     render: (row) => getStudentName(row.studentId)
        // },
        // {
        //     key: 'courseId',
        //     label: 'Course',
        //     sortable: true,
        //     render: (row) => getCourseName(row.courseId)
        // },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (row) =>
                new Date(row.date).toLocaleDateString('en-GB')
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

    const studentColumns = columns.filter(col => col.key !== 'studentId');

    return (
        <div className="attendance-list-container">
            <div className="page-header">
                <h1>
                    {userRole === 'STUDENT'
                        ? 'My Attendance'
                        : 'Attendance Records'}
                </h1>
                <p>View and filter attendance records</p>
            </div>

            <div className="filters-card">
                <div className="filters-header">
                    <h3>Filters</h3>
                    <Button
                        variant="outline"
                        size="small"
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </Button>
                </div>

                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Course</label>
                        <select
                            value={filterCourse}
                            onChange={(e) => setFilterCourse(e.target.value)}
                        >
                            <option value="">All Courses</option>
                            {/*{courses.map(course => (*/}
                            {/*    <option key={course.id} value={course.id}>*/}
                            {/*        {course.courseName}*/}
                            {/*    </option>*/}
                            {/*))}*/}
                        </select>
                    </div>

                    {userRole === 'TEACHER' && (
                        <div className="filter-group">
                            <label>Student</label>
                            <select
                                value={filterStudent}
                                onChange={(e) => setFilterStudent(e.target.value)}
                            >
                                <option value="">All Students</option>
                                {/*{students.map(student => (*/}
                                {/*    <option key={student.id} value={student.id}>*/}
                                {/*        {student.name}*/}
                                {/*    </option>*/}
                                {/*))}*/}
                            </select>
                        </div>
                    )}

                    <div className="filter-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="PRESENT">Present</option>
                            <option value="ABSENT">Absent</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="attendance-stats">
                <div className="stat-card">
                    <span className="stat-label">Total Records</span>
                    <span className="stat-value">{filteredRecords.length}</span>
                </div>

                <div className="stat-card stat-present">
                    <span className="stat-label">Present</span>
                    <span className="stat-value">
                        {filteredRecords.filter(r => r.status === 'PRESENT').length}
                    </span>
                </div>

                <div className="stat-card stat-absent">
                    <span className="stat-label">Absent</span>
                    <span className="stat-value">
                        {filteredRecords.filter(r => r.status === 'ABSENT').length}
                    </span>
                </div>
            </div>

            <div className="table-card">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading attendance records...</p>
                    </div>
                ) : (
                    <Table
                        columns={userRole === 'STUDENT' ? studentColumns : columns}
                        data={filteredRecords}
                        emptyMessage="No attendance records found"
                    />
                )}
            </div>
        </div>
    );
};

export default AttendanceList;