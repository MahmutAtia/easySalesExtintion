import { TextField, Button, Alert, Snackbar } from "@mui/material";
import React, { MouseEvent } from "react";
import SendIcon from "@mui/icons-material/Send";
import { CheckCompany, SendNewCompany } from "../API/SendNewCompany";
import "./Container.css";

export default function Container({ result, setResult }) {
  const [dataerrors, setDataerrors] = React.useState({});
  const [success, setSuccess] = React.useState(false);




    // check for company name
    const handleCheckForCompynyName = async (companyName) => {
      console.log(companyName);
      CheckCompany(companyName).then((res) => {
        if (res.status === 200) {
          setDataerrors({ companyName: "this Company Name is already exist" });
        } else if (res.status === 204) {
          setDataerrors({});
        }
      });
    };


  // clear all data
  const clearData = () => {
    chrome.storage.sync.set(
      {
        companyName: "",
        emailAddress: "",
        phoneNumber: "",
        website: "",
      },
      function () {
        setResult({
          ...result,
          companyName: "",
          emailAddress: "",
          phoneNumber: "",
          website: "",
        });

        setDataerrors({});
      }
    );
  };

  // set title
  const setTitle = () => {
   
    navigator.clipboard.readText().then((clipText) => {
      // check for company name



      chrome.storage.sync.set({ companyName: clipText }, function () {
        setResult({ ...result, companyName: clipText });
      });
    });



  };

  // set website
  const setWebsite = () => {
    navigator.clipboard.readText().then((clipText) => {
      chrome.storage.sync.set({ website: clipText }, function () {
        setResult({ ...result, website: clipText });
      });
    });
  };

  // set email
  const setEmail = () => {
    navigator.clipboard.readText().then((clipText) => {
      chrome.storage.sync.set({ emailAddress: clipText }, function () {
        setResult({ ...result, emailAddress: clipText });
      });
    });
  };

  // set phone
  const setPhone = () => {
    navigator.clipboard.readText().then((clipText) => {
      chrome.storage.sync.set({ phoneNumber: clipText }, function () {
        setResult({ ...result, phoneNumber: clipText });
      });
    });
  };

  // Clear a data
  const clearOnePiese = (obj) => {
    chrome.storage.sync.set(obj, function () {
      setResult({ ...result, ...obj });
      setDataerrors({});
    });
  };

  // send new company to the backend
  const sendNew = () => {
    const data = {
      name: result.companyName,
      country: result.country,
      email: result.emailAddress,
      phone: result.phoneNumber,
      website: result.website,
    };
    SendNewCompany(data)
      .then((res) => {
        if (res.status === 201) {
          setSuccess(true);
          clearData();
        }
      })
      .catch((err) => {
        setDataerrors(err.response.data);
      });
  };

  const handleClose = (event: MouseEvent<Element>, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };



  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={
            handleClose as (event: React.SyntheticEvent<Element, Event>) => void
          }
          severity="success"
          sx={{ width: "100%" }}
        >
          {result.companyName} is added successfully !
        </Alert>
      </Snackbar>

      {/* Clear All  Hide Buttons*/}
      <div className="flex flex-row justify-end items-center space-x-4">

      <Button
          className="font-bold"
          onClick={() =>  handleCheckForCompynyName(result.companyName)}
        >
          {" "}
          Check Company Name{" "}
        </Button>
        <Button
          className="font-bold"
          onClick={() => clearOnePiese({ visable: false })}
        >
          {" "}
          Hide{" "}
        </Button>
        <Button className="font-bold" onClick={clearData}>
          {" "}
          Reset
        </Button>
      </div>

      <div
        onClick={sendNew}
        className="flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-500 cursor-pointer"
      >
        <SendIcon className="text-white" />
        <h1 className="mx-3 text-white font-semibold text-lg">Send</h1>
      </div>

      {/* Erorrs */}
      {Object.entries(dataerrors).map(([key, value]) => (
        <p key={key} className="text-red-500 text-xs italic">
          {` ${value}`}
        </p>
      ))}

      {/* Title */}
      <div className="py-4 px-6">
        {result.companyName === "" ? (
          <div className="flex flex-row justify-between">
            <TextField
              id="outlined-required"
              label="Title"
              defaultValue="Title"
              onChange={(e) => handleCheckForCompynyName(e.target.value)}
            />
            <Button onClick={setTitle}>paste</Button>
          </div>
        ) : (
          <div className="flex flex-row  justify-between ">
            <h1 className="text-2xl font-semibold text-gray-800">
              {result.companyName}
            </h1>
            <Button onClick={() => clearOnePiese({ companyName: "" })}>
              clear
            </Button>
          </div>
        )}
        <div className="flex items-center mt-4 text-gray-700 space-x-3">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
            <path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z" />
            <g>
              <path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z" />
            </g>
          </svg>
          {result.website === "" ? (
            <div className="flex flex-row justify-between ">
              <TextField
                id="outlined-required"
                label="Website"
                defaultValue="Website"
              />
              <Button onClick={setWebsite}>paste</Button>
            </div>
          ) : (
            <div className="flex flex-row justify-between">
              <h1 className="px-2 text-sm">{result.website}</h1>{" "}
              <Button onClick={() => clearOnePiese({ website: "" })}>
                clear
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center mt-4 text-gray-700">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
            <path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z" />
            <g>
              <path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z" />
            </g>
          </svg>

          {/* Phone Number */}
          {result.phoneNumber === "" ? (
            <div className="flex flex-row  justify-between ">
              <TextField
                id="outlined-required"
                label="Phone Number"
                defaultValue=""
              />
              <Button onClick={setPhone}>paste</Button>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center ">
              <h1 className="px-2 text-sm">
                Phone Number : {result.phoneNumber}
              </h1>{" "}
              <Button onClick={() => clearOnePiese({ phoneNumber: "" })}>
                clear
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center mt-4 justify-between text-gray-700">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
          </svg>
          {/* Email */}
          {result.emailAddress === "" ? (
            <div className="flex flex-row justify-between items-center  space-x-10">
              <TextField
                id="outlined-required"
                label="Email Address"
                defaultValue=""
              />
              <Button onClick={setEmail}>paste</Button>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center  space-x-10">
              <h1 className="px-2 text-sm">
                Email Address : {result.emailAddress}
              </h1>
              <Button onClick={() => clearOnePiese({ emailAddress: "" })}>
                clear
              </Button>
            </div>
          )}{" "}
        </div>

        {/* Country */}
        <div className="flex items-center mt-4 text-gray-700">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
            <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
          </svg>
          <h1 className="px-2 text-sm">{result.country}</h1>
        </div>
      </div>
    </div>
  );
}
