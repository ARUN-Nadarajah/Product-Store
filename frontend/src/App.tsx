import Home from "./pages/Home.tsx";
import Shopping from "./pages/shopping.tsx";
import Team from "./pages/Team.tsx";
import Products from "./pages/Products.tsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Shopping />} />
        <Route path="/team" element={<Team />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
