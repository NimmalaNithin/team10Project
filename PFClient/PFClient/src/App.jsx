import Login from "./pages/login";
import SignUp from "./pages/Signup";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="goals" element={<Goals />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
