import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "77c3862bac6c66a85f8f58fb2533f8b1",
    language: "ko-KR"
  }
});

export default instance;
