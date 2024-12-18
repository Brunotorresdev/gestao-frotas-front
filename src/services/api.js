import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 12000,
  headers: { "X-Custom-Header": "foobar" },
});
