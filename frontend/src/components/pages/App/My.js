import { useState, useEffect, useContext } from "react"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import AppHeader from "../../AppHeader"
import StoreContext from "../../Store/Context"
import CustomizedSnackbar from "../../Alert"
import Cards from "../../Cards"
import axiosInstance from "../../axios/axiosInstance"
import SmartSearch from "../../SmartSearch"

function My() {

  const { token } = useContext(StoreContext)

  const [projects, setProjects] = useState("")

  const [myProjectsError, setMyProjectsError] = useState("")

  const [noProjectsMessage, setNoProjectsMessage] = useState("")

  const [deleteMessage, setDeleteMessage] = useState({
    message: "",
    severity: "",
  })

  useEffect(() => {
    //get projects owned by current user
    const getMyProjects = async () => {
      try {
        const response = await axiosInstance.get(
          "/userproject/owned_list",
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getMyProjects: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getMyProjects error: ", await e.response)
        if (e.response) {
          console.log("getMyProjects error detail: ", e.response.data.detail)
          setMyProjectsError(e.response.data.detail)
        }
      }
    }

    const fetchMyProjects = async () => {
      const projectsFromServer = await getMyProjects()
      setProjects(projectsFromServer)
    }

    fetchMyProjects()

  }, [token])

  const handleDeleteMessage = (message, severity) => {
    setDeleteMessage({
      message: message,
      severity: severity
    })
    setTimeout(() => setDeleteMessage({
      message: "",
      severity: ""
    }), 6100)
  }

  // Delete project
  const deleteProject = async (id) => {
    //delete project from server
    try {
      const response = await axiosInstance.delete(
        `/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log(await response)
      handleDeleteMessage(await response.data.detail, "success")
    } catch (e) {
      console.log(e)
      handleDeleteMessage(e.response.data.detail, "error")
    }
    //delete project from state
    setProjects(projects.filter((project) =>
      project.project_id !== id
    ))

    const filteredProjects = projects.filter((project) =>
      project.project_id !== id
    )

    console.log("Delete: ", projects)
    console.log("Delete length: ", projects.length)
    console.log("Delete filter: ", filteredProjects)
    console.log("Delete filter2: ", filteredProjects.length)

    if (filteredProjects.length === 0) {
      setNoProjectsMessage("No Projects found!")
    }
  }

  // publish non public project
  const projectPrivacy = async (projectId, privacy) => {
    try {
      const response = await axiosInstance.put(
        "/project",
        {
          project_id: projectId,
          is_private: privacy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      // this.setState({ message: await response.data.detail, severity: "success" })
      console.log("projectPrivacy response: ", await response)
    } catch (e) {
      // this.setState({ message: await e.response.data.detail, severity: "error" })
      console.log("projectPrivacy error: ", e.response.data.detail)
    }

    //update project from state
    const updatedProjectList = projects.map((project) => {
      if (project.project_id === projectId) {
        return { ...project, is_private: !project.is_private }
      } else {
        return { ...project, is_private: project.is_private }
      }
    })

    setProjects(updatedProjectList)
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="My Projects" button="NEW" buttonIcon="plus" path="/new" />

        {deleteMessage.message && <CustomizedSnackbar message={deleteMessage.message} severity={deleteMessage.severity} />}

        <SmartSearch infoLevel="MyProjects" projects={projects} deleteProject={deleteProject} projectPrivacy={projectPrivacy} errorMessage={myProjectsError} />

        {/* {noProjectsMessage && <NoContentCard text={noProjectsMessage} />} */}

        {/* {myProjectsError && <NoContentCard text={myProjectsError} /> } */}

      </div>
      <Cards />
    </>
  )
}

export default My
