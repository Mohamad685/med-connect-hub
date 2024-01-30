import axiosHelper from "./AxiosHelper";

const fetchHelper = {
	get: async (url, params = {}) => {
		try {
			const response = await axiosHelper.get(url, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				params,
			});

			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error(
					`Server responded with status code: ${response.status}`
				);
			}
		} catch (error) {
			throw error;
		}
	},

	post: async (url, data = {}, headers = {}) => {
		try {
			if (data instanceof FormData) {
				headers["Content-Type"] = "multipart/form-data";
			}

			const response = await axiosHelper.post(url, data, { headers });

			if (response.status === 200 || response.status === 201) {
				return response.data;
			} else {
				throw new Error(
					`Server responded with status code: ${response.status}`
				);
			}
		} catch (error) {
			throw error;
		}
	},

	put: async (url, data = {}) => {
		try {
			const response = await axiosHelper.put(url, data);

			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error(
					`Server responded with status code: ${response.status}`
				);
			}
		} catch (error) {
			throw error;
		}
	},

	delete: async (url, data = {}) => {
		try {
			const response = await axiosHelper.delete(url, { data });

			if (response.status === 200 || response.status === 204) {
				return response.data;
			} else {
				throw new Error(
					`Server responded with status code: ${response.status}`
				);
			}
		} catch (error) {
			throw error;
		}
	},
};

export default fetchHelper;
