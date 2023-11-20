// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper";
// import { Navigation } from "swiper/modules";
// import "swiper/css/bundle";
import useFetchData from "../hooks/useFetchData";
import RecentListings from "../components/RecentListings";
import { Link } from "react-router-dom";

const Home = () => {
  // SwiperCore.use([Navigation]);
  const { listing: offerList, loading: loadingOffer } = useFetchData(
    "/api/listing/getlist?limit=4&offer=true"
  );
  const { listing: rentList, loading: loadingRent } = useFetchData(
    "/api/listing/getlist?limit=4&type=rent"
  );
  const { listing: saleList, loading: loadingSale } = useFetchData(
    "/api/listing/getlist?limit=4&type=sale"
  );
  return (
    <main className="flex flex-col items-center">
      <section className="w-[90%] md:w-4/5 px-4 py-24 flex flex-col gap-6 items-start">
        <h1 className="text-[38px] md:text-[48px] font-semibold text-[var(--text1)]">
          Find your next <span className="text-[var(--text2)]">perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-[--text2] text-[15px]">
          JJ Estate will help you find your home fast,
          <br /> easy and comfortable. Our expert support are always available.
        </p>
        <Link to="/search" className="text-blue-800 font-semibold">
          Lets start now...
        </Link>
      </section>
      <section>
        {/* <Swiper navigation>
          {!loadingOffer &&
            offerList?.map((offer) => (
              <SwiperSlide key={offer._id}>
                <img
                  src={offer.imageUrls[0]}
                  alt={offer.name}
                  className="w-full h-[400px] object-cover"
                />
              </SwiperSlide>
            ))}
        </Swiper> */}
      </section>
      <section className="w-[90%] md:w-4/5 px-4">
        {loadingOffer ? (
          <div className="text-[var(--text1)] text-center py-11">
            loading...
          </div>
        ) : (
          <RecentListings
            title="offers"
            link={`/search?offer=true`}
            lists={offerList}
          />
        )}
      </section>
      <section className="w-[90%] md:w-4/5 px-4">
        {loadingRent ? (
          <div className="text-[var(--text1)] text-center py-11">
            loading...
          </div>
        ) : (
          <RecentListings
            title="places for rent"
            link={`/search?type=rent`}
            lists={rentList}
          />
        )}
      </section>
      <section className="w-[90%] md:w-4/5 px-4">
        {loadingSale ? (
          <div className="text-[var(--text1)] text-center py-11">
            loading...
          </div>
        ) : (
          <RecentListings
            title="places for sale"
            link={`/search?type=sale`}
            lists={saleList}
          />
        )}
      </section>
    </main>
  );
};

export default Home;
