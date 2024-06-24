import environment from "@/app/environment/environment.js";

const API_URL = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api`;

const apiService = {
    async getData(endpoint) {
        try {
            const api_url = `${API_URL}/${endpoint}`;
            const request = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await fetch(api_url, request);
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    },

    async postData(endpoint, data) {
        try {
            const url = `${API_URL}/${endpoint}`;
            const request = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            const response = await fetch(url, request);
            console.log("Created Successfully", response);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    async deleteData(endpoint, id) {
        try {
            const url = `${API_URL}/${endpoint}/${id}`;
            const request = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(url, request);
            console.log("Deleted Successfully", response);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getProdPhotoURL(nameImg) {
        return `${API_URL}/prod_photo/${nameImg}`;
    },

    getDecorPhotoURL(nameImg) {
        return `${API_URL}/decor_photo/${nameImg}`;
    },
};

export default apiService;
