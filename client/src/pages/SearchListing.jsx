import { useState } from "react";
import Loader from "../components/Loader";
import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";

const SearchListing = () => {
  const [searchData, setSearchData] = useState([
    {
      _id: "6557c305092fbcd96147d6f8",
      name: "Wake me up",
      description:
        "Feeling my way through the darkness\nGuided by a beating heart\nI can't tell where the journey will end\nBut I know where to start\nThey tell me I'm too young to understand\nThey say I'm caught up in a dream\nWell life will pass me by if I don't open up my eyes\nWell that's fine by me\nSo wake me up when it's all over\nWhen I'm wiser and I'm older\nAll this time I was finding myself, and I\nDidn't know I was lost\nSo wake me up when it's all over\nWhen I'm wiser and I'm older\nAll this time I was finding myself, and I\nDidn't know I was lost\nI tried carrying the weight of the world\nBut I only have two hands\nHope I get the chance to travel the world\nBut I don't have any plans\nWish that I could stay forever this young\nNot afraid to close my eyes\nLife's a game made for everyone\nAnd love is a prize\nSo wake me up when it's all over\nWhen I'm wiser and I'm older\nAll this time I was finding myself, and I\nDidn't know I was lost\nSo wake me up when it's all over\nWhen I'm wiser and I'm older\nAll this time I was finding myself, and I\nI didn't know I was lost\nI didn't know I was lost\nI didn't know I was lost\nI didn't know I was lost\nI didn't know",
      address: "23th, ayuu, shin da",
      regularPrice: 200,
      discountPrice: 1,
      bathrooms: 2,
      bedrooms: 4,
      furnished: true,
      parking: false,
      type: "rent",
      offer: false,
      imageUrls: [
        "https://firebasestorage.googleapis.com/v0/b/mern-estate-5b94a.appspot.com/o/1700250359851Cutty%20Flam%2C%20Monkey%20D.jpg?alt=media&token=72d75ace-5272-4b75-9753-e9d0960a991e",
      ],
      userRef: "6553b96714d1e263b200e06f",
      createdAt: "2023-11-17T19:46:13.829Z",
      updatedAt: "2023-11-17T19:46:13.829Z",
      __v: 0,
    },
    {
      _id: "6557b070f61628188a06abb6",
      name: "scientist",
      description:
        "Come up to meet you, tell you I'm sorry\nYou don't know how lovely you are\nI had to find you, tell you I need you\nTell you I set you apart\nTell me your secrets and ask me your questions\nOh, let's go back to the start\nRunning in circles, coming up tails\nHeads on a science apart\nNobody said it was easy\nIt's such a shame for us to part\nNobody said it was easy\nNo one ever said it would be this hard\nOh, take me back to the start\nI was just guessing at numbers and figures\nPulling the puzzles apart\nQuestions of science, science and progress\nDo not speak as loud as my heart\nBut tell me you love me, come back and haunt me\nOh and I rush to the start\nRunning in circles, chasing our tails\nComing back as we are\nNobody said it was easy\nOh, it's such a shame for us to part\nNobody said it was easy\nNo one ever said it would be so hard\nI'm going back to the start",
      address: "23th, shiin gan, Bassa",
      regularPrice: 29091245,
      discountPrice: 1,
      bathrooms: 1,
      bedrooms: 1,
      furnished: true,
      parking: true,
      type: "sale",
      offer: false,
      imageUrls: [
        "https://firebasestorage.googleapis.com/v0/b/mern-estate-5b94a.appspot.com/o/1700245590256Enel%20has%20a%20lightning%20hand.jfif?alt=media&token=e1c6604b-f888-48f6-be53-e5d0b3d360b1",
        "https://firebasestorage.googleapis.com/v0/b/mern-estate-5b94a.appspot.com/o/1700245590259wallhaven-p9j9e3.jpg?alt=media&token=3bade35f-a4e2-4428-82c0-e2400bdd1303",
      ],
      userRef: "65550a6bd3093930a9d2a4aa",
      createdAt: "2023-11-17T18:26:56.327Z",
      updatedAt: "2023-11-17T18:26:56.327Z",
      __v: 0,
    },
    {
      _id: "6557ae89f61628188a06a56c",
      name: "A na da that da war ",
      description:
        "Don't the water grow the trees\nDon't the moon pull the tide\nDon't the stars light the sky\nLike you need to light my life\nIf you need me anytime\nYou know I'm always right by your side\nSee I've never felt this love\nYou're the only thing that's on my mind\n\n[Pre-chorus:]\nYou don't understand how much you really mean to me\nI need you in my life\nYou're my necessity\nBut believe me you're everything\nThat just makes my world complete\nAnd my love is clear the only thing that I'll ever see\n\n[Chorus:]\nYou're all I ever need\nBaby, you're amazing\nYou're my angel come and save me\nYou're all I ever need\nBaby, you're amazing\nYou're my angel come and save me\n\nDon't the water grow the trees\nDon't the moon pull the tide\nDon't the stars light the sky\nLike you need to light my life\nWe can do anything you like\nI know we both can get it right tonight\nYou got your walls built up high\nI can tell by looking in your eyes\n\n[Pre-chorus:]\nYou don't understand how much you really mean to me\nI need you in my life\nYou're my necessity\nBut believe me you're everything\nThat just makes my world complete\nAnd my love is clear the only thing that I'll ever see\n\n[Chorus:]\nYou're all I ever need\nBaby, you're amazing\nYou're my angel come and save me\nYou're all I ever need\nBaby, you're amazing\nYou're my angel come and save me\n\n[2x]\nWhen it comes to you\nBaby, I'm addicted\nYou're like a drug, no rehab can fix it\nI think you're perfect, baby, even with your flaws\nYou ask what I like about you\nOoh, I love it all\n\n[Chorus 2x:]\nYou're all I ever need\nBaby, you're amazing\nYou're my angel come and save me\nYou're all I ever need\nBaby, you're amazing\nYou're my angel come and save me\n",
      address: "23th, ayuu, shin da",
      regularPrice: 20000600,
      discountPrice: 600,
      bathrooms: 4,
      bedrooms: 9,
      furnished: true,
      parking: false,
      type: "rent",
      offer: true,
      imageUrls: [
        "https://firebasestorage.googleapis.com/v0/b/mern-estate-5b94a.appspot.com/o/170024487354821593.jpg?alt=media&token=8df048f8-df26-4c83-ba3f-50b09bbb5455",
        "https://firebasestorage.googleapis.com/v0/b/mern-estate-5b94a.appspot.com/o/1700245033946bg-73.jpg?alt=media&token=fb697ef6-8cff-4095-b56b-4dcc455d550c",
      ],
      userRef: "65550a6bd3093930a9d2a4aa",
      createdAt: "2023-11-17T18:18:49.103Z",
      updatedAt: "2023-11-17T18:29:14.886Z",
      __v: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  return (
    <main className="flex flex-col md:flex-row">
      <aside className="md:w-[30%] border-b md:h-screen md:border-r shadow flex flex-col items-center gap-3 text-[17px]">
        <div className="flex w-[95%] justify-between p-4 items-center gap-2">
          <label htmlFor="search" className="w-1/4 font-semibold">
            Search Term:
          </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="p-3 w-[70%] rounded-md shadow border-none outline-none"
          />
        </div>
        <div className="flex w-[95%] flex-wrap items-center gap-3 p-3">
          <span className="font-semibold">Type: </span>
          <div className="flex gap-2">
            <input type="checkbox" name="all" className="w-5" />{" "}
            <label htmlFor="all">Rent & Sale</label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="rent" className="w-5" />{" "}
            <label htmlFor="rent">Rent</label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="sale" className="w-5" />{" "}
            <label htmlFor="sale">Sale</label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="offer" className="w-5" />{" "}
            <label htmlFor="offer">Offer</label>
          </div>
        </div>

        <div className="flex w-[95%] flex-wrap p-3 gap-4 items-center">
          <span className="font-semibold">Amenities: </span>
          <div className="flex gap-2">
            <input type="checkbox" name="parking" className="w-5" />{" "}
            <label htmlFor="parking">Parking</label>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="furnished" className="w-5" />{" "}
            <label htmlFor="furnished">Furnished</label>
          </div>
        </div>
        <div className="flex p-3 w-[95%] gap-4 items-center">
          <span className="font-semibold">Sort: </span>
          <select name="select" className="p-3 w-[10rem] rounded-md">
            <option value="">Asd</option>
            <option value="">des</option>
            <option value="">low</option>
            <option value="">high</option>
          </select>
        </div>
        <button className="uppercase bg-[var(--text1)] text-white rounded p-3 w-[90%] m-3 hover:opacity-80 active:shadow-md">
          search
        </button>
      </aside>
      <section className="md:w-2/3 p-3">
        <h2 className="text-[26px] border-b font-semibold text-[var(--text1)] px-4">
          Listing results:
        </h2>
        <div className="grid grid-cols-3 justify-center gap-6 my-5 mx-4">
          {loading ? (
            <Loader />
          ) : (
            searchData?.map((data) => (
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
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default SearchListing;
