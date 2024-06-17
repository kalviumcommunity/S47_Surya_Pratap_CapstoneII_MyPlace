import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateListing = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [sale, setSale] = useState(false);
  const [rent, setRent] = useState(false);
  const [parking, setParkingSpot] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [offer, setOnOffer] = useState(false);
  const [ACrooms, setACRooms] = useState(false);
  const [messFacility, setmessFacility] = useState(false);
  const [wifiAvailable, setFreeWifi] = useState(false);
  const [bedrooms, setBedRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [regularPrice, setregularPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisablebutton] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [userRef, setUserRef] = useState("");
  const [errMessage, setErrorMessages] = useState("");

  useEffect(() => {
    console.log("current listing id", id);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/api/listing/getListingById/${id}`)
      .then((res) => {
        const { data } = res;
        setName(data.name);
        setAddress(data.address);
        setDescription(data.description);
        setSale(data.type === "sale");
        setRent(data.type === "rent");
        setParkingSpot(data.parking || false);
        setFurnished(data.furnished || false);
        setOnOffer(data.offer || false);
        setACRooms(data.ACrooms || false);
        setmessFacility(data.messFacility || false);
        setFreeWifi(data.wifiAvailable || false);
        setBedRooms(data.bedrooms || 0);
        setBathrooms(data.bathrooms || 0);
        setregularPrice(data.regularPrice || 0);
        setDiscountPrice(data.discountPrice || 0);
        setUserRef(currentUser.data.rest._id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let type = rent ? "rent" : sale ? "sale" : "";
    if (discountPrice) {
      setDiscountPrice(discountPrice);
    }
    setUserRef(currentUser.data.rest._id);

    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URI}/api/listing/updateListing-info/${id}`,
        {
          name,
          address,
          description,
          type,
          parking,
          furnished,
          offer,
          ACrooms,
          messFacility,
          wifiAvailable,
          bedrooms,
          regularPrice,
          discountPrice,
          bathrooms,
          userRef,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        setDisablebutton(true);
        console.log(res.data);
        setUploadSuccessMessage(res.data.message);
        setTimeout(() => {
          navigate(`/listing/${id}`);
        }, 1500);
      })
      .catch((err) => {
        setUploadSuccessMessage("");
        setIsLoading(false);
        console.log(err);
        console.log(err.response.data);
        setErrorMessages(err.response.data);
      });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        {" "}
        Update a Listing
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
            value={name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            id="description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            id="address"
            required
            onChange={(e) => setAddress(e.target.value)}
            value={address}
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
                checked={parking}
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
                checked={offer}
                onChange={(e) => setOnOffer(e.target.checked)}
              />
              <span className="mt-1">On Offer</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="ACrooms"
                className="w-5"
                checked={ACrooms}
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
                checked={wifiAvailable}
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
                value={bedrooms}
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
                value={bathrooms}
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
                value={regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">{`💲/ month`}</span>
              </div>
            </div>
            {offer ? (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="discountPrice"
                  required
                  className="p-3 border border-gray-300 rounded-lg w-20"
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  value={discountPrice}
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
          <div className="flex flex-col flex-1 gap-4">
            <button
              className="uppercase text-white bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
              disabled={disableButton ? true : false}
            >
              {isLoading ? "Updating..." : "UpdateListing"}
            </button>
          </div>
        </div>
      </form>
      {uploadSuccessMessage && (
        <div
          className="bg-green-100 border-red-400 text-green-600 px-4 py-3 rounded-lg relative text-center font-semibold mt-3"
          role="success"
        >
          <strong className="font-bold"> {uploadSuccessMessage} </strong>
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
export default UpdateListing;
