import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./AppButton.css"

const AppButton = ( {path, button, goBack, buttonIcon} ) => {
    if (goBack) {
        return(
            <div className={"main-button"} onClick={goBack}>
                {button}
            </div>
        )
    }
    return (
        <>
            {buttonIcon !== "" ? 
                <Link to={path} className={"main-button"}>
                    {button}
                    <FontAwesomeIcon className={"btn-icon"} icon={buttonIcon} />
                </Link>
            :
                <Link to={path} className={"main-button"}>
                    {button}
                </Link>
            }
        </>
    )
}

export default AppButton