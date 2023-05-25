import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import MyCard from "../components/Card";
import { Button } from "@mui/material";

const App: React.FC<{}> = () => {
  const [result, setResult] = React.useState(null);

  // send message to content script
  const sendMessage = () => {
    console.log("send message");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "toggle");
    });
  };


  useEffect(() => {
 
    chrome.storage.sync.get(
      ["companyName", "emailAddress", "phoneNumber", "website"],
      function (result) {
        console.log(result);
        setResult(result);
      }
    );} , [])

  return !result ? (
    <div> Loading ... </div>
  ) : (
    <div className="bg-white h-96 w-48">
      <Button onClick={sendMessage} variant="contained" color="success" className="w-48 h-12">
        send msg
      </Button>
      <MyCard title="Company Name" content={result.companyName} />
      <MyCard title="Email Address" content={result.emailAddress} />
      <MyCard title="Phone Number" content={result.phoneNumber} />
      <MyCard title="Website" content={result.website} />
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
