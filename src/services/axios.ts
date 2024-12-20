import { API_BASE_URL} from "../constants/api";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 250000,
});
