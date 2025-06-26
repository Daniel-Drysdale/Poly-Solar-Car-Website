import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

// interface SolarCarData {
//   body: TimestampedEntry;
// }

// interface TimestampedEntry {
//   [key: string]: Array<[number, Record<string, number>, string]>;
// }

const Map = () => {
  //const [data, setData] = useState<SolarCarData | null>(null);

  //const BASE_URL = import.meta.env.VITE_BASE_DB_URL;

  const location = useLocation();
  const { password } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!password) {
      navigate("/");
    }
  }, [password, navigate]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/`);
  //       if (!response.ok) throw new Error(`Status: ${response.status}`);
  //       const jsonData = await response.json();
  //       setData(jsonData);

  //       if (Object.keys(jsonData).length === 0) {
  //         ("");
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };

  //   fetchData();
  // }, [BASE_URL]);

  return (
    <>
      <Dropdown
        onSelect={(view) => {
          if (view === "data") {
            navigate("/data/", { state: { password } });
          } else if (view === "charts") {
            navigate("/charts/", { state: { password } });
          } else if (view === "map") {
            navigate("/map/", { state: { password } });
          }
        }}
      />
      <div style={{ marginTop: "30px" }}>
        <canvas> </canvas>
      </div>
    </>
  );
};

export default Map;
