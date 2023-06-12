import { getString } from "./Utility";

async function WebRequest(props) {
  let data = [];
  let fullPath = props.path;
  let Status = 0;
  let StatusText = "";

  if (props.parameter >= 0) {
    data = {};
  }
  if (props.parameter > 0) {
    fullPath = fullPath + "/" + props.parameter;
  }

  let url = global.config.URL.Path + `/` + fullPath;

  /*console.log("url:", url);
  console.log("parameter:", props.parameter);
  console.log("method:", props.method);
  console.log("body:", props.body);*/

  await fetch(url, {
    method: props.method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json, text/plain, */*",
    },
    body: JSON.stringify(props.body),
  })
    .then((response) => {
      Status = response.status;
      StatusText = response.statusText;
      //console.log("data>>>> ", response, "Status:", Status);
      return response.json();
    })
    .then((actualData) => {
      data = actualData;
      if (!data.isSuccess || Status !== 200) {
        console.log("data not OK >> ", data);
        let title = "";
        let errDetails = "";
        if (getString(data.displayMessage) !== "") title = data.displayMessage;
        if (getString(data.title) !== "") title = title + " " + data.title;
        if (getString(data.errorMessages) !== "")
          errDetails = data.errorMessages;
        if (Object.hasOwn(data, "errors") && data.errors !== null)
          errDetails = errDetails + " " + Object.values(data.errors)[0];

        data = setErrorMessage(
          title,
          errDetails,
          Status,
          StatusText,
          url,
          props.method,
          props.body
        );
      }
    })

    .catch((error) => {
      data = setErrorMessage(
        error.message,
        error,
        Status,
        StatusText,
        url,
        props.method,
        props.body
      );
    });

  //console.log("Data -------->", data);
  return data;
}
async function Get(path, parameter) {
  let props = { path: path, parameter: parameter, method: "GET" };
  return await WebRequest(props);
}

async function Put(path, parameter, body) {
  let props = { path: path, parameter: parameter, method: "PUT", body: body };

  return await WebRequest(props);
}

async function Post(path, body) {
  let props = { path: path, parameter: 0, method: "POST", body: body };

  return await WebRequest(props);
}

async function Delete(path, parameter) {
  let props = { path: path, parameter: parameter, method: "DELETE" };

  return await WebRequest(props);
}

async function setErrorMessage(
  errorMsg,
  errorDetail,
  Status,
  StatusText,
  url,
  method,
  body
) {
  let errObj = {};
  errObj.isSuccess = false;
  errObj.Url = url;
  errObj.Error = errorMsg;
  errObj.Status = Status;
  errObj.StatusText = StatusText;
  errObj.ErrorDetail =
    errorDetail !== "" && errorDetail !== errorMsg
      ? "Details:" + errorDetail
      : "";
  errObj.Method = method;
  errObj.Body = body;
  console.log("error::>> ", errObj.Status);
  // add log to sql server table
  //await AddErrorLog(errObj);
  return errObj;
}

async function AddErrorLog(error) {
  if (error.length === 0) return;
  const errLog = {
    id: 0,
    url: error.Url,
    status: error.Status,
    statusText: error.StatusText,
    message: error.Error,
    details: error.ErrorDetail,
    method: error.Method,
    body: error.Body,
  };
  await Post("SystemLog", errLog);
}
export { Get, Put, Post, Delete, AddErrorLog };
