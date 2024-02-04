import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: false,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

export const userService = {
    async getAllUsers() {
        try {
            let response = await apiClient.get("/users");
            return response.data; // Devuelve los datos obtenidos
        } catch (error) {
            console.error("Error al obtener datos:", error);
            throw error; // Propaga el error para que se maneje en la aplicación
        }
    },

    async submitUser(newUser) {
        try {
            await apiClient.post("/users", newUser);
        } catch (error) {
            console.error("Error al agregar usuario:", error);
            throw error; // Propaga el error para que se maneje en la aplicación
        }
    }
};
