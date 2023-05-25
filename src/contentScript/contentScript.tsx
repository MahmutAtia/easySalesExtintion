// TODO: content script
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./contentScript.css";
import { Typography, Box, Grid, Button } from "@mui/material";
import MyCard from "../components/Card";
import Container from "../components/Container";


const App: React.FC<{}> = () => {
  const [active, setActive] = React.useState(true);

 

  // recive message from popup
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log("recive message");
    console.log(request);
    if (request) {
      console.log("toggle");
      setActive(!active);
    }
  });



  if (!active) {
    return null;
  }


  return (
    <div className="fixed z-[999]  top-20 right-6">
        <h1 className="text-xl font-bold">Hello World</h1>
    <Container />
    </div>
   
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);



{/* <div className="z-50 fixed top-40 left-96 flex flex-col justify-evenly items-center space-y-4 bg-white  h-[600px] w-96 ">
<h1 className="text-xl font-bold">Hello World</h1>
<Button onClick={()=>setActive(false)} variant="contained" color="success"> close</Button>
<MyCard title="Company Name" content={result.companyName} />
<MyCard title="Email Address" content={result.emailAddress} />
<MyCard title="Phone Number" content={result.phoneNumber} />
<MyCard title="Website" content={result.website} />

<Button
  onClick={clearData}
  className="bg-red-500 text-white rounded-md px-4 py-2"
>
  Clear Data
</Button>
</div> */}