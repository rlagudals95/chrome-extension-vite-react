import { PRODUCTION } from "../constants";
import axios from "axios";

// axios 인스턴스를 만들 때 구성 기본 값 설정
const AxiosInstance = axios.create();

AxiosInstance.defaults.withCredentials = true; // API에도 cookie가 함께 전송 될 수 있도록 설정
AxiosInstance.defaults.baseURL = PRODUCTION
  ? "https://apis-studio.ohoolabs.com/prod/v1"
  : "https://apis-studio.ohoolabs.com/dev/v1";
AxiosInstance.defaults.timeout = 30000;

export default AxiosInstance;
