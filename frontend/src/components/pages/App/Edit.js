import { Component } from "react"
import axiosInstance from "../../axios/axiosInstance"
import "../../Sidebar.css"
import "./Main.css"
import "./Run.css"
import Sidebar from "../../Sidebar"
import AppHeader from "../../AppHeader"
import Cards from "../../Cards"
import StoreContext from "../../Store/Context"
import CustomizedSnackbar from "../../Alert"
import { CircularProgress, Button, Container, Box, InputLabel, MenuItem } from "@material-ui/core"
import * as yup from 'yup'
import { Form, Formik, Field, ErrorMessage } from "formik"
import { CheckboxWithLabel, TextField, Select } from "formik-material-ui"
import { Anchorme } from "react-anchorme"

export default class Edit extends Component {

  static contextType = StoreContext

  date = new Date(this.props.location.state.created_in)

  formatedDate = new Intl.DateTimeFormat('pt').format(this.date)

  defaultState = {
    message: "",
    severity: "error",
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.defaultState,
      isSubmitting: false,
      responseData: "",
    }
  }

  //update project
  updateProject = async (token, projectId, values) => {
    console.log(token, projectId, values)
    try {
      const response = await axiosInstance.put(
        "/project",
        {
          project_id: projectId,
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
      this.setState({ message: await response.data.detail, severity: "success" })
      console.log(await response)
    } catch (e) {
      this.setState({ message: await e.response.data.detail, severity: "error" })
      console.log("updateProject error: ", e.response.data.detail)
    }
  }

  getProjectById = async (token, projectId) => {
    console.log(projectId)
    try {
      const response = await axiosInstance.get(
        `/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log(await response.data)
      this.setState({ responseData: await response.data })
    } catch (e) {
      console.log("getProjectById error: ", e.response)
      this.setState({ message: e.response.data.detail })
    }
  }


  render() {

    if (this.state.responseData) {
      return (
        <>
          <Sidebar />
          {this.state.message && <CustomizedSnackbar message={this.state.message} severity={this.state.severity} />}
          <div className="main">
            <AppHeader title={`EDIT: ${this.state.responseData.title}`} button="BACK" buttonIcon="" path="/my" />
            <Container>
              <Container className="run-white-container">
                <div className="run-data-line"><p className="run-top-label">PROJECT ID:</p> {this.state.responseData.project_id}</div>
                <br></br>
                <div className="run-row">
                  <div className="run-column">
                    <div className="run-data-line">
                      <p className="run-top-label">AUTHOR:</p> {this.props.location.state.name}
                    </div>
                  </div>
                  <div className="run-column">
                    <div className="run-data-line">
                      <p className="run-top-label">DATE:</p> {this.state.responseData.created_in}
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="run-data-line"><p className="run-top-label">LAST UPDATED:</p> {new Date(this.state.responseData.last_updated).toLocaleString()}</div>
              </Container>

              <Container className="run-white-container">
                <p className="run-top-label">DESCRIPTION:</p>
                <br></br>
                <Anchorme target="_blank" rel="noreferrer noopener">
                  {this.state.responseData.description}
                </Anchorme>
              </Container>

              <Container className="run-white-container">
                <p className="run-top-label">EDIT DATA:</p>
                <Formik
                  initialValues={{
                    title: this.state.responseData.title,
                    description: this.state.responseData.description,
                    inputType: this.state.responseData.input_type,
                    outputType: this.state.responseData.output_type,
                    isPrivate: this.state.responseData.is_private,
                  }}
                  validationSchema={yup.object().shape({
                    title: yup.string().max(60).required("Title is a required field"),
                    description: yup.string().required("Description is a required field"),
                    inputType: yup.string().required("Input Type is a required field"),
                    outputType: yup.string().required("Output Type is a required field"),
                    isPrivate: yup.boolean().required("Private is a required field"),
                  })}
                  onSubmit={async (values) => {
                    await this.updateProject(this.context.token, this.props.location.state.project_id, await values)
                    await this.getProjectById(this.context.token, this.props.location.state.project_id)
                  }}
                >
                  <Form>
                    <Box paddingBottom={2}>
                      <Box paddingBottom={2} paddingTop={4}>
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

                    <Button
                      startIcon={this.state.isSubmitting ? <CircularProgress size="1rem" /> : null}
                      disabled={this.state.isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {this.state.isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>

                  </Form>
                </Formik>
              </Container>

            </Container>
          </div>
        </>
      )
    } else {
      return (
        <>
          <Sidebar />
          {this.state.message && <CustomizedSnackbar message={this.state.message} severity={this.state.severity} />}
          <div className="main">
            <AppHeader title={`EDIT: ${this.props.location.state.title}`} button="BACK" buttonIcon="" path="/my" />
            <Container>
              <Container className="run-white-container">
                <div className="run-data-line"><p className="run-top-label">PROJECT ID:</p> {this.props.location.state.project_id}</div>
                <br></br>
                <div className="run-row">
                  <div className="run-column">
                    <div className="run-data-line">
                      <p className="run-top-label">AUTHOR:</p> {this.props.location.state.name}
                    </div>
                  </div>
                  <div className="run-column">
                    <div className="run-data-line">
                      <p className="run-top-label">DATE:</p> {new Date(this.props.location.state.created_in).toLocaleString()}
                    </div>
                  </div>
                </div>
              </Container>

              <Container className="run-white-container">
                <p className="run-top-label">DESCRIPTION:</p>
                <br></br>
                <Anchorme target="_blank" rel="noreferrer noopener">
                  {this.props.location.state.description}
                </Anchorme>
              </Container>

              <Container className="run-white-container">
                <p className="run-top-label">EDIT DATA:</p>
                <Formik
                  initialValues={{
                    title: this.props.location.state.title,
                    description: this.props.location.state.description,
                    inputType: this.props.location.state.input_type,
                    outputType: this.props.location.state.output_type,
                    isPrivate: this.props.location.state.is_private,
                  }}
                  validationSchema={yup.object().shape({
                    title: yup.string().max(60).required("Title is a required field"),
                    description: yup.string().required("Description is a required field"),
                    inputType: yup.string().required("Input Type is a required field"),
                    outputType: yup.string().required("Output Type is a required field"),
                    isPrivate: yup.boolean().required("Private is a required field"),
                  })}
                  onSubmit={async (values) => {
                    await this.updateProject(this.context.token, this.props.location.state.project_id, await values)
                    await this.getProjectById(this.context.token, this.props.location.state.project_id)
                  }}
                >
                  <Form>
                    <Box paddingBottom={2}>
                      <Box paddingBottom={2} paddingTop={4}>
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

                    <Button
                      startIcon={this.state.isSubmitting ? <CircularProgress size="1rem" /> : null}
                      disabled={this.state.isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {this.state.isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>

                  </Form>
                </Formik>
              </Container>

            </Container>
          </div>
          <Cards />
        </>
      )
    }
  }
}