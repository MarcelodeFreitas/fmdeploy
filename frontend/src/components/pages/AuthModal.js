import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'space-between'
}


export default function AuthModal() {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [mode, setMode] = React.useState(false)

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        docId: '',
        showPassword: false,
    })

    const [message, setMessage] = React.useState({
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

    const login = (email, password) => {
        console.log("email: ", email, "password: ", password)
        setMessage({...message, content: "yay broo", type: "success"})
    }

    const register = (docId, email, password) => {
        console.log("docId: ", docId, "email: ", email, "password: ", password)
        setMessage({...message, content: "nooo broo", type: "error"})
    }

    return (
        <div>
            <Button onClick={handleOpen}>LOGIN</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box style={{ width: "60%" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {mode ? <p>Register</p> : <p>Login</p>}
                        </Typography>
                        {mode ?
                            <div style={{ fontSize: "14px", marginTop: "5px", display: "flex" }}>
                                Already registered? <p style={{ marginLeft: "5px", color: "#0385B0", cursor: "pointer" }} onClick={() => {setMode(!mode)}}>Login</p>
                            </div>
                            :
                            <div style={{ fontSize: "14px", marginTop: "5px", display: "flex" }}>
                                New user? <p style={{ marginLeft: "5px", color: "#0385B0", cursor: "pointer" }} onClick={() => setMode(!mode)}>Create Account</p>
                            </div>
                        }

                        {message.content && message.type === "success" &&
                            <div style={{marginTop: "10px", color: "green" }}>
                                {message.content}
                            </div>
                        }

                        {message.content && message.type === "error" &&
                            <div style={{marginTop: "10px", color: "red" }}>
                                {message.content}
                            </div>
                        }
                        
                        <Box style={{ marginTop: "10px" }}>
                            {mode &&
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-docId">ID</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-docId"
                                        type="text"
                                        value={values.docId}
                                        onChange={handleChange('docId')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <AccountBoxIcon
                                                    aria-label="docId"
                                                    color="primary"
                                                    edge="end"
                                                    disabled />
                                            </InputAdornment>
                                        }
                                        label="docId"
                                    />
                                </FormControl>
                            }
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
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
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                        </Box>
                        <Box sx={{ marginTop: "25px" }}>
                            {mode ?
                                <Button sx={{ marginLeft: "8px" }} variant="contained" onClick={() => register(values.docId, values.email, values.password)}>REGISTER</Button>
                                :
                                <Button sx={{ marginLeft: "8px" }} variant="contained" onClick={() => login(values.email, values.password)}>LOGIN</Button>
                            }

                        </Box>
                    </Box>
                    <Box sx={{ width: "40%", marginTop: "8%", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        <img
                            style={{ width: "140px" }}
                            src={window.location.origin + "/logo192.png"}
                            alt="FMdeploy.jpg"
                        />
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            FMdeploy
                        </Typography>
                    </Box>
                </Box>

            </Modal>
        </div>
    );
}