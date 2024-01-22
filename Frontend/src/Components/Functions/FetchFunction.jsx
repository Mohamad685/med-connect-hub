import axiosHelper from "./AxiosHelper";

const fetchHelper = {
	get: async (url, params = {}) => {
		try {
			const response = await axiosHelper.get(url, { params });

			if (response.status === 200) {
				console.log("GET Success:", response.data);
				return response.data;
			} else {
				throw new Error(
					`Server responded with status code: ${response.status}`
				);
			}
		} catch (error) {
			console.error("GET API call error: ", error);
			throw error;
		}
	},

	post: async (url, data = {}, headers = {}) => {
		try {
			if (data instanceof FormData) {
				headers["Content-Type"] = "multipart/form-data";
			}

			const response = await axiosHelper.post(url, data, { headers });

			if (response.status === 200|| response.status === 201) {
				console.log("POST Success:", response.data);
				return response.data;
			} else {
				throw new Error(
					`Server responded with status code: ${response.status}`
				);
			}
		} catch (error) {
			console.error("POST API call error: ", error);
			throw error;
		}
	},

	put: async (url, data = {}) => {
		try {
			const response = await axiosHelper.put(url, data);

			if (response.status === 200) {
				console.log("PUT Success:", response.data);
				return response.data;
			} else {
				throw new Error(
					`Server responded with status code: ${response.status}`
				);
			}
		} catch (error) {
			console.error("PUT API call error: ", error);
			throw error;
		}
	},

	delete: async (url, data = {}) => {
		try {
			const response = await axiosHelper.delete(url, { data });
	
			if (response.status === 200 || response.status === 204) {
				console.log("DELETE Success:", response.data);
				return response.data;
			} else {
				throw new Error(`Server responded with status code: ${response.status}`);
			}
		} catch (error) {
			console.error("DELETE API call error: ", error);
			throw error;
		}
	}
};

export default fetchHelper;
