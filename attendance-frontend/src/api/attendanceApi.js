const API_BASE_URL = 'http://localhost:8080/api';

// Get authentication token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Common headers for API requests
const getHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

// Format date to YYYY-MM-DD
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
};

// Handle API response safely
const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } catch (e) {
            // fallback if response is not JSON
        }
        throw new Error(errorMessage);
    }

    try {
        return await response.json();
    } catch (e) {
        return null; // in case of empty response
    }
};

// Attendance API functions
const attendanceApi = {

    // Mark attendance (POST /api/attendance)
    markAttendance: async (attendanceData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(attendanceData)
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error marking attendance:', error);
            throw error;
        }
    },

    // Get all attendance records (GET /api/attendance)
    getAllAttendance: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance`, {
                method: 'GET',
                headers: getHeaders()
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching all attendance:', error);
            throw error;
        }
    },

    // Get attendance by student ID (GET /api/attendance/student/{studentId})
    getByStudentId: async (studentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/student/${studentId}`, {
                method: 'GET',
                headers: getHeaders()
            });
            return await handleResponse(response);
        } catch (error) {
            console.error(`Error fetching attendance for student ${studentId}:`, error);
            throw error;
        }
    },

    // Get attendance by course ID (GET /api/attendance/course/{courseId})
    getByCourseId: async (courseId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/course/${courseId}`, {
                method: 'GET',
                headers: getHeaders()
            });
            return await handleResponse(response);
        } catch (error) {
            console.error(`Error fetching attendance for course ${courseId}:`, error);
            throw error;
        }
    },

    // Get attendance by course and date (GET /api/attendance/course/{courseId}/date/{date})
    getByCourseAndDate: async (courseId, date) => {
        try {
            const formattedDate = formatDate(date);
            const response = await fetch(
                `${API_BASE_URL}/attendance/course/${courseId}/date/${formattedDate}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                }
            );
            return await handleResponse(response);
        } catch (error) {
            console.error(`Error fetching attendance for course ${courseId} on ${date}:`, error);
            throw error;
        }
    },

    // Get attendance percentage (GET /api/attendance/percentage)
    getAttendancePercentage: async (studentId, courseId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/attendance/percentage?studentId=${studentId}&courseId=${courseId}`,
                {
                    method: 'GET',
                    headers: getHeaders()
                }
            );
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching attendance percentage:', error);
            throw error;
        }
    },

    // Bulk mark attendance (POST multiple requests)
    markBulkAttendance: async (attendanceDataArray) => {
        try {
            const promises = attendanceDataArray.map((data) =>
                fetch(`${API_BASE_URL}/attendance`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(data)
                }).then(handleResponse)
            );

            const results = await Promise.all(promises);
            return results;
        } catch (error) {
            console.error('Error marking bulk attendance:', error);
            throw error;
        }
    }
};

export default attendanceApi;