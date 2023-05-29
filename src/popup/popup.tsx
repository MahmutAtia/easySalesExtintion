import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { Button,TextField, Autocomplete } from "@mui/material";
import axios from "axios";


const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2NjYwMjAzLCJpYXQiOjE2ODQyNDEwMDMsImp0aSI6ImNiODgwNTA1YWIwZTQ3NjNhZTcyNTU5NmI0OGUxYzg1IiwidXNlcl9pZCI6Mn0.b7_e1zfN0Rv3bE8QYM9X5iI91G9PNj1RwGfXL35TqbM";


const App: React.FC<{}> = () => {
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  // send message to content script
  const sendMessage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, "toggle");
    });
  };

  // set object in the storage
  const setObject = (obj) => {
    chrome.storage.sync.set(obj, function () {
    });
  };

  const url = "http://localhost:8000/";

  useEffect(() => {
    const countryEndpoint = url + "api/companies/country";

    axios
      .get(countryEndpoint, { headers: { Authorization: `JWT ${apikey}` } })
      .then((res) => {
        setOptions(res.data.results || []);
      })
      .catch((err) => {
      });


  }, []);


  return (
    <div className="bg-white h-40 w-96">
      <div className="flex flex-row items-center space-x-10">
   

{ options.length > 0 && <Autocomplete
       getOptionLabel={(option) => option.name}
     
        onChange={(e, newValue) => {
          setValue({ ...value, ["country"]:newValue.name })

      }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />}
        <Button onClick={() => setObject({ country: inputValue })}>
          Set Country
        </Button>

        <Button onClick={sendMessage} variant="outlined" color="secondary">
          Toggle
        </Button>
      </div>
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
