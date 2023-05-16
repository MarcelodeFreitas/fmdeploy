import { useState, useEffect, useContext } from "react";
import Sidebar from "../../Sidebar";
import "../../Sidebar.css";
import "./Main.css";
import AppHeader from "../../AppHeader";
import StoreContext from "../../Store/Context";
import CustomizedSnackbar from "../../Alert";
import Cards from "../../Cards";
import axiosInstance from "../../axios/axiosInstance";
import CollapsibleTable from "../../CollapsibleTable";
import axios from "axios";
import NoContentCard from "../../NoContentCard";

function RunHistory() {
  const { token } = useContext(StoreContext);

  const [runHistory, setRunHistory] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const handleErrorMessage = (message) => {
    setErrorMessage("");
    setErrorMessage(message);
  };

  //handle messages
  const [message, setMessage] = useState({
    message: "",
    severity: "",
  });
  //handle messages for the child components
  const handleMessage = (message, severity) => {
    setMessage({ message: "", severity: "" });
    setMessage({ message: message, severity: severity });
  };

  /* //reload page when a flag is submitted
  const [reloadFlag, setReloadFlag] = useState(false);
  const handleReload = () => {
    setReloadFlag(!reloadFlag);
  }; */

  useEffect(() => {
    //get the run history for the current user
    const getRunHistory = async () => {
      try {
        const response = await axiosInstance.get("/runhistory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("getRunHistory: ", await response.data);
        return await response.data.reverse();
      } catch (e) {
        console.log("getRunHistory error: ", await e.response);
        if (e.response) {
          console.log("getRunHistory error detail: ", e.response.data.detail);
          handleErrorMessage(e.response.data.detail);
        }
      }
    };

    const fetchRunHistory = async () => {
      const runHistoryFromServer = await getRunHistory();
      setRunHistory(runHistoryFromServer);
    };

    fetchRunHistory();
  }, [token, message]);

  return (
    <>
      <Sidebar />
      {message && (
        <CustomizedSnackbar
          message={message.message}
          severity={message.severity}
        />
      )}
      <div className="main">
        <AppHeader title="Run History" />
        {errorMessage && <NoContentCard text={errorMessage} />}

        <CollapsibleTable
          token={token}
          historyList={runHistory}
          handleMessage={handleMessage}
        />
      </div>
      <Cards />
    </>
  );
}

export default RunHistory;
