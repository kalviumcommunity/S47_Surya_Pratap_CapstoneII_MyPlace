import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFaliure, signInSuccess } from "../redux/user/userSlice";
import OAuth from "./OAuth";


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    try {
      const res = await axios.post('http://localhost:300/api/auth/signin', formData);
      console.log(res.data);
      console.log(res.data.userData);
      const userData = await res.data.userData
      localStorage.setItem("accesstoken", res.data.token)
      dispatch(signInSuccess(userData))
      navigate('/profile')

    } catch (error) {
      console.log(error.response.data);
      console.error("error message", error.response.data.error);
      if (error.response && error.response.data && Array.isArray(error.response.data.error)) {
        const errorMessages = error.response.data.error.map(err => err.message).join(", ");
        dispatch(signInFaliure(errorMessages))
      } else {
        dispatch(signInFaliure(error.response.data))
      }
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"> Sign In </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:-80">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to='/sing-up'>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
