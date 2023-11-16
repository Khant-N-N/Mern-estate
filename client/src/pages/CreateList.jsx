import { useState } from "react";

const CreateList = () => {
  const [discount, setDiscount] = useState(false);
  const [isRent, setIsRent] = useState(false);
  return (
    <div className="m-auto max-w-[1000px]">
      <h2 className="text-center text-[23px] font-bold p-3">
        Create a Listing
      </h2>
      <form className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col md:w-[50%] items-center gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="p-3 rounded border-none outline-none w-[90%] shadow"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            className="p-3 rounded border-none outline-none w-[90%] shadow"
          ></textarea>

          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            className="p-3 rounded border-none outline-none w-[90%] shadow"
          />
          <div className="w-[90%] flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sell" className="w-5" />{" "}
              <label htmlFor="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => setIsRent(!isRent)}
                name="rent"
                className="w-5"
              />{" "}
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="parking" className="w-5" />{" "}
              <label htmlFor="parking">Parking Spot</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="furnish" className="w-5" />{" "}
              <label htmlFor="furnish">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => setDiscount(!discount)}
                name="offer"
                className="w-5"
              />{" "}
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="w-[90%]">
            <input
              min="1"
              max="10"
              type="number"
              name="bedrooms"
              className="w-[70px] mr-3 shadow rounded p-3 border-none outline-none"
            />
            <label htmlFor="bedrooms"> Beds</label>
            <input
              min="1"
              max="10"
              type="number"
              name="bathrooms"
              className="w-[70px] mx-3 shadow rounded p-3 border-none outline-none"
            />
            <label htmlFor="bathrooms"> Baths</label>
          </div>
          <div className="w-[90%] flex items-center">
            <input
              type="number"
              name="regularPrice"
              className="w-[100px] mr-3 shadow rounded p-3 border-none outline-none"
            />
            <label htmlFor="regularPrice">
              <span className="">Regular Price</span>
              {isRent && (
                <span className="text-[var(--text2)] block text-[15px] text-center">
                  ($ / Month)
                </span>
              )}
            </label>
          </div>
          {discount && (
            <div className="w-[90%] flex items-center">
              <input
                type="number"
                name="discountPrice"
                className="w-[100px] mr-3 shadow rounded p-3 border-none outline-none"
              />
              <label htmlFor="discountPrice">
                <span className="">Discounted Price</span>
                {isRent && (
                  <span className="text-[var(--text2)] block text-[15px] text-center">
                    ($ / Month)
                  </span>
                )}
              </label>
            </div>
          )}
        </div>
        <div className="md:w-[50%] flex flex-col gap-5 items-center">
          <label htmlFor="images" className="w-[90%]">
            Images:{" "}
            <span className="text-[var(--text2)]">
              The first image will be the cover (max 6)
            </span>
          </label>
          <div className="w-[90%] flex">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              className="border border-slate-500 p-2 mr-2 rounded w-auto"
            />
            <button
              type="button"
              className="p-3 border text-green-600 hover:bg-green-600 hover:text-white border-green-600 rounded"
            >
              UPLOAD
            </button>
          </div>
          <button className="w-[90%] p-3 rounded bg-[var(--text1)] hover:opacity-90 disabled:opacity-80 text-white">
            CREATE LISTING
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateList;
