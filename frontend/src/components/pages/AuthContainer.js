import { useContext, useState } from "react"
import Box from '@mui/material/Box'
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
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import Alert from '@mui/material/Alert'
import axiosInstance from "../axios/axiosInstance"
import StoreContext from "../Store/Context"
import querystring from "querystring"
import { Stack } from "@mui/material"
import { useHistory } from "react-router-dom"

const style = {
    minWidth: '360px',
    width: '30%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}

export default function AuthContainer() {

    const { setToken } = useContext(StoreContext)

    const history = useHistory()

    const [mode, setMode] = useState(false)

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
        event.preventDefault()
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
                    history.push("/my")
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

    const register = async (values) => {
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
        
    }

    return (
        <Box sx={style}>
            <Box>
                <Typography id="modal-modal-title" variant="h2" style={{ fontWeight: "bold", fontFamily: "Segoe UI", fontSize: 20 }} component="h2">
                    {mode ? <p>Register</p> : <p>Login</p>}
                </Typography>
                {mode ?
                    <Box sx={{ display: 'flex', marginTop: '2%' }}>
                        <Typography variant='subtitle1' >Already have an account? </Typography>
                        <Typography variant='subtitle1' marginLeft='2%' color='primary' fontWeight='bold' sx={{ cursor: 'pointer' }} onClick={() => { setMode(!mode); setMessage("") }}>Login</Typography>
                    </Box>
                    :
                    <Box sx={{ display: 'flex', marginTop: '2%' }}>
                        <Typography variant='subtitle1' >Create an account account? </Typography>
                        <Typography variant='subtitle1' marginLeft='2%' color='primary' fontWeight='bold' sx={{ cursor: 'pointer' }} onClick={() => { setMode(!mode); setMessage("") }}>Register</Typography>
                    </Box>
                }

                <Stack sx={{ width: '100%', marginTop: '10px' }} spacing={2}>
                    {message.content && message.type === "success" &&
                        <Alert severity="success">{message.content}</Alert>
                    }

                    {message.content && message.type === "error" &&
                        <Alert severity="error">{message.content}</Alert>
                    }

                    {message.content && message.type === "warning" &&
                        <Alert severity="warning">{message.content}</Alert>
                    }
                </Stack>

                <Box sx={{ alignItems: 'center' }}>
                    <Box sx={{ marginTop: "8%", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        <img
                            style={{ maxWidth: "100px" }}
                            src={window.location.origin + "/logo512.png"}
                            alt="logo.jpg"
                        />
                    </Box>

                    <Box style={{ marginTop: '8%', alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        {mode &&
                            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
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
                                    label="name"
                                />
                            </FormControl>
                        }
                        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
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
                        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
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
                        {mode &&
                            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
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
                        }
                    </Box>
                    <Box sx={{ m: 3, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        {mode ?
                            <Button variant="contained" sx={{ bgColor: '#0385B0', width: '100%', height: '50px' }} onClick={() => register(values)}>REGISTER</Button>
                            :
                            <Button variant="contained" sx={{ bgColor: '#0385B0', width: '100%', height: '50px' }} onClick={() => login(values)}>LOGIN</Button>
                        }
                    </Box>
                </Box>


            </Box>
        </Box>
    )
}
