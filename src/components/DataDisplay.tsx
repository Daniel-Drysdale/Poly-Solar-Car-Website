import { useEffect, useState } from "react";

interface TimestampedEntry {
  [key: string]: Array<[number, Record<string, number>, string]>;
}

interface SolarCarData {
  body: TimestampedEntry;
}

const DataDisplay = () => {
  const BASE_URL = import.meta.env.VITE_BASE_DB_URL;
  const [Data, setData] = useState<SolarCarData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_data`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const jsonData: SolarCarData = await response.json();
        setData(jsonData);

        if (Object.keys(jsonData).length === 0) {
          ("");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, [BASE_URL]);

  const entries = Data?.body ? Object.entries(Data.body) : [];

  return (
    <div style={{ marginTop: "25px", width: "100%" }} className="center-div">
      {Array.from({ length: Math.ceil(entries.length / 3) }, (_, rowIndex) => {
        const rowItems = entries.slice(rowIndex * 3, rowIndex * 3 + 3);

        return (
          <div className="row" style={{ color: "aliceblue" }} key={rowIndex}>
            {rowItems.map(([sectionKey, timeSeriesArray]) => {
              const latestEntry = timeSeriesArray[timeSeriesArray.length - 1];

              const latestData = latestEntry?.[1];

              return (
                <div
                  className="col"
                  key={sectionKey}
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginBottom: "40px",
                  }}
                >
                  <div className="display-box data-box center-div">
                    <center>
                      <h4
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        {sectionKey.replace(/_/g, " ")}
                      </h4>
                    </center>

                    <div className="data-item"></div>

                    {latestData ? (
                      Object.entries(latestData).map(([label, value]) => (
                        <div
                          className="data-item"
                          key={label}
                          style={{ minWidth: "300px" }}
                        >
                          <b>{label.replace(/_/g, " ")}</b>:
                          <span style={{ float: "right" }}>
                            {value === -999 && "NAN"}

                            {value !== -999 && value.toFixed(3)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="data-item">No data</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DataDisplay;
