import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShowListing = () => {
  const [lists, setLists] = useState([]);
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
  }, [currentUser]);
  return (
    <div>
      {lists.map((list) => (
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
            <button className="text-red-500 hover:opacity-70">DELETE</button>
            <button className="text-green-500 hover:opacity-70">EDIT</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowListing;
