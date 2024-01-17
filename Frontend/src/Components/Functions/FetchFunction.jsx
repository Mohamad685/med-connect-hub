import axiosHelper from "./AxiosHelper";

export  const fetchHelper={
    get: async (url, params = {}) => {
        try {
            const response = await axiosHelper.get(url, { params });
            return response.data;
        } catch (error) {
            console.error('API call error: ', error);
            throw error;
        }
    },

    post: async (url, data = {}) => {
        try {
            const response = await axiosHelper.post(url, { data });
            return response.data;
        } catch (error) {
            console.error('API call error: ', error);
            throw error;
        }
    },

    put: async (url, data = {}) => {
        try {
            const response = await axiosHelper.put(url, { data });
            return response.data;
        } catch (error) {
            console.error('API call error: ', error);
            throw error;
        }
    },


}
export default fetchHelper;
