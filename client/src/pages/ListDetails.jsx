import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { IoLocation } from "react-icons/io5";
import { FaBed, FaBath, FaChair } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const ListDetails = () => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
    <main>
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

          <div className="w-full max-w-[800px] mx-auto p-5">
            <h2 className="font-bold my-3 text-[24px]">
              {detail?.name} - <span>$ {detail?.regularPrice}</span>
            </h2>
            <p className="text-[var(--text2)] text-[17px]">
              <IoLocation className="inline text-green-600 mb-1" />{" "}
              {detail?.address}
            </p>
            <button
              type="button"
              className="px-8 py-1 my-3 capitalize bg-red-500 rounded-md"
            >
              For {detail?.type}
            </button>
            <p className="text-[17px] my-5">
              <span className="font-bold">Description - </span>{" "}
              <span>{detail?.description}</span>
            </p>
            <div className="flex flex-wrap items-center gap-5">
              {detail?.bedroooms > 0 && (
                <p className="flex items-center gap-3 text-green-500 text-[16px]">
                  <FaBed /> {detail?.bedroooms} bedroooms
                </p>
              )}
              {detail?.bathrooms > 0 && (
                <p className="flex items-center gap-3 text-green-500 text-[16px]">
                  <FaBath /> {detail?.bathrooms} bathroooms
                </p>
              )}
              {detail?.furnished && (
                <p className="flex items-center gap-3 text-green-500 text-[16px]">
                  <FaChair /> furnished
                </p>
              )}
              {detail?.parking && (
                <p className="flex items-center gap-3 text-green-500 text-[16px]">
                  <FaCar /> Parking
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ListDetails;
