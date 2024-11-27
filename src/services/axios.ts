import axios from "axios";

const ONRENDER_URL = import.meta.env.VITE_ONRENDER_SERVER_DEV_URL;
const AWS_URL = import.meta.env.VITE_ONRENDER_SERVER_DEV_URL;
const LOCAL_URL = import.meta.env.VITE_LOCAL_SERVER_DEV_URL;

console.log(LOCAL_URL);

export const instance = axios.create({
  baseURL: ONRENDER_URL,
});
