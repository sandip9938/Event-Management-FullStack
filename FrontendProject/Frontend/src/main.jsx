import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import "./index.css";

// Lazy load App for performance optimization
const App = React.lazy(() => import("./App"));

// Get the root element safely
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Ensure the HTML file has <div id='root'></div>");
}

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen text-white">Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
