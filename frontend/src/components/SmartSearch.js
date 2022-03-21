import { useState } from "react"
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormControl, MenuItem, Select } from "@material-ui/core"
import Projects from "./Projects"
import NoContentCard from "./NoContentCard"

const SmartSearch = ({ infoLevel, projects, deleteProject, projectPrivacy, errorMessage }) => {

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

    const RenderProjectList = ({ projectList, type, errorMessage }) => {
        if (projectList && projectList.length > 0) {
            if (infoLevel === "MyProjects") {
                if (type === "default") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={projects} infoLevel={infoLevel} actionButtons="all" onDelete={deleteProject} handlePrivacy={projectPrivacy} />
                        </div>
                    )
                }
                if (type === "searchId") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={idResults} infoLevel={infoLevel} actionButtons="all" onDelete={deleteProject} handlePrivacy={projectPrivacy} />
                        </div>
                    )
                }
                if (type === "searchTitle") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={titleResults} infoLevel={infoLevel} actionButtons="all" onDelete={deleteProject} handlePrivacy={projectPrivacy} />
                        </div>
                    )
                }
                if (type === "searchAuthor") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={authorResults} infoLevel={infoLevel} actionButtons="all" onDelete={deleteProject} handlePrivacy={projectPrivacy} />
                        </div>
                    )
                }
            } else if (infoLevel === "Shared") {
                if (type === "default") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={projects} infoLevel="Shared" actionButtons="run" />
                        </div>
                    )
                }
                if (type === "searchId") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={idResults} infoLevel="Shared" actionButtons="run" />
                        </div>
                    )
                }
                if (type === "searchTitle") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={titleResults} infoLevel="Shared" actionButtons="run" />
                        </div>
                    )
                }
                if (type === "searchAuthor") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={authorResults} infoLevel="Shared" actionButtons="run" />
                        </div>
                    )
                }
            } else if (infoLevel === "Public") {
                if (type === "default") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={projects} infoLevel="Public" actionButtons="run" />
                        </div>
                    )
                }
                if (type === "searchId") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={idResults} infoLevel="Public" actionButtons="run" />
                        </div>
                    )
                }
                if (type === "searchTitle") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={titleResults} infoLevel="Public" actionButtons="run" />
                        </div>
                    )
                }
                if (type === "searchAuthor") {
                    return (
                        <div className={"content-table"}>
                            <Projects projects={authorResults} infoLevel="Public" actionButtons="run" />
                        </div>
                    )
                }
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
                setIdResults(projects.filter((project) =>
                    project.project_id.includes(search)
                ))
            }
            if (searchBy === "title") {
                setTitleResults(projects.filter((project) =>
                    project.title.toLowerCase().includes(search.toLowerCase())
                ))
            }
            if (searchBy === "author") {
                console.log("author: ", projects)
                setAuthorResults(projects.filter((project) =>
                    project.name.toLowerCase().includes(search.toLowerCase())
                ))
            }
        }
    }

    return (
        <div>
            {(projects && projects.length > 0) &&
                <div className="searchbars">
                    <div>
                        {searchType === "id" &&
                            <Autocomplete
                                id="searchByProjectId"
                                freeSolo
                                selectOnFocus
                                clearOnBlur
                                value={searchById}
                                sx={{ width: 350, marginLeft: "10px" }}
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
                                options={projects.map((option) => option.project_id)}
                                renderInput={(params) =>
                                    <TextField {...params} label="Search by" color="primary" variant="standard" size="small" />}
                            />
                        }
                        {searchType === "title" &&
                            <Autocomplete
                                id="searchByTitle"
                                freeSolo
                                selectOnFocus
                                clearOnBlur
                                value={searchByTitle}
                                sx={{ width: 350, marginLeft: "10px" }}
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
                                options={projects.map((option) => option.title)}
                                renderInput={(params) =>
                                    <TextField {...params} label="Search by" color="primary" variant="standard" />
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
                                sx={{ width: 350, marginLeft: "10px" }}
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
                                options={projects.map((option) => option.name)}
                                renderInput={(params) =>
                                    <TextField {...params} label="Search by" color="primary" variant="standard" />
                                }
                            />
                        }
                    </div>
                    <div style={{ minWidth: 80, marginLeft: "20px", marginTop: "10px" }}>
                        <FormControl variant="standard" size="medium" fullWidth>
                            <Select
                                value={searchType}
                                label="Search By"
                                onChange={handleSearchChange}
                            >
                                <MenuItem value={"id"}>Id</MenuItem>
                                <MenuItem value={"title"}>Title</MenuItem>
                                <MenuItem value={"author"}>Author</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            }

            <RenderProjectList projectList={projects} type={renderType} errorMessage={errorMessage} />
        </div>
    )
}

export default SmartSearch