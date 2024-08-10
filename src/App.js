import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import UplaodPhoto from "./pages/UploadPhoto";
import Navbar from "./components/Navbar";
import Layout from "./pages/Layout";
import axios from "axios";
import { useEffect } from "react";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    const getLoginStatus = async () => {
      try {
        const { data } = await axios.get(`/api/v1/user/loginStatus`, {
          withCredentials: true,
        });

        // const loginStatus = res.data;
        console.log(data);

        // dispatch(SET_LOGIN(loginStatus));
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(message);
      }
    };
    getLoginStatus();
  }, []);

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
