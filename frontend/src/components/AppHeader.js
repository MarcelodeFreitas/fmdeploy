import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlus, faGlobeAmericas, faShareAlt, faUndoAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import './AppHeader.css'
import AppButton from './AppButton'

library.add(fab, faPlus, faGlobeAmericas, faShareAlt, faUndoAlt, faTimes)

const AppHeader = ({ title, button, buttonIcon, path }) => {
    if (button) {
        return (
            <>
                {buttonIcon !== "" ? 
                    <div className={"header"}>
                        <h1 className={"title"}>{title}</h1>
                        <AppButton path={path} button={button} buttonIcon={buttonIcon} /> 
                    </div>
                :
                    <div className={"header"}>
                        <h1 className={"title"}>{title}</h1>
                        <AppButton path={path} button={button} buttonIcon={""} /> 
                    </div>
                }
                <hr className={"line"} />
            </>
        )
    } else {
        return (
            <>
                <div className={"header"}>
                    <h1 className={"title"}>{title}</h1>
                </div>
                <hr className={"line"} />
            </>
        )
    }
}

export default AppHeader