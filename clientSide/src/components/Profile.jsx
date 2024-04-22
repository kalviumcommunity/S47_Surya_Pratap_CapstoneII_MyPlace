import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSuccess,
  userSignoutFailure,
  userSignoutSuccess,
  userSignoutStart
} from "../redux/user/userSlice.js";

const Profile = () => {
  const { currentUser, loading, err } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [filePercentage, setFilePercentage] = useState(0);
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState("");
  useEffect(() => {
    if (file) {
      handelFileUpload(file);
    }
  }, [file]);

  const handelFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },

      (error) => {
        setfileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      axios
        .post(
          `http://localhost:300/api/user/update/${currentUser.data.rest._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          dispatch(updateUserSuccess(res));
          setUpdateSuccess("Profile Updated Successfully");
        })
        .catch((error) => dispatch(updateUserFailure(error.message)));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handelUserDelete = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      await axios
        .delete(
          `http://localhost:300/api/user/delete/${currentUser.data.rest._id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(deleteUserSuccess(res));
          sessionStorage.clear();
        })
        .catch((err) => {
          dispatch(deleteUserFaliure(err.message));
        });
    } catch (error) {
      dispatch(deleteUserFaliure(error.message));
    }
  };

  const handelSignOut = (e) => {
    e.preventDefault()
    try {
      dispatch(userSignoutStart())
      sessionStorage.clear()
      dispatch(userSignoutSuccess("User Deleted"))
    } catch (error) {
      dispatch(userSignoutFailure(error))
      
    }
  }

  return (
    <div className="w-66.66 p-4 mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 my-7 text-center">Profile</h1>
      <div className="flex flex-col max-w-lg mx-auto gap-4">
        <form className="gap-4" onSubmit={handelSubmit}>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            onClick={() => fileRef.current.click()}
            src={
              formData.avatar ||
              currentUser.data.rest.avatar ||
              currentUser.data.avatar
            }
            alt="userImg"
            className="rounded-full h-24 w-24 object-cover cursor-pointer mx-auto mb-2"
          />
          <p className="text-sm  flex items-center justify-center mb-1">
            {fileUploadError ? (
              <span className="text-red-700">
                {" "}
                Error While Uploading the image (image must be less than 2mb){" "}
              </span>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <span className="text-slate-700">
                {" "}
                {`Uploading ${filePercentage}%`}{" "}
              </span>
            ) : filePercentage === 100 ? (
              <span className="text-green-700"> Uploaded Successfully </span>
            ) : (
              " "
            )}
          </p>
          <div className="flex items-center mb-4">
            <label htmlFor="fullName" className="w-1/4 font-semibold">
              Full Name:
            </label>
            <input
              type="text"
              defaultValue={currentUser.data.rest.username}
              onChange={handelChange}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              id="username"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="email" className="w-1/4 font-semibold">
              Email:
            </label>
            <input
              type="email"
              defaultValue={currentUser.data.rest.email}
              onChange={handelChange}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="password" className="w-1/4 font-semibold">
              Password:
            </label>
            <input
              type="password"
              defaultValue={""}
              onChange={handelChange}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            className="w-full bg-slate-700 text-white rounded-lg p-3
           uppercase hover:opacity-95 disabled:opacity-80"
            disabled={loading}
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </form>
        <span className="text-green-700">
          {" "}
          {updateSuccess && updateSuccess}{" "}
        </span>
        <div className="flex justify-between mt-5">
          <span
            className="text-red-700 cursor-pointer"
            onClick={handelUserDelete}
          >
            Delete Account
          </span>
          <span className="text-red-700 cursor-pointer" onClick={handelSignOut}>Sign out</span>
        </div>
        <p className="text-red-700 mt-5">{err ? err : ""}</p>
      </div>
    </div>
  );
};

export default Profile;
