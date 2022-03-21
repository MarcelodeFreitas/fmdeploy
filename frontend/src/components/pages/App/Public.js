import { useContext, useEffect, useState } from "react"
import axiosInstance from "../../axios/axiosInstance"
import "../../Sidebar.css"
import "./Main.css"
import Sidebar from "../../Sidebar"
import AppHeader from "../../AppHeader"
import StoreContext from "../../Store/Context"
import Cards from '../../Cards'
import SmartSearch from "../../SmartSearch"


const Public = () => {

  const { token } = useContext(StoreContext)

  const [projects, setProjects] = useState("")

  const [publicProjectsError, setPublicProjectsError] = useState("")

  useEffect(() => {

    //get projects owned by current user
    const getPublicProjects = async () => {
      try {
        const response = await axiosInstance.get(
          "/project/public",
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getPublicProjects: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getPublicProjects error: ", e.response)
        if (e.response) {
          console.log("getPublicProjects error detail: ", e.response.data.detail)
          setPublicProjectsError(e.response.data.detail)
        }
      }
    }

    const getProjects = async () => {
      const projectsFromServer = await getPublicProjects()
      setProjects(projectsFromServer)
    }

    getProjects()

  }, [token])

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Public Projects" />

        <SmartSearch infoLevel="Public" projects={projects} errorMessage={publicProjectsError} />

      </div>
      <Cards />
    </>
  )
}

export default Public