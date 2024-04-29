import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaMapMarkerAlt } from "react-icons/fa";
import EditListingRedirect from "./EditListingRedirect";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { FaSquareParking } from "react-icons/fa6";
import { LuParkingSquareOff } from "react-icons/lu";
import { GiSofa } from "react-icons/gi";
import { TbSofaOff } from "react-icons/tb";
import { MdFastfood } from "react-icons/md";
import { MdNoFood } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { FiWifi } from "react-icons/fi";
import { FiWifiOff } from "react-icons/fi";

const Listings = () => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showVideos, setShowVideos] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`http://localhost:300/api/listing/getListingById/${id}`)
        .then((res) => {
          console.log(res);
          setListing(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
          setLoading(false);
        });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [id, setListing]);

  const handleImageDisplay = () => {
    setShowImages(true);
    setShowVideos(false);
  };
  const handleVideoDisplay = () => {
    setShowImages(false);
    setShowVideos(true);
  };

  return (
    <main className="container mx-auto p-4">
      {loading && <p className="text-center my-7 text-2xl">Loading... </p>}
      {error && <p className="text-center my-7 text-2xl"> {error} </p>}
      {listing && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:h-96">
            {showImages ? (
              <Swiper navigation>
                {listing.images.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt=""
                      className="object-cover object-center max-w-full h-auto md:max-h-96 rounded-lg shadow-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <>
                {listing.videos.map((videoURL, index) => (
                  <video
                    className="max-w-full h-auto rounded-lg shadow-md"
                    controls
                    key={index}
                  >
                    <source
                      src={`http://localhost:300${videoURL.replace(
                        /\\/g,
                        "/"
                      )}`}
                      type="video/mp4"
                    />
                  </video>
                ))}
              </>
            )}

            <div className="mt-3">
              <button
                className="text-green-700 uppercase p-1"
                onClick={handleImageDisplay}
              >
                Show Images
              </button>
              <button
                className="text-red-700 uppercase p-1"
                onClick={handleVideoDisplay}
              >
                Show Videos
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start p-4">
            <h2 className="text-2xl font-bold mb-2">{listing.name}</h2>
            <p className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <FaMapMarkerAlt className="text-green-700" /> {listing.address}
            </p>
            <div className="flex items-center gap-4">
              <p
                className={`py-1 px-2 rounded-md ${
                  listing.type === "rent" ? "bg-green-500" : "bg-blue-500"
                } text-white text-center`}
              >
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="text-sm">
                  ${listing.regularPrice - listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-gray-800 my-4">{listing.description}</p>
            <ul className="text-sm text-gray-900 grid grid-cols-2 gap-2">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed size={20} /> {listing.bedrooms}{" "}
                {listing.bedrooms > 1 ? "beds" : "bed"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath size={20} /> {listing.bathrooms}{" "}
                {listing.bathrooms > 1 ? "bathrooms" : "bathroom"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                {listing.parking ? (
                  <>
                    <FaSquareParking size={20} /> Parking Available
                  </>
                ) : (
                  <>
                    <LuParkingSquareOff size={20} /> No Parking
                  </>
                )}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                {listing.furnished ? (
                  <>
                    <GiSofa size={20} /> Furnished
                  </>
                ) : (
                  <>
                    <TbSofaOff size={20} /> Not Furnished
                  </>
                )}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                {listing.messFacility ? (
                  <>
                    <MdFastfood size={20} /> Mess Available
                  </>
                ) : (
                  <>
                    <MdNoFood size={20} /> No Mess
                  </>
                )}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                {listing.ACrooms ? (
                  <>
                    <TbAirConditioning size={20} /> AC Rooms
                  </>
                ) : (
                  <>
                    <TbAirConditioningDisabled size={20} /> Only Non AC Rooms
                  </>
                )}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                {listing.wifiAvailable ? (
                  <>
                    <FiWifi size={20} /> Free Wifi
                  </>
                ) : (
                  <>
                    <FiWifiOff size={20} /> No Wifi Service
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      <EditListingRedirect />
    </main>
  );
};

export default Listings;
