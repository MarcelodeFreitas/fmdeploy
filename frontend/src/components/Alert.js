import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useEffect, useState } from 'react'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomizedSnackbar = ({ message, severity }) => {
    console.log(message, severity)
    const [open, setOpen] = useState(false)

    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
      });
    
      const { vertical, horizontal } = state

    useEffect(() => {
        setOpen(true)
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose} key={vertical + horizontal}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomizedSnackbar