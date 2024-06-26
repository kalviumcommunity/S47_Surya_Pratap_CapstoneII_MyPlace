import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateListingVideos = () => {
  const { id } = useParams();
  const [FetchedVideos, setFetchedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState([]);
  const [videosUpdateSuccessMessage, setVideosUpdateSuccessMessage] =
    useState("");
  const [errMessage, setErrorMessages] = useState("");
  const [disabledButton, setDisablebutton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URI}/api/listing/getListingById/${id}`
      )
      .then((res) => {
        setFetchedVideos(res.data.videos);
      });
  }, [id]);

  const handelsubmit = (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("videos", file[i]);
        console.log("adding videos");
      }
      axios
        .put(
          `${
            import.meta.env.VITE_BACKEND_URI
          }/api/listing/updateListing-videos/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          setVideosUpdateSuccessMessage("Videos Updated Successfully");
          setDisablebutton(true);
          setErrorMessages("");
          setTimeout(() => {
            navigate(`/listing/${id}`);
          }, 1500);
        })
        .catch((err) => {
          setVideosUpdateSuccessMessage("");
          console.log(err);
          setIsLoading(false);
          setErrorMessages(err.response.data);
          setDisablebutton(false);
        });
    } catch (error) {
      setIsLoading(false);
      setDisablebutton(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {" "}
        Update The Videos
      </h1>
      <p className="text-xl font-semibold my-7"> Videos Uploaded By You</p>
      <div className="flex flex-wrap gap-1 w-full h-full">
        {FetchedVideos.map((item, index) => (
          <div
            key={index}
            className="w-1/3 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3"
          >
            <video className="w-full h-full rounded-lg shadow-md" controls>
              <source
                src={`${import.meta.env.VITE_BACKEND_URI}${item.replace(
                  /\\/g,
                  "/"
                )}`}
                type="video/mp4"
              />
            </video>
          </div>
        ))}
      </div>
      <form onSubmit={handelsubmit} className="mt-5 flex flex-col gap-4">
        <p>Max Upload limit 2 </p>
        <input
          type="file"
          multiple
          className="p-3 border border-gray-300 rounded w-full"
          onChange={(e) => setFile(e.target.files)}
          accept=".mp4, .mkv"
        />
        <button
          className="uppercase text-white bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          disabled={disabledButton ? true : false}
        >
          {isLoading ? "Updating..." : "Update Videos"}
        </button>
      </form>
      {videosUpdateSuccessMessage && (
        <div
          className="bg-green-100 border-red-400 text-green-600 px-4 py-3 rounded-lg relative text-center"
          role="success"
        >
          <strong className="font-bold"> {videosUpdateSuccessMessage} </strong>
        </div>
      )}
      {errMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center font-semibold mt-3"
          role="alert"
        >
          {errMessage}
        </div>
      )}
    </main>
  );
};

export default UpdateListingVideos;
