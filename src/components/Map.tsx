import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import message from "/src/assets/message.png";

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
    const auth = sessionStorage.getItem("auth");

    if (!password && auth !== password) {
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
      <div className="center-div" style={{ marginTop: "50px" }}>
        <img src={message} style={{ width: "75%", marginLeft: "15%" }} />
      </div>
      <canvas> </canvas>
    </>
  );
};

export default Map;
