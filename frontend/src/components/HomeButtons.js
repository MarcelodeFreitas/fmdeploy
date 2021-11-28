import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import { Button } from "./Button"
import "./HomeButtons.css"

export default function HomeButtons() {
    return (
        <div className="home-container">
            <Button
                type="button"
                className="btns"
                buttonStyle="btn--outline"
                buttonSize="btn--large"
                path="/auth"
            >
                GET STARTED
            </Button>
            <Button
                type="button"
                className="btns"
                buttonStyle="btn--primary"
                buttonSize="btn--large"
                path="/docs"
                target="new"
            >
                SEE DOCUMENTATION <FontAwesomeIcon icon={faPlayCircle} />
            </Button>
        </div>
    )
}


