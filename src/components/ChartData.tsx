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

const extractValues = (arr: [string, number][]) =>
  arr.map(([, value]) => value);

const generateTimeLabels = (length: number) => {
  const now = Date.now();
  return Array.from({ length }, (_, i) => {
    const timestamp = new Date(now - (length - 1 - i) * 1000);
    return timestamp.toLocaleTimeString();
  });
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
    if (!password) {
      navigate("/");
    }
  }, [password, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_graph_data`);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const jsonData: SolarCarData = await response.json();

        const newCurrent = extractValues(jsonData.body.Pack_Current);
        const newVoltage = extractValues(jsonData.body.Pack_Voltage);
        const newSOC = extractValues(jsonData.body.Pack_SoC);
        const newSOCPercentage = extractValues(
          jsonData.body.Pack_SoC_Percentage
        );

        setCurrent((prev) => [...prev, ...newCurrent].slice(-150));
        setVoltage((prev) => [...prev, ...newVoltage].slice(-150));
        setSOC((prev) => [...prev, ...newSOC].slice(-150));
        setPackSoCPercentage((prev) =>
          [...prev, ...newSOCPercentage].slice(-150)
        );

        const labels = generateTimeLabels(150);
        setCurrentLabels(labels);
        setVoltageLabels(labels);
        setSOCLabels(labels);
        setSocPercentLabels(labels);
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
          <b> !! The most recent data will be on the right !!</b>
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
            maxX={150}
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
            maxX={150}
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
            minY={0}
            maxX={150}
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
            maxX={150}
            maxY={100}
          />
        </div>
      </center>
    </>
  );
};

export default ChartData;
