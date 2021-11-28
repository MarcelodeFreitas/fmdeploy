import React, { useState, useContext } from "react"
import AppHeader from "../../AppHeader"
import Sidebar from "../../Sidebar"
import "./Main.css"
import "./New.css"
import baseUrl from "../../server/server"
import axios from "axios"
import StoreContext from "../../Store/Context"
import { useDropzone } from "react-dropzone"

const initialState = () => {
  return { title: "", description: "", inputType: "", outputType: "", isPrivate: true }
}

//Function to create a new model
const newModel = async (token, title, description, outputType, isPrivate) => {
  try {
      const response = await axios.post(
        `${baseUrl}/ai`,
        {
          title: title,
          description: description,
          output_type: outputType,
          is_private: isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      return await response.data
    } catch (e) {
      console.log(e)
    }
  
}

const New = () => {

  const { token } = useContext(StoreContext)

  const [id, setId] = useState("")

  const [values, setValues] = useState({ title: "", description: "", inputType: "", outputType: "", isPrivate: true })

  const[pythonScript, setPythonScript] = useState("")

  const[modelFiles, setModelFiles] = useState([])

  /* const[files, setFiles] = useState([]) */

  const ModelFilesDropzone = () => {

    const { getRootProps, getInputProps } = useDropzone({
      disabled: false,
      onDrop: acceptedFiles => {
        setModelFiles(
          acceptedFiles.map( file => Object.assign(file))
        )
      }
    })
  
    const files = modelFiles.map( (file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
      ))
    )

    return (
      <div>
        <div {...getRootProps() } className="content-box">
          <input {...getInputProps()} />
          <p>Drop Files Here</p>
          <p>- or -</p>
          <p>Click to Upload</p>
        </div>
        <div>
          <ul>{files}</ul>
        </div>
      </div>
    )
  } 


  const PythonScriptDropzone = () => {

    const pythonValidator = file => {
      if (file.name.slice(-2) !== "py") {
        return {
          code: "wrong-file-extension",
          message: "This is not a python file."
        };
      }
    
      return null
    }

    const[ pythonScriptName, setPythonScriptName ] = useState("")

    const { 
      acceptedFiles, 
      fileRejections, 
      getRootProps, 
      getInputProps } = useDropzone({
      disabled: false,
      multiple: false,
      maxFiles: 1,
      validator: pythonValidator,
      onDropAccepted: file => {
        setPythonScript(
          Object.assign(file[0])
        )
        console.log(PythonScript)
      }
    })

    /* console.log("acceptedFiles", acceptedFiles)
    
    if (acceptedFiles !== []) {
      setPythonScript(acceptedFiles[0])
    } */

    const acceptedFileItems = acceptedFiles.map(file => (
      <li className="python-script-accepted" key={file.path}>
        {file.path}{/*  - {file.size} bytes */}
      </li>
    ));
  
    const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
     return (
       <li className="file-list-item" key={file.path}>
            {file.path}{/*  - {file.size} bytes */}
            <ul className="file-list-errors">
              {errors.map(e => <li key={e.code}>{e.message}</li>)}
           </ul>
  
       </li>
     ) 
    })

    return (
      <div>
        <div {...getRootProps() } className="content-box">
          <input {...getInputProps()} />
          { pythonScriptName == "" ?
          <div className="center">
            <p>Drop File Here</p>
            <p>- or -</p>
            <p>Click to Upload</p>
            <div className="blank-line"/>
            <p className="content-box-text-small">(you can only drop 1 file here)</p>
          </div>
          :
          <p>{pythonScript}</p>
          }
        </div>
        <div className="file-messages">
          {/* {acceptedFileItems != "" &&
            <div>
              <h4>Accepted file</h4>
              <ul>{acceptedFileItems}</ul>
            </div>
          } */}
          {fileRejectionItems != "" &&
            <div>
              <h4>Rejected files</h4>
              <ul>{fileRejectionItems}</ul>
            </div>
          }
        </div>
      </div>
    )
  } 

  
  const onChange = (event) => {
    
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    setValues({
      ...values,
      [name]: value,
    })

  }

  const submitHandler = async (event) => {
    event.preventDefault() //dont reload the page

    console.log(values)

    const data = await newModel(token, values.title, values.description, values.outputType, values.isPrivate)

    setId(await data.ai_id)
    console.log(id)

  }

  const clearHandler = () => {

    setValues(initialState)

  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="New Model" button="CANCEL" buttonIcon="undo-alt" path="/my" />
        <div className="content">

          <div className="content-left">

            <div className="new-header">
              <p>
                1. Create Model
              </p>
            </div>

            <form onSubmit={submitHandler}>
              <div className="content-line">
                <label className="new-label" htmlFor="title">Title</label>
                <input 
                  className="content-input" 
                  type="text" 
                  name="title" 
                  id="title" 
                  onChange={onChange}
                  value={values.title}
                  required
                />
              </div>
              <div className="content-line">
                <label className="new-label" htmlFor="description">Description</label>
                <textarea 
                  className="content-input-fat" 
                  id="description" 
                  name="description"
                  onChange={onChange}
                  value={values.description}
                  required
                />
              </div>
              <div className="content-line">
                <label className="new-label" htmlFor="inputType">Input Type</label>
                <select 
                  className="content-input" 
                  id="inputType" 
                  name="inputType" 
                  onChange={onChange}
                  value={values.inputType}
                  required
                >
                  <option value="" disabled defaultValue="selected">Select your option</option>
                  <option value=".nii.gz">File .nii.gz</option>
                  <option value="string">String</option>
                </select>
              </div>
              <div className="content-line">
                <label className="new-label" htmlFor="outputType">Output Type</label>
                <select 
                  className="content-input" 
                  id="outputType" 
                  name="outputType" 
                  onChange={onChange}
                  value={values.outputType}
                  required
                >
                  <option value="" disabled defaultValue="selected">Select your option</option>
                  <option value=".nii.gz">File .nii.gz</option>
                  <option value="string">String</option>
                </select>
              </div>
              <div className="content-slider">
                <label className="new-label" htmlFor="privacy">Private</label>
                <div className="toggle-slider">
                  <input 
                  type="checkbox" 
                  name="isPrivate" 
                  id="isPrivate"
                  onChange={onChange}
                  checked={values.isPrivate}
                  />
                </div>
              </div>

              
              <div className="buttons-form">
                <div className="clear-button" onClick={clearHandler}>
                  CLEAR
                </div>
                <input className="confirm-button" type="submit" value="CREATE" />
              </div>
            </form>
          </div>

          {id &&
          <div className="content-right">

            <div className="new-header">
              <p>
                2. Add Model Files
              </p>
            </div>

            <div>
              <label className="new-label" htmlFor="pythonScript">Python Script</label>
              {/* <div className="content-box">
                <input type="file" name="pythonScript" onChange={onFileInputChange}/>
              </div> */}
              <PythonScriptDropzone />
              <div className="buttons">
                <div className="clear-button">
                  CLEAR
                </div>
                <div className="confirm-button">
                  CONFIRM
                </div>
              </div>
            </div>

            <div>
              <label className="new-label" htmlFor="modelFiles">Models</label>
              <ModelFilesDropzone />
              <div className="buttons">
                <div className="clear-button">
                  CLEAR
                </div>
                <div className="confirm-button">
                  CONFIRM
                </div>
              </div>
            </div>

          </div>
          }
          
        </div>
      </div>
    </>
  )
}

export default New