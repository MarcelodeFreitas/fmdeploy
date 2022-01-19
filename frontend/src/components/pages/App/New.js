import { Component } from "react"
import AppHeader from "../../AppHeader"
import Sidebar from "../../Sidebar"
import "./Main.css"
import "./New.css"
import baseUrl from "../../server/server"
import axios from "axios"
import StoreContext from "../../Store/Context"
import { Card, CardContent, MenuItem, Box, InputLabel } from "@material-ui/core"
import { Field, ErrorMessage } from "formik"
import { CheckboxWithLabel, TextField, Select } from "formik-material-ui"
import FormikStepper, { FormikStep } from "./formicStepper"
import * as yup from 'yup'
import { useDropzone } from "react-dropzone"
import Cards from '../../Cards'

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
  aiId: "",
  aiCreatedMessage: "",
  pythonScriptMessage: "",
  modelFilesMessage: "",
}

// Delete an AI model
const deleteModel = async (token, id) => {

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
    console.log("deleteModel response: ", await response)
    return await response.data.detail
  } catch (e) {
    console.log("deleteModel error: ", e)
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

  //create ai model in the server
  createAiModel = async (token, values) => {
    console.log("createAiModel: ", values)

    try {
      const response = await axios.post(
        `${baseUrl}/ai`,
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
      console.log("createAiModel response: ", await response)
      this.setState({ aiId: await response.data.ai_id }, () => console.log("aiId: ", this.state.aiId))
      if (await response.status === 201) {
        return "Model created successfully"
      }
    } catch (e) {
      console.log("createAiModel error: ", e.response)
      return e.response.data.detail
    }
  }

  //add pythonscript to the ai model
  uploadPythonScript = async (token, values, ai_id) => {
    console.log("uploadPythonScript: ", ai_id)
    try {
      const formData = new FormData()
      formData.append('python_file', values.pythonScript)
      const response = axios.post(`${baseUrl}/files/pythonscript/${this.state.aiId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      console.log("uploadPythonScript response: ", await response)
      return "Python Script uploaded successfully"
    } catch (e) {
      console.log("uploadPythonScript error: ", e.response)
      deleteModel(token, ai_id)
      return e.response.data.detail
    }

  }

  //add modelfiles to the ai model
  uploadModelFiles = async (token, values, ai_id) => {
    console.log("uploadModelFiles: ", ai_id)
    try {
      const formData = new FormData()

      values.modelFiles.forEach(function (item, index) {
        formData.append('model_files', item)
      })

      const response = axios.post(`${baseUrl}/files/modelfiles/${this.state.aiId}`, formData, {
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
          <div className="submit-result-label">1. Create Model</div>
          <div className="submit-result-message">
            {this.state.aiCreatedMessage === 'Model created successfully' ?
              <p>{this.state.aiCreatedMessage}</p>
              :
              <p style={{color: "red"}}>{this.state.aiCreatedMessage}</p>
            }
          </div>
        </div>
        <div className="submit-result-element">
          <div className="submit-result-label">2. Submit Python Script</div>
          <div className="submit-result-message">
            {this.state.pythonScriptMessage === 'Python Script uploaded successfully' ?
              <p>{this.state.pythonScriptMessage}</p>
              :
              <p style={{color: "red"}}>{this.state.pythonScriptMessage}</p>
            }
          </div>
        </div>
        <div className="submit-result-element">
          <div className="submit-result-label">3. Submit Model Files</div>
          <div className="submit-result-message">
            {this.state.modelFilesMessage === 'Model Files uploaded successfully' ?
              <p>{this.state.modelFilesMessage}</p>
              :
              <p style={{color: "red"}}>{this.state.modelFilesMessage}</p>
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
          <AppHeader title="New Model" button="BACK" buttonIcon="" path="/my" />
          <div className="content">

            <div className="material-ui-card">
              <Card>
                <CardContent>
                  <FormikStepper
                    initialValues={defaultState}
                    state={() => this.state}
                    onSubmit={async (values) => {
                      console.log(values)
                      const aiCreatedMessage = await this.createAiModel(this.context.token, await values)
                      const pythonScriptMessage = await this.uploadPythonScript(this.context.token, await values, this.state.aiId)
                      if (pythonScriptMessage === "Python Script uploaded successfully" && values.modelFiles.length > 0) {
                        const modelFilesMessage = await this.uploadModelFiles(this.context.token, await values, this.state.aiId)
                        this.setState({ aiCreatedMessage: aiCreatedMessage, pythonScriptMessage: pythonScriptMessage, modelFilesMessage: modelFilesMessage })
                      } else {
                        this.setState({ aiCreatedMessage: aiCreatedMessage, pythonScriptMessage: pythonScriptMessage, modelFilesMessage: "No model files were submitted" })
                      }
                      return this.state
                      }
                    }
                  >

                    <FormikStep
                      label="Create Model"
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
                          />
                        </Box>
                        <Box paddingBottom={4}>
                          <Field fullWidth
                            component={TextField}
                            name="description"
                            type="text"
                            label="Description"
                            InputProps={{ multiline: true }}
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
                      label="Add Model Files"
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
                            2. Add Model Files
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