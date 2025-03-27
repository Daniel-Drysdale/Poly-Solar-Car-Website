import { useEffect, useState } from "react";
import LineChart from "./LineChart";

type SolarCarData = {
  //Replace this as neccessary for InfluxDB
  userId: number;
  id: number;
  title: string;
};

const DataDisplay = () => {
  const BASE_URL = import.meta.env.VITE_BASE_DB_URL;

  function generateRandomNumbers() {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * (9 - 1)) + 1; // Generates a number between 5 and 9
      randomNumbers.push(randomNum);
    }
    return randomNumbers;
  }
  const [ChartData, setChartData] = useState<number[]>();

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
        setChartData(generateRandomNumbers());

        setData(DBJsonData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetch_data();

    const intervalId = setInterval(fetch_data, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div style={{ marginTop: "25px", width: "100%" }} className="center-div">
        <div className="row " style={{ color: "aliceblue" }}>
          <div
            style={{ minWidth: "400px", maxWidth: "800px", maxHeight: "400px" }}
            className="col display-box"
          >
            <h5 style={{ textAlign: "center", paddingBottom: "10px" }}>
              Gyroscope + Velocity
            </h5>
            <div className="data-item"> Speed: ######</div>
            <div className="data-item"> Pitch: ######</div>
            <div className="data-item">Roll: ######</div>
            <div className="data-item">Yaw: ######</div>
          </div>
          <div
            style={{ minWidth: "400px", maxWidth: "800px", minHeight: "400px" }}
            className="col display-box "
          >
            <h5 style={{ textAlign: "center", paddingBottom: "10px" }}>
              Solar Panel Array
            </h5>
            <div>
              <LineChart data={ChartData} />
            </div>
          </div>
        </div>
        <div className="row" style={{ color: "aliceblue" }}>
          <div
            className="col display-box"
            style={{ minWidth: "400px", maxWidth: "800px", minHeight: "200px" }}
          >
            <h5 style={{ textAlign: "center", paddingBottom: "10px" }}>
              Battery
            </h5>
            <div className="data-item">Voltage: {Data.id}</div>
            <div className="data-item"> Amperage: {Data.title}</div>
            <div className="data-item">Wattage: {Data.userId}</div>
            <div className="data-item">Power Production: #####</div>
            <div className="data-item">Power Consumption: #####</div>
          </div>
          <div
            style={{ width: "50%", minWidth: "400px", minHeight: "200px" }}
            className="col display-box"
          >
            <h5 style={{ textAlign: "center", paddingBottom: "10px" }}>
              Misc.
            </h5>
            <div className="data-item">Time Since Start: ######</div>
            <div className="data-item"> Est. Remaining Time: #####</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataDisplay;
