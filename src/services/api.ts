import axios from "axios";

const BASE = 'https://api.coinstats.app/public/v1/';

export const api = axios.create({
    baseURL: BASE,
});