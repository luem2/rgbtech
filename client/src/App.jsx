import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/productDetails/:id" element={<ProductDetails />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
