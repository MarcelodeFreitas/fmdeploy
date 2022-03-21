import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import AppHeader from "../../AppHeader"
import { useContext, useEffect, useState } from "react"
import StoreContext from "../../Store/Context"
import Cards from "../../Cards"
import axiosInstance from "../../axios/axiosInstance"
import SmartSearch from "../../SmartSearch"

const Shared = () => {

  const { token } = useContext(StoreContext)

  const [projects, setProjects] = useState("")

  const [sharedProjectsError, setsharedProjectsError] = useState("")

  useEffect(() => {

    //get projects owned by current user
    const getSharedProjects = async () => {
      try {
        const response = await axiosInstance.get(
          "/userproject/shared_list",
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getSharedProjects: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getSharedProjects error: ", e.response)
        if (e.response) {
          console.log("getSharedProjects error detail: ", e.response.data.detail)
          setsharedProjectsError(e.response.data.detail)
        }
      }
    }

    const getProjects = async () => {
      const projectsFromServer = await getSharedProjects()
      setProjects(projectsFromServer)
    }

    getProjects()

  }, [token])

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Shared Projects" />

        <SmartSearch infoLevel="Shared" projects={projects} errorMessage={sharedProjectsError} />
        
      </div>
      <Cards />
    </>
  )
}

export default Shared