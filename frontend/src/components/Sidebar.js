import { useContext } from 'react'
import { useLocation } from "react-router-dom"
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faFolder, faFolderOpen, faGlobeAmericas, faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import StoreContext from './Store/Context'

const Sidebar = () => {
    const { setToken } = useContext(StoreContext)
    let location = useLocation()

    return (
        <>
            <nav className="sidebar">
                <ul className="sidebar-side">
                    <li className="logo">
                        <Link to="/my" className="side-link">
                            <span className="logo-text">FMdeploy</span>
                            <FontAwesomeIcon className="icon" icon={faBrain} />
                        </Link>
                    </li>

                    <li className="side-item">
                        {location.pathname === "/my" ?
                            <Link to="/my" className="side-link" style={{ filter: 'none', color: '#0385B0' }}>
                                <FontAwesomeIcon className="icon" style={{}} icon={faFolder} />
                                <span className="link-text">My Models</span>
                            </Link>
                            :
                            <Link to="/my" className="side-link">
                                <FontAwesomeIcon className="icon" icon={faFolder} />
                                <span className="link-text">My Models</span>
                            </Link>
                        }
                    </li>

                    <li className="side-item">
                        {location.pathname === "/shared" ?
                            <Link to="/shared" className="side-link" style={{ filter: 'none', color: '#0385B0' }}>
                                <FontAwesomeIcon className="icon" icon={faFolderOpen} />
                                <span className="link-text">Shared Models</span>
                            </Link>
                            :
                            <Link to="/shared" className="side-link">
                                <FontAwesomeIcon className="icon" icon={faFolderOpen} />
                                <span className="link-text">Shared Models</span>
                            </Link>
                        }
                    </li>

                    <li className="side-item">
                        {location.pathname === "/public" ?
                            <Link to="/public" className="side-link" style={{ filter: 'none', color: '#0385B0' }}>
                                <FontAwesomeIcon className="icon" icon={faGlobeAmericas} />
                                <span className="link-text">Public Models</span>
                            </Link>
                            :
                            <Link to="/public" className="side-link">
                                <FontAwesomeIcon className="icon" icon={faGlobeAmericas} />
                                <span className="link-text">Public Models</span>
                            </Link>
                        }
                    </li>

                    <li onClick={() => setToken('')} className="side-item">
                        <div className="side-link">
                            <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                            <span className="link-text">Logout</span>
                        </div>
                    </li>

                    <li className="side-item" id="themeButton">
                        <div className="side-link">
                            <Link to="/user-settings" className="side-link">
                                <FontAwesomeIcon className="icon" icon={faUserCog} />
                                <span className="link-text">Settings</span>
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar