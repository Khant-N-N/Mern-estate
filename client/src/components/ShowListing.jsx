import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const ShowListing = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await fetch(`api/user/listing/${currentUser._id}`);
        const data = await response.json();
        setLists([...data]);
      } catch (error) {
        console.log(error);
      }
    };
    getListing();
  }, [currentUser, lists]);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`api/listing/delete/${id}`, {
        method: "delete",
      });
      const data = await response.json();
      if (data.success === false) setError("Error deleting data.");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <h3 className="text-center text-2xl font-semibold my-5">Your Listings</h3>
      {error && <p className="text-red-500 text-[16px]">{error}</p>}
      {lists.length === 0 && (
        <p className="text-center text-gray-400 text-[16px] h-28 flex items-center justify-center">
          Your list is empty
        </p>
      )}
      {!lists ? (
        <Loader />
      ) : (
        lists.map((list) => (
          <div
            key={list._id}
            className="flex justify-between items-center p-3 border shadow rounded mb-2"
          >
            <img
              src={list.imageUrls[0]}
              alt="house"
              className="w-20 object-cover rounded"
            />
            <p>{list.name}</p>
            <div className="flex flex-col gap-2 text-[16px]">
              <button
                disabled={loading}
                onClick={() => handleDelete(list._id)}
                className="text-red-500 hover:opacity-70"
              >
                DELETE
              </button>
              <Link
                to={`/editlist/${list._id}`}
                className="text-green-500 hover:opacity-70"
              >
                EDIT
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowListing;
