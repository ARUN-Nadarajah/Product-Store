import Home from "./pages/Home.tsx";
import Update from "./pages/update.tsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import AddProduct from "./pages/addProduct.tsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
