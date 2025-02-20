import axios from "axios";
import { useEffect, useState } from "react";
import { Track } from "react-native-track-player";

// Create a custom hook to manage the song data
export const useSongData = () => {
  const [data, setData] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://6721f1212108960b9cc22b59.mockapi.io/songs"
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
