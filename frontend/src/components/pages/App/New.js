import { Component } from "react"
import axiosInstance from "../../axios/axiosInstance"
import "./Main.css"
import "./New.css"
import AppHeader from "../../AppHeader"
import Sidebar from "../../Sidebar"
import StoreContext from "../../Store/Context"
import Cards from '../../Cards'
import { Card, CardContent, MenuItem, Box, InputLabel, Container } from "@material-ui/core"
import * as yup from 'yup'
import { Field, ErrorMessage } from "formik"
import { CheckboxWithLabel, TextField, Select } from "formik-material-ui"
import FormikStepper, { FormikStep } from "./formicStepper"
import { useDropzone } from "react-dropzone"

const defaultState = {
  title: "",
  description: "",
  inputType: "",
  outputType: "",
  isPrivate: true,
  modelFiles: [],
  pythonScript: "",
  errorPythonScript: "",
  errorModelFiles: "",
  projectId: "",
  projectCreatedMessage: "",
  pythonScriptMessage: "",
  modelFilesMessage: "",
}

// Delete project
const deleteProject = async (token, id) => {

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
    console.log("deleteProject response: ", await response)
    return await response.data.detail
  } catch (e) {
    console.log("deleteProject error: ", e)
    return e.response.data.detail
  }
}

export default class New extends Component {

  static contextType = StoreContext

  constructor(props) {
    super(props)
    this.state = {
      ...defaultState,
    }
  }

  handleOnDrop = (files, rejectedFiles) => {
    console.log("handleOnDrop: ", files)
  }

  handleFileErrors = () => {
    if (this.state.pythonScript === "") {
      this.setState({ errorPythonScript: "A Python script is required" })
    }
    if (this.state.modelFiles.length === 0) {
      this.setState({ errorModelFiles: "A Model File is required" })
    }
    if (this.state.pythonScript === "" || this.state.modelFiles.length === 0) {
      return true
    } else {
      return false
    }
  }

