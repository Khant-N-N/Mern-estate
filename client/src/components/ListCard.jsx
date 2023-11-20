import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";

const ListCard = ({ data }) => {
  return (
    <Link
      to={`/listing/${data._id}`}
      key={data._id}
      className="w-full rounded-lg flex flex-col gap-6 overflow-hidden shadow-lg relative hover:shadow-xl"
    >
      <img
        loading="lazy"
        src={data.imageUrls[0]}
        alt={data.name}
        className="w-full h-[200px] object-cover hover:scale-[1.1] transition-transform"
      />

      <p className="absolute top-0 right-0 bg-red-400 capitalize py-1 px-5 text-[16px] rounded-lg text-white">
        For {data.type}
      </p>

      <div className="flex flex-col gap-3 px-4 py-3">
        <h4 className="line-clamp-1 text-[20px] text-[var(--text1)] font-semibold capitalize">
          {data.name}
        </h4>
        <p className="text-[var(--text2)] text-[17px]">
          <IoLocation className="inline text-green-600 mb-1" /> {data.address}
        </p>
        <p className="line-clamp-2 text-gray-500 text-[17px]">
          {data.description}
        </p>
        <p className="text-green-600 text-[20px] font-semibold relative">
          <span
            className={`${
              data.offer && "line-through text-[14px] absolute top-[-12px] "
            }`}
          >
            $ {data.regularPrice}{" "}
          </span>
          {data.offer && (
            <span>$ {data.regularPrice - data.discountPrice}</span>
          )}
          {data.type === "rent" && <span className="text-black">/ month</span>}
        </p>
        <div className="text-[17px] flex flex-wrap gap-2 font-medium">
          {data.bedrooms > 0 && <p>{data.bedrooms} Beds</p>}
          {data.bathrooms > 0 && <p>{data.bathrooms} Baths</p>}
          {data.furnished && <p className="text-green-500">Furnished</p>}
          {data.parking && <p className="text-green-500">Parking</p>}
        </div>
      </div>
    </Link>
  );
};

export default ListCard;
