import axios from "axios";
import { ResultDataType } from "../utils/types";

export const api = axios.create({
  baseURL: "https://nsdkin.ru",
});

export const sendData = async (data: ResultDataType) => {
  try {
    const response = await api.post(`/send_data`, data);
    return response.data;
  } catch (error) {
    // Обработка ошибки
    throw new Error("Ошибка при отправке данных");
  }
};
