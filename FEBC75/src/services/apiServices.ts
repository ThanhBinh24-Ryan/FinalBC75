import axios from "axios";

type ConfigType = {
  headers: any;
};

const api = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use((config: ConfigType) => {
  // Lấy userData từ localStorage
  const userData = localStorage.getItem("userData");
  let accessToken = "";

  if (userData) {
    try {
      const parsedUserData = JSON.parse(userData); // Phân tích JSON
      accessToken = parsedUserData.token; // Lấy token từ userData
      console.log("Token từ localStorage:", accessToken);
    } catch (error) {
      console.error("Lỗi phân tích userData từ localStorage:", error);
    }
  }

  // Thêm token vào headers
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NSIsIkhldEhhblN0cmluZyI6IjIxLzA1LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0Nzc4NTYwMDAwMCIsIm5iZiI6MTcyMDg5MDAwMCwiZXhwIjoxNzQ3OTMzMjAwfQ.HdSOdENfWNAr5C4CemzCCFNsB1DIvQDRBpEJSsOdpA8",
  };

  return config;
});


export default api;
