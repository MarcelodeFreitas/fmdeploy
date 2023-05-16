import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./CollapsibleTable.css";
import { Button, TextField } from "@material-ui/core";
import { Flag, FlagOutlined } from "@material-ui/icons";
import { useState } from "react";
import axiosInstance from "./axios/axiosInstance";
import Link from "@mui/material/Link";

function Row(props: { row: any; token: string; handleMessage: Function }) {
  const { row } = props;
  const { token } = props;
  const { handleMessage } = props;
  const inputFileID = row.fk_input_file_id;
  /*  console.log("ROW:", row);
  console.log("TOKEN:", token); */
  const [open, setOpen] = React.useState(false);
  const [flagDescription, setFlagDescription] = useState("");
  const handleChange = (event: any) => {
    setFlagDescription(event.target.value);
  };

  //flag output file, providing the input file id and flag description (optional)
  const flagOutputFile = async (
    token: string,
    fileId: string,
    flagged: boolean,
    flagDescription: string
  ) => {
    console.log(
      "fileId: ",
      fileId,
      "flagged: ",
      flagged,
      "flagDescription: ",
      flagDescription
    );
    try {
      const response = await axiosInstance.put(
        "/runhistory/flag",
        {
          input_file_id: fileId,
          flagged: flagged,
          flag_description: flagDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("flagOutputFile response: ", await response);
      console.log(
        "flagOutputFile response.data.detail: ",
        await response.data.detail
      );
      handleMessage(await response.data.detail, "success");
    } catch (e: any) {
      console.log("flagOutputFile error: ", e.response.data.detail);
      handleMessage(e.response.data.detail, "error");
    }
  };

  const handleFileDownload = async (
    token: string,
    fileId: string,
    fileName: string,
    type: string
  ) => {
    console.log(
      "handleFileDownload fileId: ",
      fileId,
      "handleFileDownload type: ",
      type
    );

    try {
      const url = await getFileUrl(token, fileId, type);

      const link = createDownloadLink(url, fileName);

      link.click();
    } catch (e: any) {
      console.log("handleFileDownload error: ", e.response?.data?.detail);
      handleMessage(
        e.response?.data?.detail || "Error downloading file",
        "error"
      );
    }
  };

  const getFileUrl = async (token: string, fileId: string, type: string) => {
    const response = await axiosInstance.get(`/files/${type}file/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const blobUrl = window.URL.createObjectURL(blob);
    return blobUrl;
  };

  const createDownloadLink = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    return link;
  };

  const handleSubmit = async (
    token: string,
    inputFileID: string,
    flagDescription: string
  ) => {
    try {
      //perform the flag request
      await flagOutputFile(token, inputFileID, true, flagDescription);
      /* setOpen(false); */
      setFlagDescription("");
    } catch (e: any) {
      console.log("handleSubmit error: ", e.response.data.detail);
      handleMessage(e.response.data.detail, "error");
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {row.flagged ? (
              open ? (
                <FlagOutlined color="error" />
              ) : (
                <Flag color="error" />
              )
            ) : open ? (
              <KeyboardArrowUpIcon color="primary" />
            ) : (
              <KeyboardArrowDownIcon color="primary" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {" "}
          {row.title}{" "}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.email}
        </TableCell>
        <TableCell align="right">
          <Link
            component="button"
            variant="body2"
            underline="always"
            onClick={() =>
              handleFileDownload(
                token,
                row.fk_input_file_id,
                row.input_file_name,
                "input"
              )
            }
          >
            {row.input_file_name}
          </Link>
        </TableCell>
        <TableCell align="right">
          {row.output_file_name ? (
            <Link
              component="button"
              variant="body2"
              underline="always"
              onClick={() =>
                handleFileDownload(
                  token,
                  row.fk_output_file_id,
                  row.output_file_name,
                  "output"
                )
              }
            >
              {row.output_file_name}
            </Link>
          ) : (
            "No file available"
          )}
        </TableCell>
        <TableCell align="right">
          {new Date(row.timestamp).toLocaleString("pt-PT", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.flagged ? "Output Flagged" : "Output not flagged"}
              </Typography>
              {row.flagged ? (
                <div
                  style={{
                    marginLeft: "10px",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ marginRight: "10px" }}
                  >
                    Flag description:
                  </Typography>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.flag_description}
                  </Typography>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60%",
                    maxWidth: "700px",
                    minWidth: "350px",
                    borderRadius: 5,
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{ color: "#0385B0", fontWeight: "bold" }}
                  >
                    Flag erroneous output
                  </Typography>
                  <div style={{ padding: "4%" }}>
                    <Typography variant="body1">
                      Flag an output if you notice something wrong or
                      unexpected, and describe the issue or error you have
                      observed in the provided text box.
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "90%",
                      paddingBottom: "4%",
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Description"
                      value={flagDescription}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      inputProps={{ maxLength: 255 }}
                    />
                  </div>
                  <div style={{ paddingTop: 20 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleSubmit(token, inputFileID, flagDescription)
                      }
                    >
                      SUBMIT
                    </Button>
                  </div>
                </div>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props: {
  historyList: any[];
  token: string;
  handleMessage: Function;
}) {
  const rows = props.historyList;
  console.log("ROWS:", rows);
  console.log("PROPS:", props);

  return (
    <>
      {rows ? (
        <TableContainer
          component={Paper}
          sx={{ marginTop: "3%", maxHeight: "70vh" }}
        >
          <Table aria-label="collapsible table">
            <TableHead
              sx={{
                maxHeight: 400,
                "& .MuiTableCell-head": {
                  backgroundColor: "#0385B0",
                  color: "#FFFFFF",
                  position: "sticky",
                  top: 0,
                },
              }}
            >
              <TableRow>
                <TableCell>Flag</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Input</TableCell>
                <TableCell align="right">Output</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row
                  key={row.run_history_id}
                  row={row}
                  token={props.token}
                  handleMessage={props.handleMessage}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
}
