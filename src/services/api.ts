import axios from 'axios';

const BASE = 'https://api.coinstats.app/public/v1/';

const COMERCIAL_COIN =
  'https://v6.exchangerate-api.com/v6/c87de6b059e6791749e979f7/latest/BRL';

export const api = axios.create({
  baseURL: BASE,
});

export const comercialCoin = axios.create({
  baseURL: COMERCIAL_COIN,
});

export const apiLocal = axios.create({
  baseURL:'http://localhost:3000/api/',
});
