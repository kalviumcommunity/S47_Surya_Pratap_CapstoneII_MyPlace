import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import About from "./components/About"
import Profile from "./components/Profile"
import Header from "./components/Header"
import OAuth from "./components/OAuth"

function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/home" element={<Home/>} ></Route>
        <Route path="/sign-in" element={<SignIn/>} ></Route>
        <Route path="/sign-up" element={<SignUp/>} ></Route>
        <Route path="/about" element={<About/>} ></Route>
        <Route path="/profile" element={<Profile/>} ></Route>
        <Route path="/oauth" element={<OAuth/>} ></Route>
      </Routes>
    </>
  )
}

export default App
