import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);



/*
Q1- import React from "react"; ??? why??
A1- This is the first line of code in a React application. 
It imports the React library and assigns it the name "React".
This is necessary because React is a JavaScript 
library, and we need to import it in order to use its functions
and components.
Yes, importing React is required in this code snippet
because you're using JSX (<BrowserRouter>, 
<AuthContextProvider>, <App />), which gets transpiled 
into React.createElement() calls under the hood by tools 
like Babel.
 */