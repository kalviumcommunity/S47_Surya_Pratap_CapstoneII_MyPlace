import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Profile from "./components/Profile";
import Header from "./components/Header";
import OAuth from "./components/OAuth";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./components/CreateListing";
import UpdateListing from "./components/UpdateListing";
import EditListingRedirect from "./components/EditListingRedirect";
import UpdateListingImages from "./components/UpdateListingImages";
import UpdateListingVideos from "./components/UpdateListingVideos";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
          <Route
            path="/update-listing-information/:id"
            element={<UpdateListing />}
          ></Route>
          <Route
            path="/update-listing-options/:id"
            element={<EditListingRedirect />}
          ></Route>
          <Route
            path="/update-listing-images/:id"
            element={<UpdateListingImages />}
          ></Route>
          <Route
            path="/update-listing-videos/:id"
            element={<UpdateListingVideos />}
          ></Route>
        </Route>
        <Route path="/oauth" element={<OAuth />}></Route>
      </Routes>
    </>
  );
}

export default App;
