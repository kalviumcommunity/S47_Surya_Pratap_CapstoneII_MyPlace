import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landloard, setLandloard] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandloard = async () => {
      try {
        await axios
          .get(
            `${import.meta.env.VITE_BACKEND_URI}/api/user/getLandloard/${
              listing.userRef
            }`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "access_token"
                )}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            setLandloard(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchLandloard();
  }, [listing.userRef]);

  return (
    <>
      {landloard && (
        <div className="flex flex-col gap-2 ">
          <p>
            Contact <span className="font-semibold">{landloard.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded"
          ></textarea>

          <Link
            to={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 "
          >
            Send Messsage
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
