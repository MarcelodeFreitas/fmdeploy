import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import './SearchById.css'
import { useState } from "react"

const SearchById = (props) => {

  const [projectId, setAiId] = useState("")

  const onChange = (event) => {
    const { value, name } = event.target
    console.log(value, name)
    setAiId(value)
  }

  const submitHandler = async () => {
    const getProjectById = await props.getProjectById(projectId)
    console.log(typeof getProjectById)
    if (typeof getProjectById === "string") {
      console.log(getProjectById)
      await props.handleMessage(getProjectById)
    } else {
      if ([getProjectById].length > 0) {
        console.log("getProjectById: ", [getProjectById])
        await props.fetchModelById([getProjectById])
      }
    }
    
  }

  const handleReset = () => {
    setAiId("")
  }

  return (
    <div className={"searchbar"}>
      <input
        className={"searchbar-input"}
        type="text"
        name="search"
        id="search"
        placeholder="Search by Model ID"
        onChange={onChange}
        value={projectId}
        required
      />
      {projectId !== "" &&
        <FontAwesomeIcon icon={faTimes} className={"clear-icon"} onClick={() => handleReset()} />
      }
      <FontAwesomeIcon icon={faSearch} className={"search-icon"} onClick={() => submitHandler()} />
    </div>
  )
}

export default SearchById