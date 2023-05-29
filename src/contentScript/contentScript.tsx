// TODO: content script
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./contentScript.css";
import DraggableElement from "../components/Dragable";


const App: React.FC<{}> = () => {

  const [result, setResult] = React.useState({
    companyName: "",
    emailAddress: "",
    phoneNumber: "",
    website: "",
    country: "",
    visable: false,
  });

  const loadDataFromStorage = () => {
    chrome.storage.sync.get(
      ["companyName", "emailAddress", "phoneNumber", "website", "visable", "country"],
      function (data) {
        setResult((prev) => ({ ...prev, ...data }));
      }
    );
  };

    // Listen for changes in storage data
    chrome.storage.onChanged.addListener(function (changes) {
        for (let key in changes) {
          setResult((prev) => ({ ...prev, [key]: changes[key].newValue }));
        }
      });
  
  React.useEffect(() => {
    loadDataFromStorage();


  }, [result.visable]); // Only run once on component mount

 

  // recive message from popup
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request) {
      chrome.storage.sync.set({ visable: !result.visable }, function () {
        setResult((prev) => ({ ...prev, visable: !prev.visable }));

      });
    }
  });



  if (!result.visable) {
    return null;
  }

  return (
        <DraggableElement result={result} setResult={setResult} />
   
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);


