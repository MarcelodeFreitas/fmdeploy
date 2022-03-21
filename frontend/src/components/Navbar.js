import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import StoreContext from './Store/Context'
import AccountMenu from './AccountMenu'
import './Navbar.css'

function Navbar() {
    const { token, setToken } = useContext(StoreContext)

    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton)

    const logout = () => {
        setToken('')
        setClick(false)
    }

    const AuthenticationButton = () => {
        if (token) return <AccountMenu />
        else {
            return (
                <Button path="/auth" buttonStyle='btn--outline'>LOGIN</Button>
            )
        }
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <p style={{ backgroundColor: "#0385B0", padding: "2%", borderRadius: "10%" }}>FM</p>&nbsp;deploy
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        {click ? <FontAwesomeIcon className={"fa-times"} icon={faTimes} /> : <FontAwesomeIcon className={"fa-bars"} icon={faBars} />}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                                Docs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/api" target="_blank" rel="noopener noreferrer" className="nav-links" onClick={closeMobileMenu}>
                                API
                            </Link>
                        </li>
                        {token &&
                            <li className="nav-item">
                                <Link to="/my" className="nav-links" onClick={closeMobileMenu}>
                                    App
                                </Link>
                            </li>
                        }
                        <li className="nav-item">
                            {token ?
                                <Link to="/" className="nav-links-mobile" onClick={logout}>
                                    LOGOUT
                                </Link>
                                :
                                <Link to="/auth" className="nav-links-mobile" onClick={closeMobileMenu}>
                                    LOGIN
                                </Link>

                            }
                        </li>
                    </ul>
                    {button && <AuthenticationButton />}
                </div>
            </nav>
        </>
    )
}

export default Navbar