  //create project
  createProject = async (token, values) => {
    console.log("createProject: ", values)

    try {
      const response = await axiosInstance.post(
        "/project",
        {
          title: values.title,
          description: values.description,
          input_type: values.inputType,
          output_type: values.outputType,
          is_private: values.isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log("createProject response: ", await response)
      this.setState({ projectId: await response.data.project_id }, () => console.log("projectId: ", this.state.projectId))
      if (await response.status === 201) {
        return "Project created successfully"
      }
    } catch (e) {
      console.log("createProject error: ", e.response, e.response.data.detail)
      return e.response.data.detail
    }
  }

  //add pythonscript to the project
  uploadPythonScript = async (token, values, project_id) => {
    console.log("uploadPythonScript: ", project_id)
    try {
      const formData = new FormData()
      formData.append('python_file', values.pythonScript)
      const response = axiosInstance.post(`/files/pythonscript/${this.state.projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      console.log("uploadPythonScript response: ", await response)
      return "Python Script uploaded successfully"
    } catch (e) {
      console.log("uploadPythonScript error: ", e.response)
      deleteProject(token, project_id)
      return e.response.data.detail
    }

  }

  //add modelfiles to the project
  uploadModelFiles = async (token, values, project_id) => {
    console.log("uploadModelFiles: ", project_id)
    try {
      const formData = new FormData()

      values.modelFiles.forEach(function (item, index) {
        formData.append('model_files', item)
      })

      const response = axiosInstance.post(`/files/modelfiles/${this.state.projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      console.log("uploadModelFiles response: ", await response)
      return "Model Files uploaded successfully"

    } catch (e) {
      console.log("uploadModelFiles error: ", e.response)
      return e.response.data.detail
    }

  }

  handleSubmitResult = () => {
    return (
      <div>
        <div className="submit-result-element">
          <div className="submit-result-label">1. Create Project</div>
          <div className="submit-result-message">
            {this.state.projectCreatedMessage === 'Project created successfully' ?
              <p>{this.state.projectCreatedMessage}</p>
              :
              <p style={{ color: "red" }}>{this.state.projectCreatedMessage}</p>
            }
          </div>
        </div>
        <div className="submit-result-element">
          <div className="submit-result-label">2. Submit Python Script</div>
          <div className="submit-result-message">
            {this.state.pythonScriptMessage === 'Python Script uploaded successfully' ?
              <p>{this.state.pythonScriptMessage}</p>
              :
              <p style={{ color: "red" }}>{this.state.pythonScriptMessage}</p>
            }
          </div>
        </div>
        <div className="submit-result-element">
          <div className="submit-result-label">3. Submit Model Files</div>
          <div className="submit-result-message">
            {this.state.modelFilesMessage === 'Model Files uploaded successfully' ?
              <p>{this.state.modelFilesMessage}</p>
              :
              <p style={{ color: "red" }}>{this.state.modelFilesMessage}</p>
            }
          </div>
        </div>
      </div>

    )
  }

  render() {

    const ModelFilesDropzone = ({
      field: { value }, // { name, value, onChange, onBlur }
      form: { touched, errors, setFieldValue, setFieldError }, // also values, set, handle, isValid, status, etc.
      ...props
    }) => {

      /* const modelFilesValidator = file => {
        console.log(file)
        if (file.name.slice(-2) !== "py") {
          setFieldError("pythonScript", "This is not a python file.")
          return {
            code: "wrong-file-extension",
            message: "This is not a python file."
          }
        }

        return null
      } */

      const clearModelFiles = () => {
        setFieldValue("modelFiles", [], false)
      }

      const { getRootProps, getInputProps } = useDropzone({
        disabled: false,
        /* validator: modelFilesValidator, */
        onDropAccepted: acceptedFiles => {
          setFieldValue("modelFiles", acceptedFiles.map(file => Object.assign(file)))
        }
      })

      const files = value.map((file => (
        <li className="file-list-errors" key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      ))
      )

      return (
        <div>
          <div {...getRootProps()} className="content-box">
            <input {...getInputProps()} />
            <p>Drop Files Here</p>
            <p>- or -</p>
            <p>Click to Upload</p>
          </div>
          <div>
            <ul className="file-list-errors">{files}</ul>
          </div>
          <ErrorMessage component="div" className="error-message" name="modelFiles" />
          <div className="center-button">
            <div className="clear-button" onClick={clearModelFiles}>
              CLEAR
            </div>
          </div>
        </div>
      )
    }

    const PythonScriptDropzone = ({
      field: { value }, // { name, value, onChange, onBlur }
      form: { touched, errors, setFieldValue, setFieldError }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    }) => {

      const pythonValidator = file => {
        if (file.name.slice(-2) !== "py") {
          setFieldError("pythonScript", "This is not a python file.")
          return {
            code: "wrong-file-extension",
            message: "This is not a python file."
          }
        }

        return null
      }

      const clearPythonFile = () => {
        setFieldValue("pythonScript", "", false)
      }



      const {

        fileRejections,
        getRootProps,
        getInputProps } = useDropzone({
          disabled: false,
          maxFiles: 1,
          validator: pythonValidator,
          onDropAccepted: acceptedFiles => {
            this.setState({
              pythonScript: acceptedFiles[0]
            })
            setFieldValue("pythonScript", acceptedFiles[0])
          }
        })

      /* console.log("acceptedFiles", acceptedFiles)
      
      if (acceptedFiles !== []) {
        setPythonScript(acceptedFiles[0])
      } */

      /* const acceptedFileItems = acceptedFiles.map(file => (
        <li className="python-script-accepted" key={file.path}>
          {file.path}
        </li>
      )) */

      const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
          <li className="file-list-item" key={file.path}>
            {file.path}{/*  - {file.size} bytes */}
            {/* <ul className="file-list-errors">
              {errors.map(e => <li key={e.code}>{e.message}</li>)}
            </ul> */}

          </li>
        )
      })

      return (
        <div>
          <div {...getRootProps()} className="content-box">
            <input {...getInputProps()} />
            {value === "" ?
              <div className="center">
                <p>Drop File Here</p>
                <p>- or -</p>
                <p>Click to Upload</p>
                <div className="blank-line" />
                <p className="content-box-text-small">(you can only drop 1 file here)</p>
              </div>
              :
              <p className="fileName">{value.name}</p>
            }
          </div>
          <div className="file-messages">
            {/* {acceptedFileItems != "" &&
              <div>
                <h4>Accepted file</h4>
                <ul>{acceptedFileItems}</ul>
              </div>
            } */}
            {fileRejectionItems.length > 0 &&
              <div>
                <h4>Rejected files</h4>
                <ul>{fileRejectionItems}</ul>
              </div>
            }
          </div>
          <ErrorMessage component="div" className="error-message" name="pythonScript" />
          <div className="center-button">
            <div className="clear-button" onClick={clearPythonFile}>
              CLEAR
            </div>
          </div>
        </div>
      )
    }

    return (
      <>

        <Sidebar />
        <div className="main">
          <AppHeader title="New Project" button="BACK" buttonIcon="" path="/my" />
          <div className="content">

            <div className="material-ui-card">
              <Card>
                <CardContent>
                  <Container>
                    <FormikStepper
                      initialValues={defaultState}
                      state={() => this.state}
                      onSubmit={async (values) => {
                        console.log(values)
                        const projectCreatedMessage = await this.createProject(this.context.token, await values)
                        const pythonScriptMessage = await this.uploadPythonScript(this.context.token, await values, this.state.projectId)
                        if (pythonScriptMessage === "Python Script uploaded successfully" && values.modelFiles.length > 0) {
                          const modelFilesMessage = await this.uploadModelFiles(this.context.token, await values, this.state.projectId)
                          this.setState({ projectCreatedMessage: projectCreatedMessage, pythonScriptMessage: pythonScriptMessage, modelFilesMessage: modelFilesMessage })
                        } else {
                          this.setState({ projectCreatedMessage: projectCreatedMessage, pythonScriptMessage: pythonScriptMessage, modelFilesMessage: "No model files were submitted" })
                        }
                        return this.state
                      }
                      }
                    >

                      <FormikStep
                        label="Create Project"
                        validationSchema={yup.object().shape({
                          title: yup.string().max(60).required("Title is a required field"),
                          description: yup.string().required("Description is a required field"),
                          inputType: yup.string().required("Input Type is a required field"),
                          outputType: yup.string().required("Output Type is a required field"),
                          isPrivate: yup.boolean().required("Private is a required field"),
                        })}>
                        <Box paddingBottom={2}>
                          <Box paddingBottom={2}>
                            <Field fullWidth
                              component={TextField}
                              name="title"
                              type="text"
                              label="Title"
                              variant="standard"
                            />
                          </Box>
                          <Box paddingBottom={4}>
                            <Field fullWidth
                              component={TextField}
                              name="description"
                              type="text"
                              label="Description"
                              InputProps={{ multiline: true }}
                              variant="standard"
                            />
                          </Box>
                          <Box paddingBottom={4}>
                            <InputLabel htmlFor="inputType">Input Type</InputLabel>
                            <Field fullWidth
                              component={Select}
                              type="text"
                              name="inputType"
                              inputProps={{
                                id: 'inputType',
                              }}
                              variant="standard"
                            >
                              <MenuItem value={".nii.gz"}>.nii.gz</MenuItem>
                              <MenuItem value={".wav"}>.wav</MenuItem>
                              <MenuItem value={".mp3"}>.mp3</MenuItem>
                            </Field>
                            <ErrorMessage component="div" className="error-message" name="inputType" />
                          </Box>
                          <Box paddingBottom={4}>
                            <InputLabel htmlFor="outputType">Output Type</InputLabel>
                            <Field fullWidth
                              component={Select}
                              name="outputType"
                              inputProps={{
                                id: 'outputType',
                              }}
                              variant="standard"
                            >
                              <MenuItem value={".nii.gz"}>.nii.gz</MenuItem>
                              <MenuItem value={".csv"}>.csv</MenuItem>
                              <MenuItem value={".png"}>.png</MenuItem>
                              <MenuItem value={".wav"}>.wav</MenuItem>
                            </Field>
                            <ErrorMessage component="div" className="error-message" name="outputType" />
                          </Box>
                          <Box paddingBottom={2}>
                            <Field
                              component={CheckboxWithLabel}
                              type="checkbox"
                              name="isPrivate"
                              Label={{ label: 'Private' }}
                            />
                          </Box>
                        </Box>

                      </FormikStep>

                      <FormikStep
                        label="Add Project Files"
                        validationSchema={yup.object().shape({
                          pythonScript: yup.mixed().required("Python Script is a required field"),
                          modelFiles: yup.array().min(0),
                        })
                        }>
                        <Box paddingBottom={2}>
                          {/* <Field component={SimpleFileUpload} name="file" label="Simple File Upload" />
                        <MultipleFileUploadField name="files" /> */}
                          <div className="new-header">
                            <p>
                              2. Add Project Files
                            </p>
                          </div>

                          <div>
                            <label className="new-label" htmlFor="pythonScript">Python Script</label>
                            {/* <div className="content-box">
                <input type="file" name="pythonScript" onChange={onFileInputChange}/>
              </div> */}
                            {/* <PythonScriptDropzone /> */}

                            <Field
                              component={PythonScriptDropzone}
                              type="file"
                              name="pythonScript"
                              id="pythonScript"
                            />



                          </div>

                          <div>
                            <label className="new-label" htmlFor="modelFiles">Models</label>
                            {/* <ModelFilesDropzone /> */}
                            <Field
                              component={ModelFilesDropzone}
                              type="file"
                              name="modelFiles"
                              id="modelFiles"
                            />
                          </div>


                        </Box>
                      </FormikStep>
                      <FormikStep
                        label="Result">
                        <div className="submit-result-container">
                          <this.handleSubmitResult />
                        </div>

                      </FormikStep>
                    </FormikStepper>
                  </Container>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
        <Cards />
      </>
    )
  }
}