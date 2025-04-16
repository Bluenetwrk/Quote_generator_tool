import { Configuration, LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "097b08ff-185e-4153-aedc-0e5814e0570c",  // Replace with your Application (client) ID
    authority: "https://login.microsoftonline.com/ae4ae520-4db7-4149-ad51-778e540d8bec",  // Replace with your Tenant ID
    // redirectUri: "http://localhost:80",  // Your app's redirect URI
    redirectUri: "https://www.itwalkin.com",  // Your app's redirect URI
  },
  cache: {
    cacheLocation: "localStorage", // Options: sessionStorage, localStorage
    storeAuthStateInCookie: false,  // Set to true for IE11 support
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.INFO,
      loggerCallback: (level, message, containsPii) => {
        // console.log(message);
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
  
};
// console.log(loginRequest.scopes);
