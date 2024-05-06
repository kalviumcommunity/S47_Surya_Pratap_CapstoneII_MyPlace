import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [imagefiles, setImagefiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [sale, setSale] = useState(false);
  const [rent, setRent] = useState(false);
  const [parkingSpot, setParkingSpot] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [onOffer, setOnOffer] = useState(false);
  const [acRooms, setACRooms] = useState(false);
  const [messFacility, setmessFacility] = useState(false);
  const [freeWifi, setFreeWifi] = useState(false);
  const [bedrooms, setBedRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [regularPrice, setregularPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [validationErrors, setValidationErrors] = useState([]);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisablebutton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let typeValue = rent ? "rent" : sale ? "sale" : "";
    let formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("type", typeValue);
    formData.append("parking", parkingSpot);
    formData.append("furnished", furnished);
    formData.append("offer", onOffer);
    formData.append("ACrooms", acRooms);
    formData.append("messFacility", messFacility);
    formData.append("wifiAvailable", freeWifi);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("regularPrice", regularPrice);
    if (discountPrice) {
      formData.append("discountPrice", discountPrice);
    }
    formData.append("userRef", currentUser.data.rest._id);
    for (let i = 0; i < imagefiles.length; i++) {
      if (imagefiles.length > 6) {
        alert("You can only upload 6 Images");
      }
      formData.append("images", imagefiles[i]);
    }
    for (let i = 0; i < videos.length; i++) {
      if (videos.length > 2) {
        alert("You can only upload 2 videos");
      }
      formData.append("videos", videos[i]);
    }
    console.log(formData); // For testing
    await axios
      .post(`http://localhost:300/api/listing/create`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setDisablebutton(true);
        setValidationErrors("");
        setUploadSuccessMessage(res.data.message);
        setTimeout(() => {
          navigate(`/listing/${res.data.createdListing._id}`);
        }, 1500);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        console.log(err.response.data.error);
        if (err.response.data.error) {
          setValidationErrors(
            err.response.data.error.map((err) => err.message)
          );
        }
      });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {" "}
        Create a Listing
      </h1>
      <form
        className="flex flex-col sm:flex-row gap-8 mt-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            className="border p-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            id="description"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            id="address"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={sale}
                onChange={(e) => setSale(e.target.checked)}
              />
              <span className="mt-1">Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={rent}
                onChange={(e) => setRent(e.target.checked)}
              />
              <span className="mt-1">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={parkingSpot}
                onChange={(e) => setParkingSpot(e.target.checked)}
              />
              <span className="mt-1">Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
              />
              <span className="mt-1">Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={onOffer}
                onChange={(e) => setOnOffer(e.target.checked)}
              />
              <span className="mt-1">On Offer</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="ACrooms"
                className="w-5"
                checked={acRooms}
                onChange={(e) => setACRooms(e.target.checked)}
              />
              <span className="mt-1">AC Rooms</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="messFacility"
                className="w-5"
                checked={messFacility}
                onChange={(e) => setmessFacility(e.target.checked)}
              />
              <span className="mt-1">Mess Available</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="wifiAvailable"
                className="w-5"
                checked={freeWifi}
                onChange={(e) => setFreeWifi(e.target.checked)}
              />
              <span className="mt-1">FreeWifi</span>
            </div>
          </div>
          <div className=" flex  flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg w-20"
                onChange={(e) => setBedRooms(e.target.value)}
              />
              <p>No. of bedrooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                min="1"
                required
                className="p-3 border border-gray-300 rounded-lg w-20"
                onChange={(e) => setBathrooms(e.target.value)}
              />
              <p>No. of bathrooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                required
                className="p-3 border border-gray-300 rounded-lg w-20"
                onChange={(e) => setregularPrice(e.target.value)}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">{`💲/ month`}</span>
              </div>
            </div>
            {onOffer ? (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="discountPrice"
                  required
                  className="p-3 border border-gray-300 rounded-lg w-20"
                  onChange={(e) => setDiscountPrice(e.target.value)}
                />
                <div className="flex flex-col items-center">
                  <p>Discout Price</p>
                  <span className="text-xs">{`💲/ month`}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold flex items-center">
            Images
            <span className="font-normal text-gray-600 ml-2 flex">
              The first Image will be the cover <br />
              Upload size should be less than 10mb (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
              onChange={(e) => setImagefiles(e.target.files)}
            />
          </div>
          <p className="font-semibold">
            Videos
            <span className="font-normal text-gray-600 ml-2">
              Videos will be used as a highlight (max 2)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="videos"
              accept=".mp4, .mkv"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
              onChange={(e) => setVideos(e.target.files)}
            />
          </div>
          <button
            className="uppercase text-white bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
            disabled={disableButton ? true : false}
          >
            {isLoading ? "Creating..." : "Create Listing"}
          </button>
          {validationErrors.length > 0 && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Validation Errors:</strong>
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {uploadSuccessMessage && (
            <div
              className="bg-green-100 border-red-400 text-green-600 px-4 py-3 rounded-lg relative text-center"
              role="success"
            >
              <strong className="font-bold"> {uploadSuccessMessage} </strong>
            </div>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
