import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./Run.css"
import AppHeader from "../../AppHeader"
import { useDropzone } from "react-dropzone"
import { useState, useContext, useEffect } from "react"
import StoreContext from "../../Store/Context"
import { CircularProgress, Button, Container } from "@material-ui/core"
import { Anchorme } from "react-anchorme"
import Cards from "../../Cards"
import axiosInstance from "../../axios/axiosInstance"
import { useParams, useHistory, useLocation } from "react-router-dom"
import NoContentCard from "../../NoContentCard"

const Run = () => {

  const { projectId } = useParams()

  const history = useHistory()
  const location = useLocation()
  console.log("location:", location)

  history.listen((newLocation, action) => {
    if (newLocation.pathname === "/auth-redirect") {
      history.push("/my")
    }
  })

  const { token } = useContext(StoreContext)

  console.log("run linkable project id: ", projectId)

  const [project, setProject] = useState("")
  /* const [author, setAuthor] = useState("") */
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    //get project info from id
    const getProjectById = async (projectId, token) => {
      try {
        const response = await axiosInstance.get(
          `/project/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getProjectById: ", await response.data)
        setProject(await response.data)
      } catch (e) {
        console.log("getProjectById error: ", e.response)
        if (e.response) {
          console.log("getProjectById error detail: ", e.response.data.detail)
          setErrorMessage(e.response.data.detail)
        }
      }
    }

    /* //get author for shared projects
    const getOwner = async (projectId, token) => {
      try {
        const response = await axiosInstance.get(
          `/userproject/get_owner/${projectId}`,
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
    } */

    getProjectById(projectId, token)
    /* getOwner(projectId, token) */

  }, [token, projectId])


  /* const date = new Date(project.created_in)
  
  const formatedDate = new Intl.DateTimeFormat('pt').format(date) */

  const [outputFileName, setOutputFileName] = useState("")

  const [outputFileType, setOutputFileType] = useState("")

  const [outputFile, setOutputFile] = useState("")

  const [downloadLink, setDownloadLink] = useState("")

  const [isRunning, setIsRunning] = useState(false)

  //upload input file to the server and get the id
  const uploadInputFile = async (token, inputFile) => {
    try {
      const formData = new FormData()
      formData.append('input_file', inputFile)
      const response = await axiosInstance.post("/files/inputfile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      console.log(await response)
      console.log(await response.data)
      /* setInputFileID(await response.data.input_file_id) */
      return await response.data.input_file_id
    } catch (e) {
      console.log(e)
      console.log("uploadInputFile error: ", e.response)
    }
  }

  //run project providing input file id and project id
  const runProject = async (token, projectId, fileId) => {
    console.log(projectId, fileId)
    try {
      const response = await axiosInstance.post("/project/run", {
        project_id: projectId,
        input_file_id: fileId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer', //prevents the file from corrupting
      })
      console.log("runProject response: ", await response)

      const filename = await response.headers['content-disposition'].split('filename=')[1].split(';')[0]

      setOutputFileName(filename)

      setOutputFileType(filename.split(".")[1].slice(0, -1))

      const blob = new Blob([await response.data], {
        type: await response.headers['content-type']
      })

      const url = window.URL.createObjectURL(blob)

      setOutputFile(url)

      const link = document.createElement("a")
      link.href = url
      link.download = filename.replaceAll('"', '')
      document.body.appendChild(link)
      setDownloadLink(link)

    } catch (e) {
      console.log("runProject e: ", await e)
      console.log("runProject error: ", await e.response)
      if (await e.response) {
        console.log("runProject error detail: ", await e.response.data.detail)
      }
    }
  }

  /* const [acceptedFileName, setAcceptedFileName] = useState("") */

  const handleRun = async (token, inputFile, projectId) => {
    setOutputFileName("")
    setOutputFile("")
    setOutputFileType("")
    if (inputFile) {
      console.log(inputFile)
      setIsRunning(true)
      /* setAcceptedFileName(inputFile.name) */
      const fileId = await uploadInputFile(token, inputFile)
      await runProject(token, projectId, await fileId)
      setIsRunning(false)
    } else {
      console.log(inputFile)
    }

  }

  const InputFilesDropzone = () => {

    const [files, setFiles] = useState([])

    const inputValidator = file => {
      if (file.name.includes(project.input_type)) {
        console.log("file extension correct")
        return null
      } else {
        /* setValidatorError(`This is not a ${project.input_type} file.`) */
        console.log("file extension wrong")
        return {
          code: "wrong-file-extension",
          message: `This is not a ${project.input_type} file.`
        }
      }
    }

    const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
      disabled: false,
      maxFiles: 1,
      validator: inputValidator,
      /* onDrop: () => {setOutputFileName("")}, */
      onDropAccepted: acceptedFiles => {
        /* setOutputFileName("") */
        /* setAcceptedFileName("") */
        setFiles(acceptedFiles[0])
        console.log("files: ", files)
      }
    })

    const clearFiles = () => {
      setFiles([])
      acceptedFiles.splice([], 1)
      /* setInputFileID("") */
      /* setAcceptedFileName("") */
      setOutputFileName("")
      setOutputFile("")
      setOutputFileType("")
    }

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
      return (
        <li className="file-list-item" key={file.path}>
          {file.path} - {file.size} bytes
          <ul className="file-list-errors">
            {errors.map(e => <li key={e.code}>{e.message}</li>)}
          </ul>

        </li>
      )
    })

    return (
      <div className="run-box">
        <h1 className="run-labels">1. INPUT</h1>
        <div {...getRootProps()} className="run-dropzone">
          <input {...getInputProps()} />
          {/* {acceptedFiles.length === 0 && acceptedFileName === "" ? */}
          {acceptedFiles.length === 0 ?
            <div className="center">
              <p>Drop File Here</p>
              <p>- or -</p>
              <p>Click to Upload</p>
              <div className="blank-line" />
              <p className="content-box-text-small">(you can only drop 1 file here)</p>
            </div>
            :
            <p className="fileName">{acceptedFiles[0].name}</p>
          }
          {/* <p className="fileName">{acceptedFileName ? acceptedFileName : acceptedFiles[0].name}</p> */}
          {/* {acceptedFileName !== "" &&
            <p className="fileName">{acceptedFileName}</p>
          } */}
        </div>
        <div className="file-messages">
          {fileRejectionItems.length > 0 &&
            <div>
              <h4>Rejected files</h4>
              <ul>{fileRejectionItems}</ul>
            </div>
          }
        </div>
        <div className="run-buttons">
          <div className="clear-button-fat" onClick={clearFiles}>
            CLEAR
          </div>
          <Button
            style={{ width: '48%', fontSize: "15px", fontWeight: "bold", borderRadius: "10px" }}
            startIcon={isRunning ? <CircularProgress size="1rem" /> : null}
            disabled={isRunning}
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => handleRun(token, acceptedFiles[0], project.project_id)}
          >
            Submit
          </Button>

        </div>
      </div>
    )
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title={`RUN: ${project.title}`} />

        {errorMessage ?
          <NoContentCard text={errorMessage} />
          :
          <Container>
            <Container className="run-white-container">
              <div className="run-data-line"><p className="run-top-label">PROJECT ID:</p> {project.project_id}</div>
              <br></br>
              <div className="run-row">
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">AUTHOR:</p> {project.name}
                  </div>
                </div>
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">DATE:</p> {project.created_in && new Intl.DateTimeFormat('pt').format(new Date(project.created_in))}
                  </div>
                </div>
              </div>
              <br></br>
              <div className="run-row">
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">INPUT FILE TYPE:</p> {project.input_type}
                  </div>
                </div>
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">PRIVATE:</p> {project && project.is_private.toString()}
                  </div>
                </div>
              </div>
            </Container>

            <Container className="run-white-container">
              <p className="run-top-label">DESCRIPTION:</p>
              <br></br>
              <Anchorme target="_blank" rel="noreferrer noopener">
                {project.description}
              </Anchorme>
            </Container>
            <div className="run-boxes">
              <InputFilesDropzone />
              <div className="run-box">
                <h1 className="run-labels">2. OUTPUT</h1>
                <div className="run-dropzone">
                  <div className="center">
                    {outputFileName && downloadLink && <p className="run-fileName" onClick={() => downloadLink.click()}>{outputFileName}</p>}
                  </div>
                </div>
                {outputFileName &&
                  <div className="run-button">
                    <div className="submit-button" onClick={() => downloadLink.click()}>
                      DOWNLOAD
                    </div>
                  </div>
                }
              </div>
            </div>
            {outputFileType && outputFileType === "png" &&
              <div className="run-box-preview">
                <div className="run-box">
                  <h1 className="run-labels">3. OUTPUT PREVIEW</h1>
                  <div className="center">
                    <img className="image-preview" src={outputFile} alt="result png preview" />
                  </div>
                </div>
              </div>
            }
          </Container>
        }


      </div>
      <Cards />
    </>
  )
}

export default Run