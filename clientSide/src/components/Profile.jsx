import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [fullName, setFullName] = useState('Burt Macklin');
  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('00923469874656');
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="w-66.66 p-4 mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 my-7 text-center">Profile</h1>
      <div className="flex flex-col max-w-lg mx-auto gap-4">
        <form className="gap-4">
          <img
            src={currentUser.data.rest.avatar}
            alt="userImg"
            className="rounded-full h-24 w-24 object-cover cursor-pointer mx-auto mb-2"
          />
          <div className="flex items-center mb-4">
            <label htmlFor="fullName" className="w-1/4 font-semibold">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              id="fullName"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="email" className="w-1/4 font-semibold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="password" className="w-1/4 font-semibold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update Profile</button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
