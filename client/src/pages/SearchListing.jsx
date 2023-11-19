import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { IoLocation } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const SearchListing = () => {
  const [searchData, setSearchData] = useState([]);
  const [formData, setFormData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTermUrl = searchParams.get("searchTerm");
    const typeUrl = searchParams.get("type");
    const offerUrl = searchParams.get("offer");
    const parkingUrl = searchParams.get("parking");
    const furnishedUrl = searchParams.get("furnished");
    const sortUrl = searchParams.get("sort");
    const orderUrl = searchParams.get("order");
    if (
      searchTermUrl ||
      typeUrl ||
      offerUrl ||
      parkingUrl ||
      furnishedUrl ||
      sortUrl ||
      orderUrl
    ) {
      setFormData({
        searchTerm: searchTermUrl || "",
        type: typeUrl || "all",
        offer: offerUrl === "true" ? true : false,
        parking: parkingUrl === "true" ? true : false,
        furnished: furnishedUrl === "true" ? true : false,
        sort: sortUrl || "createdAt",
        order: orderUrl || "desc",
      });
    }

    const searchAndGetData = async () => {
      const searchQuery = searchParams.toString();
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/getlist?${searchQuery}`);
        const data = await response.json();
        setLoading(false);
        if (data.success === false) {
          return console.log(data.message);
        }
        setSearchData(data);
        navigate(`/search?${searchQuery}`);
      } catch (error) {
        console.log(error);
      }
    };
    searchAndGetData();
  }, [navigate, location.search]);

  const handleChange = (e) => {
    if (e.target.name === "searchTerm" || e.target.name === "type") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else if (e.target.name === "sort") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setFormData({ ...formData, sort, order });
    } else {
      setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("searchTerm", formData.searchTerm);
    params.set("type", formData.type);
    params.set("offer", formData.offer);
    params.set("parking", formData.parking);
    params.set("furnished", formData.furnished);
    params.set("sort", formData.sort);
    params.set("order", formData.order);
    const searchQuery = params.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <main className="flex flex-col md:flex-row">
      <aside className="md:w-[30%] border-b md:h-screen md:border-r shadow flex flex-col items-center gap-3 text-[17px]">
        <div className="flex w-[95%] justify-between p-4 items-center gap-2">
          <label htmlFor="searchTerm" className="w-1/4 font-semibold">
            Keyword:
          </label>
          <input
            value={formData?.searchTerm}
            onChange={handleChange}
            type="text"
            name="searchTerm"
            id="searchTerm"
            placeholder="Search..."
            className="p-3 w-[70%] rounded-md shadow border-none outline-none"
          />
        </div>
        <div className="flex w-[95%] flex-wrap items-center gap-3 p-3">
          <span className="font-semibold">Type: </span>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              type="checkbox"
              name="type"
              value="all"
              className="w-5"
              checked={formData.type === "all"}
            />{" "}
            <label htmlFor="all">Rent & Sale</label>
          </div>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              type="checkbox"
              name="type"
              value="rent"
              className="w-5"
              checked={formData.type === "rent"}
            />{" "}
            <label htmlFor="rent">Rent</label>
          </div>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              type="checkbox"
              name="type"
              value="sale"
              className="w-5"
              checked={formData.type === "sale"}
            />{" "}
            <label htmlFor="sale">Sale</label>
          </div>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              checked={formData.offer}
              type="checkbox"
              name="offer"
              className="w-5"
            />{" "}
            <label htmlFor="offer">Offer</label>
          </div>
        </div>

        <div className="flex w-[95%] flex-wrap p-3 gap-4 items-center">
          <span className="font-semibold">Amenities: </span>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              checked={formData.parking}
              type="checkbox"
              name="parking"
              className="w-5"
            />{" "}
            <label htmlFor="parking">Parking</label>
          </div>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              checked={formData.furnished}
              type="checkbox"
              name="furnished"
              className="w-5"
            />{" "}
            <label htmlFor="furnished">Furnished</label>
          </div>
        </div>
        <div className="flex p-3 w-[95%] gap-4 items-center">
          <span className="font-semibold">Sort: </span>
          <select
            onChange={handleChange}
            defaultValue={"createdAt_desc"}
            name="sort"
            className="p-3 w-[14rem] rounded-md"
          >
            <option value="regularPrice_desc">Price: high to low</option>
            <option value="regularPrice_asc">Price: low to high</option>
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc">Oldest</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="uppercase bg-[var(--text1)] text-white rounded p-3 w-[90%] m-3 hover:opacity-80 active:shadow-md"
        >
          search
        </button>
      </aside>
      <section className="md:w-2/3 p-3">
        <h2 className="text-[26px] border-b font-semibold text-[var(--text1)] px-4">
          Listing results:
        </h2>
        {!loading && searchData.length === 0 && (
          <p className="text-center p-12 text-[var(--text1)]">
            No Listing Found!
          </p>
        )}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6 my-5 mx-4">
            {searchData?.map((data) => (
              <Link
                to={`/listing/${data._id}`}
                key={data._id}
                className="w-full rounded-lg flex flex-col gap-6 overflow-hidden shadow-lg relative"
              >
                <img
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
                    <IoLocation className="inline text-green-600 mb-1" />{" "}
                    {data.address}
                  </p>
                  <p className="line-clamp-2 text-gray-500 text-[17px]">
                    {data.description}
                  </p>
                  <p className="text-green-600 text-[20px] font-semibold relative">
                    <span
                      className={`${
                        data.offer &&
                        "line-through text-[14px] absolute top-[-12px] "
                      }`}
                    >
                      $ {data.regularPrice}{" "}
                    </span>
                    {data.offer && (
                      <span>$ {data.regularPrice - data.discountPrice}</span>
                    )}
                    {data.type === "rent" && (
                      <span className="text-black">/ month</span>
                    )}
                  </p>
                  <div className="text-[17px] flex flex-wrap gap-2 font-medium">
                    {data.bedrooms > 0 && <p>{data.bedrooms} Beds</p>}
                    {data.bathrooms > 0 && <p>{data.bathrooms} Baths</p>}
                    {data.furnished && (
                      <p className="text-green-500">Furnished</p>
                    )}
                    {data.parking && <p className="text-green-500">Parking</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default SearchListing;
