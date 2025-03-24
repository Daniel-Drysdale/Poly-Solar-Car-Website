import { useEffect, useState } from "react";

type SolarCarData = {
  //Replace this as neccessary for InfluxDB
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
      <div style={{ marginTop: "50px" }} className="center-div">
        <div
          className="row "
          style={{ color: "aliceblue", textAlign: "center" }}
        >
          <div
            style={{ width: "250px" }}
            className="col display-box center-div"
          >
            <h5>Gyroscope + Velocity</h5>
            <div className="data-item"> Speed: ######</div>
            <div className="data-item"> Pitch: ######</div>
            <div className="data-item">Roll: ######</div>
            <div className="data-item">Yaw: ######</div>
          </div>
          <div
            style={{ width: "500px" }}
            className="col display-box center-div"
          >
            <h5>Solar Panel Array</h5>
            <div className="data-item">Voltage: ######</div>
            <div className="data-item"> Amperage: #####</div>
            <div className="data-item">Wattage: ######</div>
            <div className="data-item">Power Production: #####</div>
            <div className="data-item">Power Consumption: #####</div>
          </div>
        </div>
        <div
          className="row"
          style={{ color: "aliceblue", textAlign: "center" }}
        >
          <div className="col display-box" style={{ width: "100px" }}>
            <h5>Battery</h5>
            <div className="data-item">Voltage: ######</div>
            <div className="data-item"> Amperage: #####</div>
            <div className="data-item">Wattage: ######</div>
            <div className="data-item">Power Production: #####</div>
            <div className="data-item">Power Consumption: #####</div>
          </div>
          <div style={{ width: "500px" }} className="col display-box">
            <h5>Misc.</h5>
            <div className="data-item">Time Since Start: ######</div>
            <div className="data-item"> Est. Remaining Time: #####</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataDisplay;
