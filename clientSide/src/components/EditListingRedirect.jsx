import { Link, useParams } from "react-router-dom";

function EditListingRedirect() {
  const { id } = useParams();
  return (
    <div className="flex gap-4 items-center">
      <Link to={`/update-listing-information/${id}`}>
        <button className="text-blue-700 uppercase p-1 ">
          Edit Information
        </button>
      </Link>
      <Link to={`/update-listing-images/${id}`}>
        <button className="text-blue-700 uppercase p-1 ">Edit Images</button>
      </Link>
      <Link to={`/update-listing-videos/${id}`}>
        <button className="text-blue-700 uppercase p-1 ">Edit Videos</button>
      </Link>
    </div>
  );
}

export default EditListingRedirect;
