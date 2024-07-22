import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Import from "./components/Import";
import Edit from "./components/Edit";
import Export from "./components/Export";
import App from "./App";
import Dashboard from "./components/Dashboard";
import {CssBaseline} from "@mui/material";

import "./index.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"} element={<App />}>
            <Route path={""} element={<Dashboard />}/>
            <Route path={"import"} element={<Import />} />
            <Route path={"edit"} element={<Edit />} />
            <Route path={"export"} element={<Export/>} />
        </Route>
    )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <CssBaseline />
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
