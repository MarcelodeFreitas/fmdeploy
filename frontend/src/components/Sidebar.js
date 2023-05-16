import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faFolder,
  faFolderOpen,
  faGlobeAmericas,
  faUserCog,
  faSignOutAlt,
  faHistory,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import StoreContext from "./Store/Context";
import "./Sidebar.css";

const Sidebar = () => {
  const { setToken } = useContext(StoreContext);
  const { role } = useContext(StoreContext);
  let location = useLocation();

  return (
    <>
      <nav className="sidebar">
        <ul className="sidebar-side">
          <li className="logo">
            <Link to="/" className="side-link">
              <span className="logo-text">FMdeploy</span>
              <FontAwesomeIcon className="icon" icon={faBrain} />
            </Link>
          </li>

          {role === "admin" && (
            <li className="side-item">
              {location.pathname === "/user-management" ? (
                <Link
                  to="/my"
                  className="side-link"
                  style={{ filter: "none", color: "#0385B0" }}
                >
                  <FontAwesomeIcon className="icon" style={{}} icon={faUsers} />
                  <span className="link-text">Manage Users</span>
                </Link>
              ) : (
                <Link to="/user-management" className="side-link">
                  <FontAwesomeIcon className="icon" icon={faUsers} />
                  <span className="link-text">Manage Users</span>
                </Link>
              )}
            </li>
          )}

          {(role === "admin" || role === "user") && (
            <li className="side-item">
              {location.pathname === "/my" ? (
                <Link
                  to="/my"
                  className="side-link"
                  style={{ filter: "none", color: "#0385B0" }}
                >
                  <FontAwesomeIcon
                    className="icon"
                    style={{}}
                    icon={faFolder}
                  />
                  <span className="link-text">My Projects</span>
                </Link>
              ) : (
                <Link to="/my" className="side-link">
                  <FontAwesomeIcon className="icon" icon={faFolder} />
                  <span className="link-text">My Projects</span>
                </Link>
              )}
            </li>
          )}

          <li className="side-item">
            {location.pathname === "/shared" ? (
              <Link
                to="/shared"
                className="side-link"
                style={{ filter: "none", color: "#0385B0" }}
              >
                <FontAwesomeIcon className="icon" icon={faFolderOpen} />
                <span className="link-text">Shared Projects</span>
              </Link>
            ) : (
              <Link to="/shared" className="side-link">
                <FontAwesomeIcon className="icon" icon={faFolderOpen} />
                <span className="link-text">Shared Projects</span>
              </Link>
            )}
          </li>

          <li className="side-item">
            {location.pathname === "/public" ? (
              <Link
                to="/public"
                className="side-link"
                style={{ filter: "none", color: "#0385B0" }}
              >
                <FontAwesomeIcon className="icon" icon={faGlobeAmericas} />
                <span className="link-text">Public Projects</span>
              </Link>
            ) : (
              <Link to="/public" className="side-link">
                <FontAwesomeIcon className="icon" icon={faGlobeAmericas} />
                <span className="link-text">Public Projects</span>
              </Link>
            )}
          </li>

          <li className="side-item">
            {location.pathname === "/run-history" ? (
              <Link
                to="/run-history"
                className="side-link"
                style={{ filter: "none", color: "#0385B0" }}
              >
                <FontAwesomeIcon className="icon" icon={faHistory} />
                <span className="link-text">Run History</span>
              </Link>
            ) : (
              <Link to="/run-history" className="side-link">
                <FontAwesomeIcon className="icon" icon={faHistory} />
                <span className="link-text">Run History</span>
              </Link>
            )}
          </li>

          <li onClick={() => setToken("")} className="side-item">
            <div className="side-link">
              <Link to="/" className="side-link">
                <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
                <span className="link-text">Logout</span>
              </Link>
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
  );
};

export default Sidebar;
