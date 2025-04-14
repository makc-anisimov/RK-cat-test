import { useState, useEffect } from "react";
import { Checkbox } from "../checkbox/checkbox";
import styles from "./cats.module.scss";

export const Cats = () => {
  const [catImage, setCatImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isAutoFetch, setIsAutoFetch] = useState<boolean>(false);

  const fetchCatImage = async () => {
    if (!isEnabled) return; // Блокируем запрос, если функционал отключен
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await response.json();
      if (data && data[0]?.url) {
        setCatImage(data[0].url);
      } else {
        setError("No image found");
      }
    } catch (err) {
      console.error("Error fetching cat image:", err); // Логируем ошибку
      setError("Failed to fetch cat image");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: number | null = null; // Изменено на number
    if (isAutoFetch && isEnabled) {
      interval = window.setInterval(fetchCatImage, 5000); // Используем window.setInterval
    }
    return () => {
      if (interval !== null) clearInterval(interval); // Проверяем, что interval не null
    };
  }, [isAutoFetch, isEnabled]);

  return (
    <div className={styles.catImageContainer}>
      <div className={styles.checkboxContainer}>
        <Checkbox
          label="Enabled"
          checked={isEnabled}
          onChange={setIsEnabled}
        />
        <Checkbox
          label="Auto-refresh every 5 seconds"
          checked={isAutoFetch}
          onChange={setIsAutoFetch}
        />
      </div>
      <button
        className={styles.button}
        onClick={fetchCatImage}
        disabled={!isEnabled || loading} // Блокируем кнопку, если функционал отключен или идет загрузка
      >
        {loading ? "Loading..." : "Get Cat"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {catImage && <img src={catImage} alt="A cute cat" className={styles.catImage} />}
    </div>
  );
};