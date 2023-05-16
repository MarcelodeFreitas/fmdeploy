import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import "./Auth.css";
import querystring from "querystring";
import StoreContext from "../Store/Context";
import Cards from "../Cards";
import Footer from "../Footer";
import CustomizedSnackbar from "../Alert";
import axiosInstance from "../axios/axiosInstance";
import ResponsiveAppBar from "../AppBar";
import { Box } from "@material-ui/core";

const initialState = () => {
  return { name: "", email: "", password: "", confirmPassword: "", error: "" };
};

const style = {
  minWidth: "320px",
  marginBottom: "40px",
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

//login function
const login = async (email, password) => {
  let errorMessage = "";
  let token = "";
  let role = "";
  if (email === "" || password === "") {
    console.log(email, password);
    errorMessage = "Email or password is blank";
    return { token: token, role: role, errorMessage: errorMessage };
  } else {
    try {
      const response = await axiosInstance.post(
        "/login",
        querystring.stringify({
          username: email,
          password: password,
        })
      );
      token = response.data.access_token;
      role = response.data.user_role;
      /* console.log("login response_data:", response.data);
      console.log("login success", token, role); */
      return { token: token, role: role, errorMessage: errorMessage };
    } catch (e) {
      console.log("login error: ", e);
      errorMessage = "";
      if (e.message === "Network Error") {
        errorMessage = e.message;
      } else {
        errorMessage = e.response.data.detail;
      }
      return { token: token, role: role, errorMessage: errorMessage };
    }
  }
};

//register function
const register = async (name, email, password, confirmPassword) => {
  console.log(name, email, password, confirmPassword);
  let errorMessage = "";
  if (password !== confirmPassword) {
    errorMessage = "Passwords do not match!";
    return { errorMessage: errorMessage };
  }
  try {
    await axiosInstance.post("/user", {
      name: name,
      email: email,
      password: password,
    });
    errorMessage = "Account created successfully!";
    return { errorMessage: errorMessage };
  } catch (e) {
    console.log("register error: ", e);
    errorMessage = "";
    if (e.message === "Network Error") {
      errorMessage = e.message;
    } else {
      errorMessage = e.response.data.detail;
    }
    return { errorMessage: e.response.data.detail };
  }
};

export default function Auth() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [signin, setSignin] = useState(true);

  const { setToken } = useContext(StoreContext);
  const { setRole } = useContext(StoreContext);

  const history = useHistory();

  const onChange = (event) => {
    const { value, name } = event.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault(); //dont reload the page

    if (signin) {
      try {
        const { token, role, errorMessage } = await login(
          details.email,
          details.password
        );

        if (token) {
          setToken(token);
          setRole(role);
          if (role === "admin") {
            return history.push("/user-management");
          } else if (role === "user") {
            return history.push("/my");
          } else if (role === "guest") {
            return history.push("/shared");
          } else {
            console.log("Auth.js role error");
          }
        }

        if (errorMessage) {
          console.log(errorMessage);
          setError(errorMessage);
          setTimeout(() => setError(""), 4000);
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (!signin) {
      try {
        const { errorMessage } = await register(
          details.name,
          details.email,
          details.password,
          details.confirmPassword
        );

        if (errorMessage) {
          console.log(errorMessage);
          setError(errorMessage);
          setTimeout(() => setError(""), 4000);
        }
      } catch (e) {
        console.log(e);
      }

      try {
        const { token, role, errorMessage } = await login(
          details.email,
          details.password
        );

        if (token) {
          setToken(token);
          setRole(role);
          if (role === "guest") {
            return history.push("/shared");
          } else {
            return history.push("/my");
          }
        }

        if (errorMessage) {
          console.log(errorMessage);
          setError(errorMessage);
          setTimeout(() => setError(""), 4000);
        }
      } catch (e) {
        console.log(e);
      }
    }

    setDetails(initialState);
    setToken("");
    setRole("");
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className={"login-container"}>
        <Box sx={style}>
          {error && <CustomizedSnackbar message={error} severity="error" />}
          <form className={"form"} onSubmit={submitHandler}>
            <div className={"top"}>
              <img
                className={"login-logo"}
                src={window.location.origin + "/logo192.png"}
                alt="FMdeploy.jpg"
              />
            </div>
            <div className={"slider"}>
              <div className={"slider-labels"}>
                {signin && (
                  <p className={"slider-text"} style={{ color: "#0385B0" }}>
                    Login
                  </p>
                )}
                {!signin && (
                  <p
                    className={"slider-text"}
                    onClick={() => {
                      setSignin(true);
                      setError("");
                    }}
                  >
                    Login
                  </p>
                )}

                {signin && (
                  <p
                    className={"slider-text"}
                    onClick={() => {
                      setSignin(false);
                      setError("");
                    }}
                  >
                    Register
                  </p>
                )}
                {!signin && (
                  <p className={"slider-text"} style={{ color: "#0385B0" }}>
                    Register
                  </p>
                )}
              </div>
              {signin && <hr style={{ borderColor: "#0385B0" }} />}
              {!signin && <hr style={{ borderColor: "#fff" }} />}
              {signin && <hr style={{ borderColor: "#fff" }} />}
              {!signin && <hr style={{ borderColor: "#0385B0" }} />}
            </div>
            <div className={"inner-form"}>
              {/* {error && (
              <p style={{ color: "white", textAlign: "center", paddingBottom: "20px" }}>{error}</p>
            )} */}
              {!signin && (
                <div className={"form-group"}>
                  <label className="auth-label" htmlFor="text">
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    onChange={onChange}
                    value={details.name}
                    required
                  />
                </div>
              )}
              <div className={"form-group"}>
                <label className="auth-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="auth-input auth-email"
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChange}
                  value={details.email}
                  required
                />
              </div>
              <div className={"form-group"}>
                <label className="auth-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="auth-input"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onChange}
                  value={details.password}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must Contain 8 Characters, One Uppercase, One Lowercase, and One Number"
                  required
                />
              </div>
              {!signin && (
                <div className={"form-group"}>
                  <label className="auth-label" htmlFor="password">
                    Confirm password
                  </label>
                  <input
                    className="auth-input"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={onChange}
                    value={details.confirmPassword}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                  />
                </div>
              )}
              {signin && (
                <div className={"button-holder"}>
                  <input className="auth-button" type="submit" value="LOGIN" />
                </div>
              )}
              {!signin && (
                <div className={"button-holder"}>
                  <input
                    className="auth-button"
                    type="submit"
                    value="REGISTER"
                  />
                </div>
              )}
            </div>
          </form>
        </Box>
      </div>
      {/* <div className={"login-container"}>
        <AuthContainer />
      </div>
      <AuthModal /> */}
      <Cards />
      <Footer />
    </>
  );
}
