import axios from "axios";
console.log('process.env.BASE_API',process.env.REACT_APP_BASE_API)
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    timeout: 8000,
    headers: {'X-Custom-Header': 'foobar'}
  });