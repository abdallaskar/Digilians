import api from "./axiosConfig";

const reportService = {
    // Create or update a track report
    createOrUpdateTrackReport: async (reportData) => {
        const response = await api.post("/report/track", reportData);
        return response.data;
    },

    // Get all track reports
    getAllTrackReports: async () => {
        const response = await api.get("/report/track");
        return response.data;
    },

    // Get track report by track and week
    getTrackReport: async (track, weekNumber) => {
        const response = await api.get(`/report/track/${track}/${weekNumber}`);
        return response.data;
    },

    // Get all track reports for a specific week
    getTrackReportsByWeek: async (weekNumber) => {
        const response = await api.get(`/report/track/week/${weekNumber}`);
        return response.data;
    },

    // Get all track reports for a specific track
    getTrackReportsByTrack: async (track, weekNumber) => {
        const params = weekNumber ? { weekNumber } : {};
        const response = await api.get(`/report/track/track/${track}`, { params });
        return response.data;
    },

    // Get weekly reports for a specific week
    getWeeklyReports: async (weekNumber, year) => {
        const params = year ? { year } : {};
        const response = await api.get(`/report/weekly/${weekNumber}`, { params });
        return response.data;
    },

    // Get weekly report statistics
    getWeeklyReportStats: async (weekNumber, year) => {
        const params = year ? { year } : {};
        const response = await api.get(`/report/weekly/${weekNumber}/stats`, { params });
        return response.data;
    },

    // Delete track report
    deleteTrackReport: async (trackReportId) => {
        const response = await api.delete(`/report/track/${trackReportId}`);
        return response.data;
    },
};

export default reportService;

