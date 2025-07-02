import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const correctPassword = import.meta.env.VITE_TEAM_PASSWORD;
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleLoginSubmit = async (): Promise<void> => {
    if (password !== correctPassword) {
      alert("Incorrect Credentials, try again.");
      return;
    }
    sessionStorage.setItem("auth", password);
    navigate("/data", { state: { password: password } });
  };

  return (
    <>
      <div
        className="display-box center-div"
        style={{ width: "90%", maxWidth: "500px", marginTop: "10%" }}
      >
        <center>
          <div
            className="center-div"
            style={{
              textAlign: "center",
              height: "350px",

              color: "white",
              verticalAlign: "middle",
            }}
          >
            <center>
              <b>
                <label
                  htmlFor="confirmPassword"
                  className="form-label"
                  style={{
                    marginTop: "40px",
                    marginBottom: "10px",
                  }}
                >
                  <h4> Enter Team Password:</h4>
                </label>
              </b>
            </center>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Enter Team Password Here..."
              onChange={handlePasswordChange}
            />
            <button
              className="btn btn-primary"
              style={{
                marginTop: "50px",
                paddingLeft: "25px",
                paddingRight: "25px",
              }}
              onClick={handleLoginSubmit}
            >
              <b>Submit</b>
            </button>
          </div>
        </center>
      </div>
    </>
  );
};

export default Login;
