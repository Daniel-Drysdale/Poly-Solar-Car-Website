import { useEffect, useState } from "react";

type SolarCarData = {
  userId: number;
  id: number;
  title: string;
};

const DataDisplay = () => {
  const BASE_URL = import.meta.env.VITE_BASE_DB_URL;

  const [Data, setData] = useState<SolarCarData>({
    id: 0,
    userId: 0,
    title: "(Defaults) Some statistics there",
  });

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const DBresponse = await fetch(BASE_URL, { method: "GET" });

        if (!DBresponse.ok) {
          throw new Error(`Error in Fetch, Status: ${DBresponse.status}`);
        }

        const DBJsonData = await DBresponse.json();

        setData(DBJsonData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetch_data();

    const intervalId = setInterval(fetch_data, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>{Data.userId}</div>
      <div>{Data.id}</div>
      <div>{Data.title}</div>
    </>
  );
};

export default DataDisplay;
