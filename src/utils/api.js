import axios from "axios";

console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);

const api = axios.create({
  // baseURL: `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5500"}/api`,
  baseURL: `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api`,
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + sessionStorage.getItem("token"),
  },
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem("token"); // JWT 토큰 가져오기
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`; // Authorization 헤더에 추가
    }
    return request;
  },
  (error) => {
    console.log("REQUEST ERROR111", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.error("RESPONSE ERROR222", error.response); // 전체 응답 객체 출력
    error = error.response.data; // 오류 데이터 추출
    console.log("Error Data:", error); // 오류 데이터도 출력
    return Promise.reject(error);
  }
);

export default api;