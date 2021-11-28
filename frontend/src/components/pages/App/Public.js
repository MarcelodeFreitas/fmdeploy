import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import AppHeader from "../../AppHeader"
import { useContext, useEffect, useState } from "react"
import StoreContext from "../../Store/Context"
import axios from "axios"
import baseUrl from "../../server/server"
import Models from "../../Models"
import NoContentCard from "../../NoContentCard"
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormControl, MenuItem, Select } from "@material-ui/core"
import { Box } from "@mui/system"
import Cards from '../../Cards'

const Public = () => {

  const { token } = useContext(StoreContext)

  const [models, setModels] = useState("")

  const [publicModelsError, setPublicModelsError] = useState("")

  useEffect(() => {

    //get ai models owned by current user
    const getPublicModels = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/ai/public`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getPublicModels: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getPublicModels error: ", e.response)
        setPublicModelsError(e.response.data.detail)
      }
    }

    const fetchMyModels = async () => {
      const modelsFromServer = await getPublicModels()
      setModels(modelsFromServer)
    }

    fetchMyModels()

  }, [token])

  const [searchById, setSearchById] = useState("")
  const [idResults, setIdResults] = useState([])
  const [searchByTitle, setSearchByTitle] = useState("")
  const [titleResults, setTitleResults] = useState([])
  const [searchByAuthor, setSearchByAuthor] = useState("")
  const [authorResults, setAuthorResults] = useState([])

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
            <Models models={models} infoLevel="Public" actionButtons="run" />
          </div>
        )
      }
      if (type === "searchId") {
        return (
          <div className={"content-table"}>
            <Models models={idResults} infoLevel="Public" actionButtons="run" />
          </div>
        )
      }
      if (type === "searchTitle") {
        return (
          <div className={"content-table"}>
            <Models models={titleResults} infoLevel="Public" actionButtons="run" />
          </div>
        )
      }
      if (type === "searchAuthor") {
        return (
          <div className={"content-table"}>
            <Models models={authorResults} infoLevel="Public" actionButtons="run" />
          </div>
        )
      }
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
      if (searchBy === "author") {
        setAuthorResults(models.filter((model) =>
          model.author.toLowerCase().includes(search.toLowerCase())
        ))
      }
    }
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Public Models" />

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
                    setSearchByAuthor("")
                    setAuthorResults([])
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
                    setSearchByAuthor("")
                    setAuthorResults([])
                  }}
                  options={models.map((option) => option.title)}
                  renderInput={(params) =>
                    <TextField {...params} label="Search by" color="warning" variant="standard" />
                  }
                />
              }
              {searchType === "author" &&
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
              }
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
                    <MenuItem value={"author"}>Author</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        }

        <RenderModelList modelList={models} type={renderType} errorMessage={publicModelsError} />
      </div>
      <Cards />
    </>
  )
}

export default Public