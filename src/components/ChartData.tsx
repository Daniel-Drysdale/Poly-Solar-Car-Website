import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import LineChart from "./ChartTemplate";

type TimestampedData = [string, number];

interface SolarCarData {
  body: {
    Pack_Current: TimestampedData[];
    Pack_SoC: TimestampedData[];
    Pack_SoC_Percentage: TimestampedData[];
    Pack_Voltage: TimestampedData[];
  };
}

const sortByTimestamp = (data: TimestampedData[]): TimestampedData[] =>
  [...data].sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());

const processData = (data: TimestampedData[]) => {
  const sorted = sortByTimestamp(data);
  const values = sorted.map(([, val]) => val);
  const labels = sorted.map(([ts]) =>
    new Date(ts).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    })
  );
  return { values, labels };
};

const ChartData = () => {
  const [current, setCurrent] = useState<number[]>([]);
  const [voltage, setVoltage] = useState<number[]>([]);
  const [packSoCPercentage, setPackSoCPercentage] = useState<number[]>([]);
  const [SOC, setSOC] = useState<number[]>([]);

  const [currentLabels, setCurrentLabels] = useState<string[]>([]);
  const [voltageLabels, setVoltageLabels] = useState<string[]>([]);
  const [SOCLabels, setSOCLabels] = useState<string[]>([]);
  const [socPercentLabels, setSocPercentLabels] = useState<string[]>([]);

  const BASE_URL = import.meta.env.VITE_BASE_DB_URL;
  const location = useLocation();
  const { password } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (!password && auth !== password) {
      navigate("/");
    }
  }, [password, navigate]);

  //GET request is sent to the PI for chart data every 5 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_graph_data`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const jsonData: SolarCarData = await response.json();

        //Sorts Timestamps so they aren't incorrectly displayed
        const { values: newCurrent, labels: currentTimestamps } = processData(
          jsonData.body.Pack_Current
        );
        const { values: newVoltage, labels: voltageTimestamps } = processData(
          jsonData.body.Pack_Voltage
        );
        const { values: newSOC, labels: socTimestamps } = processData(
          jsonData.body.Pack_SoC
        );
        const { values: newSOCPercentage, labels: socPercentTimestamps } =
          processData(jsonData.body.Pack_SoC_Percentage);

        //Update rolling state arrays (max 500 entries)
        setCurrent((prev) => [...prev, ...newCurrent].slice(-500));
        setVoltage((prev) => [...prev, ...newVoltage].slice(-500));
        setSOC((prev) => [...prev, ...newSOC].slice(-500));
        setPackSoCPercentage((prev) =>
          [...prev, ...newSOCPercentage].slice(-500)
        );

        setCurrentLabels((prev) => [...prev, ...currentTimestamps].slice(-500));
        setVoltageLabels((prev) => [...prev, ...voltageTimestamps].slice(-500));
        setSOCLabels((prev) => [...prev, ...socTimestamps].slice(-500));
        setSocPercentLabels((prev) =>
          [...prev, ...socPercentTimestamps].slice(-500)
        );
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [BASE_URL]);

  return (
    <>
      <Dropdown
        onSelect={(view) => {
          if (view === "data") {
            navigate("/data", { state: { password } });
          } else if (view === "charts") {
            navigate("/charts", { state: { password } });
          } else if (view === "map") {
            navigate("/map", { state: { password } });
          }
        }}
      />

      <center style={{ marginTop: "15px" }}>
        <p style={{ color: "white" }}>
          <b>!! The most recent data will be on the right !!</b>
        </p>

        <div
          style={{ maxWidth: "80%", minWidth: "400px", marginBottom: "30px" }}
        >
          <LineChart
            data={current}
            labels={currentLabels}
            labelX="Time (s)"
            labelY="Current (A)"
            minX={0}
            minY={-40}
            maxX={500}
            maxY={40}
          />
        </div>

        <div
          style={{ maxWidth: "80%", minWidth: "400px", marginBottom: "30px" }}
        >
          <LineChart
            data={voltage}
            labels={voltageLabels}
            labelX="Time (s)"
            labelY="Voltage (V)"
            minX={0}
            minY={0}
            maxX={500}
            maxY={120}
          />
        </div>

        <div
          style={{ maxWidth: "80%", minWidth: "400px", marginBottom: "30px" }}
        >
          <LineChart
            data={SOC}
            labels={SOCLabels}
            labelX="Time (s)"
            labelY="State of Charge"
            minX={0}
            minY={-10}
            maxX={500}
            maxY={15}
          />
        </div>

        <div
          style={{ maxWidth: "80%", minWidth: "400px", marginBottom: "30px" }}
        >
          <LineChart
            data={packSoCPercentage}
            labels={socPercentLabels}
            labelX="Time (s)"
            labelY="SoC %"
            minX={0}
            minY={0}
            maxX={500}
            maxY={100}
          />
        </div>
      </center>
    </>
  );
};

export default ChartData;
