import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateListingImages() {
  const { id } = useParams();
  const [FetchedImages, setFetchedImages] = useState([]);
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledButton, setDisablebutton] = useState(false);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");
  const [errorMesssages, setErrorMessages] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:300/api/listing/getListingById/${id}`)
      .then((res) => {
        setFetchedImages(res.data.images);
      });
  }, [id]);

  const handelsubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDisablebutton(true);
    try {
      setIsLoading(true);
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("images", file[i]);
        console.log("adding images");
      }
      axios
        .put(
          `http://localhost:300/api/listing/updateListing-images/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          console.log(res);
          setDisablebutton(false);
          setUpdateSuccessMessage("Image updated Succcessfully");
          setErrorMessages("");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.message);
          setErrorMessages(err);
          setDisablebutton(false);
        });
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setDisablebutton(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {" "}
        Update The Images
      </h1>
      <p className="text-xl font-semibold my-7"> Images Uploaded By You</p>
      <div className="flex flex-wrap gap-1">
        {FetchedImages.map((item, index) => (
          <img
            src={item}
            alt="Listing-images"
            key={index}
            className="rounded-lg h-full w-full object-cover cursor-pointer mb-2 md:w-1/2 mx-auto lg:w-1/3"
          />
        ))}
      </div>

      <form onSubmit={handelsubmit}>
        <input
          type="file"
          multiple
          className="p-3 border border-gray-300 rounded w-full"
          onChange={(e) => setFile(e.target.files)}
          accept="image/*"
        />
        <button
          className="uppercase text-white bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          disabled={disabledButton ? true : false}
        >
          {isLoading ? "Creating..." : "Create Listing"}
        </button>
      </form>
      {updateSuccessMessage && (
        <div
          className="bg-green-100 border-red-400 text-green-600 px-4 py-3 rounded-lg relative text-center"
          role="success"
        >
          <strong className="font-bold"> {updateSuccessMessage} </strong>
        </div>
      )}
      {errorMesssages && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {errorMesssages}
        </div>
      )}
    </main>
  );
}

export default UpdateListingImages;
