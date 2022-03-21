import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import axiosInstance from "../axios/axiosInstance"
import StoreContext from "../Store/Context"
import querystring from "querystring"
import { useHistory } from "react-router-dom"
import "./AuthRedirect.css"
import { useContext, useEffect, useState } from 'react'
import { Alert, Stack } from '@mui/material'
import { Box } from '@material-ui/core'

export default function AuthRedirect(props) {

    console.log("state: ", props.location.state)

    const { setToken } = useContext(StoreContext)

    const history = useHistory()

    useEffect(() => {
        return () => {
            if (history.action === 'POP') {
                history.go(1)
            }
        }
    }, [history])

    /*  const [mode, setMode] = useState(false) */

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
    })

    const [message, setMessage] = useState({
        content: '',
        type: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const login = async (values) => {
        console.log('login: ', values)
        if (!values.email || !values.password) {
            setMessage({ content: "Required Field *", type: "warning" })
        } else {
            try {
                const response = await axiosInstance.post(
                    "/login",
                    querystring.stringify({
                        username: values.email,
                        password: values.password,
                    }),
                )
                if (await response.data) {
                    setToken(await response.data.access_token)
                    setMessage({ ...message, content: "Login Success!", type: "success" })
                    history.push(props.location.state.location.pathname)
                }

            } catch (e) {
                console.log("login error: ", e)
                if (e.message === "Network Error") {
                    setMessage({ ...message, content: e.message, type: "error" })
                } else {
                    setMessage({ ...message, content: e.response.data.detail, type: "error" })
                }

            }
        }
    }

    /* const register = async (values) => {
        console.log('register: ', values)
        if (values.password !== values.confirmPassword) {
            setMessage({ ...message, content: "Passwords do not match!", type: "error" })
        }
        if (!values.name || !values.email || !values.password || !values.confirmPassword) {
            setMessage({ content: "Required Field *", type: "warning" })
        } else {
            try {
                const response = await axiosInstance.post(
                    "/user", {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                }
                )
                if (await response.data) {
                    setToken(await response.data.access_token)
                    setMessage({ ...message, content: "Account created successfully!", type: "success" })
                    history.push("/my")
                }

            } catch (e) {
                console.log("register error: ", e)
                if (e.message === "Network Error") {
                    setMessage({ ...message, content: e.message, type: "error" })
                } else {
                    setMessage({ ...message, content: e.response.data.detail, type: "error" })
                }
            }
        }

    } */

    return (
        <div className="auth-redirect-container">
            <div>
                <div className="auth-redirect-header">
                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {/* {mode ? <p>Register</p> : <p>Login - Redirect</p>} */}
                            <p>Login - Redirect</p>
                        </Typography>
                        {props.location.state.location.pathname === 'user-settings' ?
                            <div style={{ fontSize: "14px", marginTop: "5px", display: "flex" }}>
                                Use updated fields.
                            </div>
                            :
                            <div style={{ fontSize: "14px", marginTop: "5px", display: "flex" }}>
                                Action requires authentication.
                            </div>
                        }
                    </div>
                    <div>
                        <img
                            className="auth-redirect-logo-small"
                            src={window.location.origin + "/logo192.png"}
                            alt="FMdeploy.jpg"
                        />
                    </div>

                </div>

                <Stack sx={{ m: 1, width: '270px', marginTop: '10px' }} spacing={2}>
                    {message.content && message.type === "success" &&
                        <Alert severity="success">{message.content}</Alert>
                    }

                    {message.content && message.type === "error" &&
                        <Alert severity="error">{message.content}</Alert>
                    }

                    {message.content && message.type === "warning" &&
                        <Alert severity="warning">{message.content}</Alert>
                    }
                    {props.location.state.message &&
                        <Alert severity={props.location.state.severity}>{props.location.state.message}</Alert>
                    }
                </Stack>

                <div style={{ marginTop: "10px" }}>
                    {/* {mode &&
                        <FormControl sx={{ m: 1, width: '270px' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-name" required>Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-name"
                                type="text"
                                value={values.name}
                                onChange={handleChange('name')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <AccountBoxIcon
                                            aria-label="name"
                                            color="primary"
                                            edge="end"
                                            disabled />
                                    </InputAdornment>
                                }
                                label="Name"
                            />
                        </FormControl>
                    } */}
                    <FormControl sx={{ m: 1, width: '270px' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-email" required>Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            type="text"
                            value={values.email}
                            onChange={handleChange('email')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <EmailIcon
                                        aria-label="email"
                                        color="primary"
                                        edge="end"
                                        disabled />
                                </InputAdornment>
                            }
                            label="Email"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '270px' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        color="primary"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    {/* {mode &&
                        <FormControl sx={{ m: 1, width: '270px' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-confirmPassword" required>Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirmPassword"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            color="primary"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="confirmPassword"
                            />
                        </FormControl>
                    } */}
                    <Box sx={{ m: 1 }}>
                        {/* {mode ?
                            <Button variant="contained" sx={{ bgColor: '#0385B0', width: '270px', height: '50px' }} onClick={() => register(values)}>REGISTER</Button>
                            :
                            <Button variant="contained" sx={{ bgColor: '#0385B0', width: '270px', height: '50px' }} onClick={() => login(values)}>LOGIN</Button>
                        } */}
                        <Button variant="contained" sx={{ bgColor: '#0385B0', width: '270px', height: '50px' }} onClick={() => login(values)}>LOGIN</Button>
                    </Box>
                </div>
            </div>
            <div className="auth-redirect-logo-container">
                <img
                    className="auth-redirect-logo"
                    src={window.location.origin + "/logo192.png"}
                    alt="FMdeploy.jpg"
                />
            </div>
        </div>
    )
}