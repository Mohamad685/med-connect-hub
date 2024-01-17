import axiosHelper from "./AxiosHelper";

export  const fetchHelper={
    get: async (url, params = {}) => {
        try {
            const response = await axiosInstance.get(url, { params });
            return response.data;
        } catch (error) {
            console.error('API call error: ', error);
            throw error;
        }
    },
}
export default apiService;
