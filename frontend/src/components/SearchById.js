import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import './SearchById.css'
import { useState } from "react"

const SearchById = (props) => {

  const [aiId, setAiId] = useState("")

  const onChange = (event) => {
    const { value, name } = event.target
    console.log(value, name)
    setAiId(value)
  }

  const submitHandler = async () => {
    const getModelsById = await props.getModelsById(aiId)
    console.log(typeof getModelsById)
    if (typeof getModelsById === "string") {
      console.log(getModelsById)
      await props.handleMessage(getModelsById)
    } else {
      if ([getModelsById].length > 0) {
        console.log("getModelsById: ", [getModelsById])
        await props.fetchModelById([getModelsById])
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
        value={aiId}
        required
      />
      {aiId !== "" &&
        <FontAwesomeIcon icon={faTimes} className={"clear-icon"} onClick={() => handleReset()} />
      }
      <FontAwesomeIcon icon={faSearch} className={"search-icon"} onClick={() => submitHandler()} />
    </div>
  )
}

export default SearchById