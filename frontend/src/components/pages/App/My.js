import { useState, useEffect, useContext } from "react"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import Models from "../../Models"
import AppHeader from "../../AppHeader"
import NoContentCard from "../../NoContentCard"
import axios from "axios"
import baseUrl from "../../server/server"
import StoreContext from '../../Store/Context'
import CustomizedSnackbar from "../../Alert"
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormControl, MenuItem, Select } from "@material-ui/core"
import { Box } from "@mui/system"
import Cards from '../../Cards'

function My() {

  const { token } = useContext(StoreContext)

  const [models, setModels] = useState("")

  const [myModelsError, setMyModelsError] = useState("")

  const [noModelsMessage, setNoModelsMessage] = useState("")

  const [deleteMessage, setDeleteMessage] = useState({
    message: "",
    severity: "",
  })

  useEffect(() => {

    //get ai models owned by current user
    const getMyModels = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/userai/owned_list`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getMyModels: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getMyModels error: ", e.response)
        console.log("getMyModels error detail: ", e.response.data.detail)
        setMyModelsError(e.response.data.detail)
      }
    }

    const fetchMyModels = async () => {
      const modelsFromServer = await getMyModels()
      setModels(modelsFromServer)
    }

    fetchMyModels()

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

  // Delete an AI model
  const deleteModel = async (id) => {

    //delete ai model from server
    try {
      const response = await axios.delete(
        `${baseUrl}/ai/${id}`,
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

    //delete AI model from state
    setModels(models.filter((model) =>
      model.ai_id !== id
    ))

    const filteredModels = models.filter((model) =>
      model.ai_id !== id
    )

    console.log("Delete: ", models)
    console.log("Delete length: ", models.length)
    console.log("Delete filter: ", filteredModels)
    console.log("Delete filter2: ", filteredModels.length)

    if (filteredModels.length === 0) {
      setNoModelsMessage("No Ai Models found!")
    }
  }

  // public not public ai model
  const modelPrivacy = async (aiId, privacy) => {
    try {
      const response = await axios.put(
        `${baseUrl}/ai`,
        {
          ai_id: aiId,
          is_private: privacy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      // this.setState({ message: await response.data.detail, severity: "success" })
      console.log("modelPrivacy response: ", await response)
    } catch (e) {
      // this.setState({ message: await e.response.data.detail, severity: "error" })
      console.log("modelPrivacy error: ", e.response.data.detail)
    }

    //update AI model from state
    const updatedModelList = models.map((model) => {
      if (model.ai_id === aiId) {
        return { ...model, is_private: !model.is_private }
      } else {
        return { ...model, is_private: model.is_private }
      }
    })

    setModels(updatedModelList)
  }

  const [searchById, setSearchById] = useState("")
  const [idResults, setIdResults] = useState([])
  const [searchByTitle, setSearchByTitle] = useState("")
  const [titleResults, setTitleResults] = useState([])
  // const [searchByAuthor, setSearchByAuthor] = useState("")
  // const [authorResults, setAuthorResults] = useState([])

  const [renderType, setRenderType] = useState("default")

  const [searchType, setSearchType] = useState("id")

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchType(event.target.value)
  }

  const RenderModelList = ({ modelList, type, errorMessage }) => {
    if (modelList && modelList.length > 0) {
      if (type === "default") {
        return (
          <div className={"content-table"}>
            <Models models={models} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        )
      }
      if (type === "searchId") {
        return (
          <div className={"content-table"}>
            <Models models={idResults} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        )
      }
      if (type === "searchTitle") {
        return (
          <div className={"content-table"}>
            <Models models={titleResults} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        )
      }
      // if (type === "searchAuthor") {
      //   return (
      //     <div className={"content-table"}>
      //       <Models models={authorResults} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
      //     </div>
      //   )
      // }
    } else {
      if (errorMessage !== "") {
        return (
          <NoContentCard text={errorMessage} />
        )
      } else {
        return (
          <>
          </>
        )
      }

    }

  }

  const handleSearch = (searchBy, search) => {
    if (search !== null) {
      if (searchBy === "id") {
        setIdResults(models.filter((model) =>
          model.ai_id.includes(search)
        ))
      }
      if (searchBy === "title") {
        setTitleResults(models.filter((model) =>
          model.title.toLowerCase().includes(search.toLowerCase())
        ))
      }
      // if (searchBy === "author") {
      //   setAuthorResults(models.filter((model) =>
      //     model.author.toLowerCase().includes(search.toLowerCase())
      //   ))
      // }
    }
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="My Models" button="NEW" buttonIcon="plus" path="/new" />

        {deleteMessage.message && <CustomizedSnackbar message={deleteMessage.message} severity={deleteMessage.severity} />}

        {(models && models.length > 0) &&
          <div className="searchbars">
            <div className="searchbar-field">
              {searchType === "id" &&
                <Autocomplete
                  id="searchByModelId"
                  freeSolo
                  selectOnFocus
                  clearOnBlur
                  value={searchById}
                  sx={{ width: 350, marginLeft: "20px" }}
                  onChange={(event, newValue, reason) => {
                    handleSearch("id", newValue)
                    if (reason === "clear") {
                      setRenderType("default")
                    }
                  }}
                  onInputChange={(event, newValue) => {
                    setRenderType("searchId")
                    setSearchById(newValue)
                    handleSearch("id", newValue)
                  }}
                  onOpen={() => {
                    setRenderType("default")
                    setSearchById("")
                    setIdResults([])
                    setSearchByTitle("")
                    setTitleResults([])
                    // setSearchByAuthor("")
                    // setAuthorResults([])
                  }}
                  options={models.map((option) => option.ai_id)}
                  renderInput={(params) =>
                    <TextField {...params} label="Search by" color="warning" variant="standard" />}
                />
              }
              {searchType === "title" &&
                <Autocomplete
                  id="searchByTitle"
                  freeSolo
                  selectOnFocus
                  clearOnBlur
                  value={searchByTitle}
                  sx={{ width: 350, marginLeft: "20px" }}
                  onChange={(event, newValue, reason) => {
                    handleSearch("title", newValue)
                    if (reason === "clear") {
                      setRenderType("default")
                    }
                  }}
                  onInputChange={(event, newValue) => {
                    setRenderType("searchTitle")
                    setSearchByTitle(newValue)
                    handleSearch("title", newValue)
                  }}
                  onOpen={() => {
                    setRenderType("default")
                    setSearchById("")
                    setIdResults([])
                    setSearchByTitle("")
                    setTitleResults([])
                    // setSearchByAuthor("")
                    // setAuthorResults([])
                  }}
                  options={models.map((option) => option.title)}
                  renderInput={(params) =>
                    <TextField {...params} label="Search by" color="warning" variant="standard" />
                  }
                />
              }
              {/* {searchType === "author" &&
              <Autocomplete
                id="searchByAuthor"
                freeSolo
                selectOnFocus
                clearOnBlur
                value={searchByAuthor}
                sx={{ width: 350, marginLeft: "20px" }}
                onChange={(event, newValue, reason) => {
                  handleSearch("author", newValue)
                  if (reason === "clear") {
                    setRenderType("default")
                  }
                }}
                onInputChange={(event, newValue) => {
                  setRenderType("searchAuthor")
                  console.log(newValue)
                  setSearchByAuthor(newValue)
                  handleSearch("author", newValue)
                }}
                onOpen={() => {
                  setRenderType("default")
                  setSearchById("")
                  setIdResults([])
                  setSearchByTitle("")
                  setTitleResults([])
                  setSearchByAuthor("")
                  setAuthorResults([])
                }}
                options={models.map((option) => option.author)}
                renderInput={(params) =>
                  <TextField {...params} label="Search by" color="warning" variant="standard" />
                }
              />
            } */}
            </div>
            <div className="searchbar-type">
              <Box sx={{ minWidth: 80, marginLeft: "20px", marginTop: "12px" }}>
                <FormControl fullWidth>
                  <Select
                    value={searchType}
                    label="Search By"
                    onChange={handleSearchChange}
                    autoWidth
                  >
                    <MenuItem value={"id"}>Id</MenuItem>
                    <MenuItem value={"title"}>Title</MenuItem>
                    {/* <MenuItem value={"author"}>Author</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        }

        <RenderModelList modelList={models} type={renderType} errorMessage={myModelsError} />

        {noModelsMessage && <NoContentCard text={noModelsMessage} />}

      </div>
      <Cards/>
    </>
  )
}

export default My
