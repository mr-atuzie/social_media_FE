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
import { SET_LOGIN } from "./redux/features/userSlice";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { fetchPosts } from "./redux/features/postSlice";
import Post from "./pages/Post";
import ScrollTop from "./components/ScrollTop";
import Notifications from "./pages/Notifications";
import Followers from "./pages/Followers";
import Search from "./pages/Search";
import Private from "./components/Private";
import Auth from "./components/Auth";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLoginStatus = async () => {
      try {
        const { data } = await axios.get(`/api/v1/user/loginStatus`, {
          withCredentials: true,
        });

        console.log(data);

        dispatch(SET_LOGIN(data));
        dispatch(fetchPosts());
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
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollTop />
      <Navbar />
      <Routes>
        <Route element={<Private />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/uploadPhoto" element={<UplaodPhoto />} />

            <Route element={<Auth />}>
              <Route path="/profile/:id" element={<Profile />} />
            </Route>
            <Route path="/post/:id" element={<Post />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/followers" element={<Followers />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Route>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
