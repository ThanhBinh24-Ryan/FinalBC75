import axios from "axios";

const api = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use((config: any) => {
  const userLocal = localStorage.getItem("user");
  const currentUSer = userLocal ? JSON.parse(userLocal) : null;
  const userToken = localStorage.getItem("userToken");
  const currentUSerToken = JSON.parse(userToken!);
  config.headers = {
    ...config.headers,
    Authorization: currentUSer ? `Bearer ${currentUSer.accessToken}` : "",
    token: currentUSerToken,
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NSIsIkhldEhhblN0cmluZyI6IjIxLzA1LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0Nzc4NTYwMDAwMCIsIm5iZiI6MTcyMDg5MDAwMCwiZXhwIjoxNzQ3OTMzMjAwfQ.HdSOdENfWNAr5C4CemzCCFNsB1DIvQDRBpEJSsOdpA8",
  };
  return config;
});

export default api;
