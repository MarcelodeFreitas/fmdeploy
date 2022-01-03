import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import "../../App.css"
import "./Auth.css"
import baseUrl from "../server/server"
import querystring from "querystring"
import axios from "axios"
import StoreContext from "../Store/Context"
import Navbar from "../Navbar"
import Cards from '../Cards'
import CustomizedSnackbar from "../Alert"

const initialState = () => {
  return { name: "", email: "", password: "", confirmPassword: "", error: "" }
}

//login function
const login = async (email, password) => {
  let errorMessage = ""
  let token = ""
  if (email === "" || password === "") {
    console.log(email, password)
    errorMessage = "Email or password is blank"
    return { token: token, errorMessage: errorMessage }
  } else {
    try {
      const response = await axios.post(
        `${baseUrl}/login`,
        querystring.stringify({
          username: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      token = response.data.access_token
      return { token: token, errorMessage: errorMessage }
    } catch (e) {
      console.log("login error: ", e)
      errorMessage = ""
      if (e.message === "Network Error") {
        errorMessage = e.message
      } else {
        errorMessage = e.response.data.detail
      }
      return { token: token, errorMessage: errorMessage }
    }
  }
};

//register function
const register = async (name, email, password, confirmPassword) => {
  console.log(name, email, password, confirmPassword)
  let errorMessage = ""
  if (password !== confirmPassword) {
    errorMessage = "Passwords do not match!"
    return { errorMessage: errorMessage }
  }
  try {
    await axios.post(
      `${baseUrl}/user`, {
      name: name,
      email: email,
      password: password,
    }
    )
    errorMessage = "Account created successfully!"
    return { errorMessage: errorMessage }
  } catch (e) {
    console.log("register error: ", e)
    errorMessage = ""
    if (e.message === "Network Error") {
      errorMessage = e.message
    } else {
      errorMessage = e.response.data.detail
    }
    return { errorMessage: e.response.data.detail }
  }
};

export default function Auth() {

  const [details, setDetails] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const [signin, setSignin] = useState(true)

  const { setToken } = useContext(StoreContext)

  const history = useHistory()

  const onChange = (event) => {
    const { value, name } = event.target
    setDetails({
      ...details,
      [name]: value,
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault() //dont reload the page

    if (signin) {
      try {
        const { token, errorMessage } = await login(
          details.email,
          details.password
        );

        if (token) {
          setToken(token);
          return history.push("/my")
        }

        if (errorMessage) {
          console.log(errorMessage)
          setError(errorMessage)
          setTimeout(() => setError(""), 4000)
        }
      } catch (e) {
        console.log(e)
      }
    }

    if (!signin) {
      try {
        const { errorMessage } = await register(details.name, details.email, details.password, details.confirmPassword)

        if (errorMessage) {
          console.log(errorMessage);
          setError(errorMessage);
          setTimeout(() => setError(""), 4000);
        }
      } catch (e) {
        console.log(e);
      }

      try {
        const { token, errorMessage } = await login(
          details.email,
          details.password
        );

        if (token) {
          setToken(token);
          return history.push("/my");
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

    setDetails(initialState)
    setToken("")

  }

  return (
    <>
      <Navbar />
      <div className={"login-container"}>
        {error && <CustomizedSnackbar message={error} severity="error" />}
        <form className={"form"} onSubmit={submitHandler}>
          <div className={"top"}>
            <img
              className={"login-logo"}
              src={window.location.origin + "/logo192.png"}
              alt="FMdeploy.jpg"
            />
            {/* <h1>FMdeploy</h1> */}
          </div>
          <div className={"slider"}>
            <div className={"slider-labels"}>
              {signin && <p className={"slider-text"} style={{ color: "#0385B0" }}>Login</p>}
              {!signin && <p className={"slider-text"} onClick={() => { setSignin(true); setError(""); }}>Login</p>}

              {signin && <p className={"slider-text"} onClick={() => { setSignin(false); setError(""); }}>Register</p>}
              {!signin && <p className={"slider-text"} style={{ color: "#0385B0" }}>Register</p>}
            </div>
            {signin && <hr style={{ color: "#0385B0" }} />}
            {!signin && <hr style={{ color: "#fff" }} />}
            {signin && <hr style={{ color: "#fff" }} />}
            {!signin && <hr style={{ color: "#0385B0" }} />}
          </div>
          <div className={"inner-form"}>
            {/* {error && (
              <p style={{ color: "white", textAlign: "center", paddingBottom: "20px" }}>{error}</p>
            )} */}
            {!signin && (
              <div className={"form-group"}>
                <label className="auth-label" htmlFor="text">Name</label>
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
              <label className="auth-label" htmlFor="email">Email</label>
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
              <label className="auth-label" htmlFor="password">Password</label>
              <input
                className="auth-input"
                type="password"
                name="password"
                id="password"
                onChange={onChange}
                value={details.password}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
            </div>
            {!signin && (
              <div className={"form-group"}>
                <label className="auth-label" htmlFor="password">Confirm password</label>
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
            {signin &&
              <div className={"button-holder"}>
                <input className="auth-button" type="submit" value="LOGIN" />
              </div>
            }
            {!signin &&
              <div className={"button-holder"}>
                <input className="auth-button" type="submit" value="REGISTER" />
              </div>
            }
          </div>
        </form>
      </div>
      <Cards />
    </>
  )
}