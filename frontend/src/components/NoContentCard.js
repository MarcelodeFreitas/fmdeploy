import React from 'react'
import './NoContentCard.css'

const NoContentCard = ({ text }) => {
    return (
        <div className={"no-content-container"}>
            <div className={"no-content-card"}>
                <img className={"no-content-image"} src={window.location.origin + "/images/no-content.png"}
                                alt="No Content"/>
                <h3 className={"no-content-text"}>{ text }</h3>
            </div>
        </div>
    )
}

export default NoContentCard