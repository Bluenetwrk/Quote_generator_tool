import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google'
// import { PublicClientApplication } from '@azure/msal-browser';
// import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter } from 'react-router-dom';
import { MsalProvider,  } from "@azure/msal-react";
import {  PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./Job-Portal/Config";
import YearData from './YearData copy';

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <MsalProvider instance={msalInstance}>
    <GoogleOAuthProvider clientId="418754353770-u3bibuhf3upqjb7r95qflh10apqvhset.apps.googleusercontent.com">
    {/* <YearData /> */}
    <App />
    </GoogleOAuthProvider>
    </MsalProvider>
    </>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
