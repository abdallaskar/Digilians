import api from "./axiosConfig";

const sheetService = {
    getSheets: async (type) => {
        const response = await api.get("/sheets", {
            params: { type }, // query param => /sheets?type=General
        });
        return response.data;
    },

    addSheet: async (sheetData) => {
        const response = await api.post("/sheets", sheetData);
        return response.data;
    },

    updateSheet: async (id, updatedSheet) => {

        const response = await api.patch(`/sheets/${id}`, updatedSheet);
        return response.data;
    },

    deleteSheet: async (id) => {
        const response = await api.delete(`/sheets/${id}`);
        return response.data;
    },
};

export default sheetService;
