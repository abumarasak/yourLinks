import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WithoutNav from "./func/WithoutNav";
import WithNav from "./func/WithNav";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithNav />}></Route>
        <Route element={<WithoutNav />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
