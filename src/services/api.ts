import axios from "axios";

const BASE = 'https://api.coinstats.app/public/v1/';

const COMERCIAL_COIN = 'https://v6.exchangerate-api.com/v6/5b874dc17f465fd89d6578db/pair/USD/BRL';

export const api = axios.create(
    {
        baseURL: BASE,
    },

);

export const comercialCoin = axios.create(
    {
        baseURL: COMERCIAL_COIN,
    },
);
