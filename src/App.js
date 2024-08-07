import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import UplaodPhoto from "./pages/UploadPhoto";
import Navbar from "./components/Navbar";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/uploadPhoto" element={<UplaodPhoto />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
