import { useState, useContext, useEffect } from "react"
import { Anchorme } from "react-anchorme"
import "./Project.css"
import TouchableOpacity from "./TouchableOpacity"
import { useHistory, useLocation } from "react-router-dom"
import Tooltip from "@material-ui/core/Tooltip"
import StoreContext from "./Store/Context"
import axiosInstance from "./axios/axiosInstance"


export const Project = ({ project, infoLevel, actionButtons, onDelete, handlePrivacy }) => {

    const { token } = useContext(StoreContext)

    const [author, setAuthor] = useState(null)

    useEffect(() => {
        //get author for shared projects
        const getOwner = async (project, token) => {
            try {
                const response = await axiosInstance.get(
                    `/userproject/get_owner/${project.project_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                )
                console.log("getOwner: ", await response.data)
                setAuthor(await response.data.name)
            } catch (e) {
                console.log("getOwner error: ", e.response)
                if (e.response) {
                    console.log("getOwner error detail: ", e.response.data.detail)
                }
            }
        }

        if (infoLevel === "Shared") {
            getOwner(project, token)
        }

    }, [token, project, infoLevel])

    const date = new Date(project.created_in)
    const formatedDate = new Intl.DateTimeFormat('pt').format(date)
    const history = useHistory()
    const location = useLocation()
    const currentUrl = location.pathname

    const [expand, setExpand] = useState(false)

    const handleClick = () => {
        console.log("click")
        setExpand(!expand)
    }



    const RenderButtons = () => {
        if (actionButtons === "all") {
            return (
                <div className={"last-item"}>
                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Delete" arrow>
                                <img className={"icon"}
                                    onClick={() => onDelete(project.project_id)}
                                    src="images/trash.png"
                                    alt="delete" />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Edit" arrow>
                                <img className={"icon"}
                                    src="images/edit.png"
                                    alt="share"
                                    onClick={() => {
                                        history.replace(
                                            '/edit', { ...project }
                                        )
                                    }} />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                    {project.is_private ?
                        <div className={"icon-container"}>
                            <TouchableOpacity>
                                <Tooltip title="Private" arrow>
                                    <img className={"icon"}
                                        src="images/private.png"
                                        alt="private"
                                        onClick={() => {
                                            handlePrivacy(project.project_id, !project.is_private)
                                        }} />
                                </Tooltip>
                            </TouchableOpacity>
                        </div>
                        :
                        <div className={"icon-container"}>
                            <TouchableOpacity>
                                <Tooltip title="Public" arrow>
                                    <img className={"icon"}
                                        src="images/public.png"
                                        alt="share"
                                        onClick={() => {
                                            handlePrivacy(project.project_id, !project.is_private)
                                        }} />
                                </Tooltip>
                            </TouchableOpacity>
                        </div>
                    }

                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Share" arrow>
                                <img className={"icon"}
                                    src="images/share.png"
                                    alt="share"
                                    onClick={() => {
                                        history.replace(
                                            '/share', { ...project }
                                        )
                                    }} />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Run" arrow>
                                <img className={"icon"}
                                    src="images/run.png"
                                    alt="run"
                                    onClick={() => {
                                        history.replace(
                                            `/runs/${project.project_id}`, { ...project, path: currentUrl }
                                        )
                                    }} />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                </div>
            )
        }

        if (actionButtons === "run") {
            return (
                <div className={"last-item"}>
                    <div className={"icon-container"}>
                        <TouchableOpacity>
                            <Tooltip title="Run" arrow>
                                <img className={"icon"}
                                    src="images/run.png"
                                    alt="run"
                                    onClick={() => {
                                        history.replace(
                                            '/run', { ...project, path: currentUrl }
                                        )
                                    }} />
                            </Tooltip>
                        </TouchableOpacity>
                    </div>
                </div>
            )
        }
    }

    const RenderInfo = ({ isExpanded }) => {
        if (infoLevel) {
            return (
                <Tooltip title="Click for more info" arrow>
                    <div className={"data-items"}>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>ID:</p>
                            <p className={"item-text"}>{project.project_id}</p>
                        </div>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>DATE:</p>
                            <p className={"item-text"}>{formatedDate}</p>
                        </div>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>TITLE:</p>
                            <p className={"item-text"}>{project.title}</p>
                        </div>
                    </div>
                </Tooltip>
            )
        } /* else if (infoLevel === "Shared") {
            return (
                <Tooltip title="Click for more info" arrow>
                    <div className={"data-items"}>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>ID:</p>
                            <p className={"item-text"}>{project.project_id}</p>
                        </div>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>DATE:</p>
                            <p className={"item-text"}>{formatedDate}</p>
                        </div>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>TITLE:</p>
                            <p className={"item-text"}>{project.title}</p>
                        </div>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>AUTHOR:</p>
                            <p className={"item-text"}>{author}</p>
                        </div>
                    </div>
                </Tooltip>
            )
        } else if (infoLevel === "Public") {
            return (
                <Tooltip title="Click for more info" arrow>
                    <div className={"data-items"}>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>ID:</p>
                            <p className={"item-text"}>{project.project_id}</p>
                        </div>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>DATE:</p>
                            <p className={"item-text"}>{formatedDate}</p>
                        </div>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>TITLE:</p>
                            <p className={"item-text"}>{project.title}</p>
                        </div>
                        <div className={"item"}>
                            <p className={"item-text-colored"}>AUTHOR:</p>
                            <p className={"item-text"}>{project.name}</p>
                        </div>
                    </div>
                </Tooltip>
            )
        } */
    }

    return (
        <div className={"list-item"}>
            <div className="clickable" onClick={() => handleClick()}>

                {expand ?
                    <div className={"data-items-expanded"}>
                        <div className={"item-group"}>
                            <div className={"item"}>
                                <p className={"item-text-colored"}>ID:</p>
                                <p className={"item-text"}>{project.project_id}</p>
                            </div>
                            <div className={"item"}>
                                <p className={"item-text-colored"}>DATE:</p>
                                <p className={"item-text"}>{formatedDate}</p>
                            </div>
                            <div className={"item"}>
                                <p className={"item-text-colored"}>TITLE:</p>
                                <p className={"item-text"}>{project.title}</p>
                            </div>
                        </div>
                        <div className={"item-group"}>
                            <div className={"item"}>
                                <p className={"item-text-colored"}>AUTHOR:</p>
                                {project.name ? <p className={"item-text"}>{project.name}</p>
                                    :
                                    <p className={"item-text"}>{author}</p>
                                }
                            </div>
                            <div className={"item"}>
                                <p className={"item-text-colored"}>PRIVATE:</p>
                                <p className={"item-text"}>{project.is_private.toString()}</p>
                            </div>
                            <div className={"item"}>
                                <p className={"item-text-colored"}>INPUT TYPE:</p>
                                <p className={"item-text"}>{project.input_type}</p>
                            </div>
                            <div className={"item"}>
                                <p className={"item-text-colored"}>OUTPUT TYPE:</p>
                                <p className={"item-text"}>{project.output_type}</p>
                            </div>
                        </div>
                        <div className={"item-group"}>
                            <div className={"item"}>
                                <p className={"item-text-colored"}>DESCRIPTION:</p>
                                <p className={"item-text"}>
                                    <Anchorme target="_blank" rel="noreferrer noopener">
                                        {project.description}
                                    </Anchorme>
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <RenderInfo />
                }

            </div>
            <RenderButtons />
        </div>
    )
}
