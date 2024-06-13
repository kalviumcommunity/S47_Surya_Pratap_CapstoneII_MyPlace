import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaMapMarkerAlt } from "react-icons/fa";
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
import { useSelector } from "react-redux";
import Contact from "./Contact";
import { Link } from "react-router-dom";

const Listings = () => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showImages, setShowImages] = useState(true);
  const [showVideos, setShowVideos] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`http://localhost:300/api/listing/getListingById/${id}`)
        .then((res) => {
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
    <main className="container mx-auto p-4 gap-3 relative">
      {loading && <p className="text-center my-7 text-2xl">Loading... </p>}
      {error && <p className="text-center my-7 text-2xl"> {error} </p>}
      {listing && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:h-96 ">
            {showImages ? (
              <Swiper navigation>
                {listing.images.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={
                        url ||
                        "https://th.bing.com/th/id/R.220c3d532bfbbb479f817e41e0d11e4e?rik=FImtOPw4JZfjTQ&riu=http%3a%2f%2fhudsonheightsres.com%2fwp-content%2fuploads%2fsites%2f5%2f2020%2f02%2f20150730-174343-20150730-174359-scaled.jpg&ehk=RR01ft7Qr5XExuMaieCZ9HdFqn5QQmKrVEAZAZJJbn4%3d&risl=&pid=ImgRaw&r=0"
                      }
                      alt=""
                      className="object-cover object-center max-w-full h-auto md:max-h-96 rounded-lg shadow-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 sm:flex-col">
                  {listing.videos.map((videoURL, index) => (
                    <video
                      className="max-w-full h-full rounded-lg shadow-md sm:w-1/2 flex-col md:w-1/2 lg:w-1/2"
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
                </div>
              </>
            )}
            <div className="flex justify-center mt-6 my-6 absolute bottom-0 left-1/2">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 uppercase px-4 py-2 mr-2 rounded-md"
                onClick={handleImageDisplay}
              >
                Show Images
              </button>
              <button
                className="text-white bg-red-500 hover:bg-red-600 uppercase px-4 py-2 rounded-md"
                onClick={handleVideoDisplay}
              >
                Show Videos
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start p-4">
            <div className="flex items-center text-2xl font-bold mb-2">
              <h2>{listing.name}</h2> -<span>{listing.regularPrice}/Month</span>
            </div>
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
                  ${listing.regularPrice - listing.discountPrice} off
                </p>
              )}
              {currentUser &&
                listing.userRef !== currentUser.data.rest._id &&
                !contact && (
                  <button
                    className="bg-green-700 text-white  uppercase py-1 px-2 rounded-md hover:opacity-95"
                    onClick={() => setContact(true)}
                  >
                    Contact Landlord/Warden
                  </button>
                )}
              {contact && <Contact listing={listing} />}
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
      <div className="flex gap-4 items-center mt-6 static bottom-0">
        <Link to={`/update-listing-information/${id}`}>
          <button className="text-blue-700 uppercase p-1 ">
            Edit Information
          </button>
        </Link>
        <Link to={`/update-listing-images/${id}`}>
          <button className="text-blue-700 uppercase p-1">Edit Images</button>
        </Link>
        <Link to={`/update-listing-videos/${id}`}>
          <button className="text-blue-700 uppercase p-1  ">Edit Videos</button>
        </Link>
      </div>
    </main>
  );
};

export default Listings;
