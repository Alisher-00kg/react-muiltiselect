import axios from "axios";

export default async function handler(res) {
  try {
    const response = await axios.get(
      "http://tivaliclub.com:8061/api/Timezones"
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Ошибка при прокси-запросе:", error.message);
    res.status(500).json({ error: "Не удалось получить временные зоны" });
  }
}
