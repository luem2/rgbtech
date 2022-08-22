import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL = "http://localhost:3003/";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		
			<App />
		
	</Provider>
);
