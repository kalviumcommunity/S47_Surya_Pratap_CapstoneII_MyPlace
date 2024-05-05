import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListingItem from "./ListingItem";

const SearchResults = () => {
  const [sideBarSearchData, setSideBarSearchData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
    ACrooms: false,
    messFacility: false,
    wifiAvailable: false,
  });
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(sideBarSearchData);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSideBarSearchData({ ...sideBarSearchData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSideBarSearchData({
        ...sideBarSearchData,
        searchTerm: e.target.value,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer" ||
      e.target.id === "ACrooms" ||
      e.target.id === "messFacility" ||
      e.target.id === "wifiAvailable"
    ) {
      setSideBarSearchData({
        ...sideBarSearchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sortOrder") {
      const sortValue = e.target.value;
      const sort = sortValue.split("_")[0] || "created_at";
      const order = sortValue.split("_")[1] || "desc";
      setSideBarSearchData({ ...sideBarSearchData, sort, order });
      console.log(sortValue, sort);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUri = urlParams.get("offer");
    const sortFromUri = urlParams.get("sort");
    const orderFromUri = urlParams.get("order");
    const ACroomsFromUri = urlParams.get("ACrooms");
    const messFacilityFromUri = urlParams.get("messFacility");
    const wifiAvailableFromUri = urlParams.get("wifiAvailable");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUri ||
      sortFromUri ||
      orderFromUri ||
      ACroomsFromUri ||
      messFacilityFromUri ||
      wifiAvailableFromUri
    ) {
      setSideBarSearchData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUri === "true" ? true : false,
        ACrooms: ACroomsFromUri === "true" ? true : false,
        messFacility: messFacilityFromUri === "true" ? true : false,
        wifiAvailable: wifiAvailableFromUri === "true" ? true : false,
        sort: sortFromUri || "created_at",
        order: orderFromUri || "desc",
      });
    }

    const fetchlistings = async () => {
      const searchQuery = urlParams.toString();
      setloading(true);
      await axios
        .get(
          `http://localhost:300/api/listing/getSearchedListings?${searchQuery}`
        )
        .then((res) => {
          setloading(false);
          console.log(res);
          setListings(res.data);
        })
        .catch((err) => {
          setloading(false);
          console.log(err.message);
        });
    };

    fetchlistings();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarSearchData.searchTerm);
    urlParams.set("type", sideBarSearchData.type);
    urlParams.set("parking", sideBarSearchData.parking);
    urlParams.set("furnished", sideBarSearchData.furnished);
    urlParams.set("offer", sideBarSearchData.offer);
    urlParams.set("sort", sideBarSearchData.sort);
    urlParams.set("order", sideBarSearchData.order);
    urlParams.set("ACrooms", sideBarSearchData.ACrooms);
    urlParams.set("messFacility", sideBarSearchData.messFacility);
    urlParams.set("wifiAvailable", sideBarSearchData.wifiAvailable);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label htmlFor="searchTerm" className="whitespace-nowrap">
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full font-semibold"
              value={sideBarSearchData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center mt-3">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sideBarSearchData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sideBarSearchData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sideBarSearchData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={sideBarSearchData.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center mt-3">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={sideBarSearchData.parking}
                onChange={handleChange}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={sideBarSearchData.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="ACrooms"
                className="w-5"
                checked={sideBarSearchData.ACrooms}
                onChange={handleChange}
              />
              <span>ACrooms</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="messFacility"
                className="w-5"
                checked={sideBarSearchData.messFacility}
                onChange={handleChange}
              />
              <span>Mess Facility</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="wifiAvailable"
                className="w-5"
                checked={sideBarSearchData.wifiAvailable}
                onChange={handleChange}
              />
              <span>Wifi Available</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sortOrder"
              className="border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest First</option>
              <option value="createdAt_asc">Oldest First</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 w-full rounded-lg hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No liting found!!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {
            !loading && listings.length > 0 && (
                listings.map((item, index) =>(
                    <ListingItem listing={item}  key={index}/>
                ))
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
