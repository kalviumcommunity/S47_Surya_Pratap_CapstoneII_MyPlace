import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import About from "./components/About"
import Profile from "./components/Profile"

function App() {

  return (
    <>
      <h1 className="text-red-500">
        Hello world!
      </h1>
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/sign-in" element={<SignIn/>} ></Route>
        <Route path="/sign-Up" element={<SignUp/>} ></Route>
        <Route path="/about" element={<About/>} ></Route>
        <Route path="/profile" element={<Profile/>} ></Route>
      </Routes>
    </>
  )
}

export default App
