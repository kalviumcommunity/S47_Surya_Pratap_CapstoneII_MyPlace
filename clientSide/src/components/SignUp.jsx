import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import OAuth from "./OAuth";


const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:300/api/auth/signup', formData);
      console.log(res.data);
      setLoading(false);
      setError("");
    } catch (error) {
      console.error("error message", error.response.data.error);
      setLoading(false);
      if (error.response && error.response.data && Array.isArray(error.response.data.error)) {
        const errorMessages = error.response.data.error.map(err => err.message).join(", ");
        setError(errorMessages);
      } else {
        setError(error.response.data.error);
      }
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"> Sign Up </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username" onChange={handleChange} />
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:-80">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/sing-in'>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
