export const instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });