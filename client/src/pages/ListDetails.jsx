import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { IoLocation } from "react-icons/io5";
import { FaBed, FaBath, FaChair } from "react-icons/fa6";
import { FaCar, FaShare } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SendMessage from "../components/SendMessage";
import { useSelector } from "react-redux";

const ListDetails = () => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(false);
  const [contact, setContact] = useState(false);
  console.log(detail);
  useEffect(() => {
    const getDetail = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(`/api/listing/detail/${id}`);
        const data = await response.json();
        setLoading(false);
        if (data.success === false) return setError("Error getting data");
        setDetail(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
        setLoading(false);
      }
    };
    getDetail();
  }, [id]);
  return (
    <main className="relative">
      {error && (
        <p className="text-red-500 flex items-center justify-center h-[60vh]">
          Something went wrong!
        </p>
      )}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Swiper navigation>
            {detail?.imageUrls.map((url, key) => (
              <SwiperSlide key={key}>
                <img
                  src={url}
                  alt="ig"
                  className="w-full h-[80vh] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            title="share"
            onClick={() => {
              setCopy(true);
              navigator.clipboard.writeText(window.location.href);
              setTimeout(() => {
                setCopy(false);
              }, 600);
            }}
            className="p-4 bg-[--sec] absolute z-10 right-5 top-10 rounded-full cursor-pointer hover:opacity-50"
          >
            <FaShare />
          </div>
          <p
            className={`${
              copy ? "scale-100" : "scale-0"
            } transition-all absolute top-24 right-3 z-10 bg-[var(--sec)] p-3 rounded`}
          >
            Link Copied
          </p>
          <div className="w-full max-w-[800px] mx-auto p-5">
            <h2 className="font-bold my-3 text-[24px]">
              {detail?.name} -{" "}
              <span className={`${detail?.offer && "line-through"}`}>
                $ {detail?.regularPrice.toLocaleString("en-US")}
              </span>{" "}
              {detail?.offer && (
                <span>
                  ${" "}
                  {(
                    detail?.regularPrice - detail?.discountPrice
                  ).toLocaleString("en-US")}
                </span>
              )}
              {detail?.type === "rent" && "/ month"}
            </h2>
            <p className="text-[var(--text2)] text-[17px]">
              <IoLocation className="inline text-green-600 mb-1" />{" "}
              {detail?.address}
            </p>
            <button
              type="button"
              className="px-8 py-1 my-3 capitalize bg-red-500 rounded-md mr-3 text-[17px] text-white"
            >
              For {detail?.type}
            </button>
            {detail?.offer && (
              <button
                type="button"
                className="px-8 py-1 my-3 capitalize bg-green-500 rounded-md text-[17px] text-white"
              >
                $ {detail?.discountPrice} discount
              </button>
            )}
            <p className="text-[17px] my-5">
              <span className="font-bold">Description - </span>{" "}
              <span>{detail?.description}</span>
            </p>
            <div className="flex flex-wrap items-center gap-5 text-green-500 text-[16px] font-semibold">
              {detail?.bedrooms > 0 && (
                <p className="flex items-center gap-3">
                  <FaBed /> {detail?.bedrooms} bedroooms
                </p>
              )}
              {detail?.bathrooms > 0 && (
                <p className="flex items-center gap-3">
                  <FaBath /> {detail?.bathrooms} bathroooms
                </p>
              )}
              {detail?.furnished && (
                <p className="flex items-center gap-3">
                  <FaChair /> furnished
                </p>
              )}
              {detail?.parking && (
                <p className="flex items-center gap-3 ">
                  <FaCar /> Parking
                </p>
              )}
            </div>
            {currentUser._id !== detail?.userRef && !contact && (
              <button
                onClick={() => setContact(!contact)}
                className="p-3 bg-[var(--text2)] w-full rounded my-6 text-white hover:opacity-70 uppercase"
              >
                Contact landlord
              </button>
            )}
            {contact && <SendMessage detail={detail} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default ListDetails;
