import axios from "axios";

const baseURL = "https://deezer-wrapper.onrender.com";

const axiosInstance = axios.create({ baseURL });

async function search({ query }) {
    try {
        const response = await axiosInstance.get("/search", {
            params: { q: query },
        });
        return response.data;
    } catch (error) {
        throw { error: "An error occurred" };
    }
}
async function fetchArtist(id) {
    try {
        const response = await axiosInstance.get("/artist", {
            params: { id },
        });
        return response.data;
    } catch (error) {
        throw { error: "An error occurred" };
    }
}
async function fetchArtistTracks(id) {
    try {
        const response = await axiosInstance.get("/artist/top", {
            params: { id },
        });
        return response.data;
    } catch (error) {
        throw { error: "An error occurred" };
    }
}
async function fetchArtistAlbums(id) {
    try {
        const response = await axiosInstance.get("/artist/albums", {
            params: { id },
        });
        return response.data;
    } catch (error) {
        throw { error: "An error occurred" };
    }
}

const api = { search, fetchArtist, fetchArtistAlbums, fetchArtistTracks };

export default api;
