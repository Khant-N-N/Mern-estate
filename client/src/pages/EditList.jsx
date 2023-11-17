import { useEffect, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const EditList = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [noti, setNoti] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDataDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/listing/detail/${id}`);
        const data = await response.json();
        if (data.success === false) setError("Error getting data");
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };
    getDataDetail();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1)
      return setError("You must upload atleast one image");
    if (formData.regularPrice < formData.discountPrice)
      return setError("Discount price shouldn't larger than regular price");
    try {
      setError(false);
      setLoading(true);
      setNoti(false);
      const response = await fetch(`/api/listing/update/${formData._id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await response.json();

      setLoading(false);
      if (data.success === false) return setError("Error Updating data");
      setNoti("List updated successfully");
      navigate("/account");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value) || e.target.value,
    });
  };
  return (
    <div>
      <div className="m-auto max-w-[1000px]">
        <h2 className="text-center text-[23px] font-bold p-3 my-4">
          Edit a Listing
        </h2>
        <p className="text-green-500 text-[16px] text-center">{noti && noti}</p>
        <p className="text-red-500 text-[16px] text-center">{error && error}</p>
        {loading ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 mt-3"
          >
            <div className="flex flex-col md:w-[50%] items-center gap-5">
              <input
                onChange={handleChange}
                value={formData.name}
                type="text"
                name="name"
                placeholder="Name"
                required
                className="p-3 rounded border-none outline-none w-[90%] shadow"
              />
              <textarea
                onChange={handleChange}
                value={formData.description}
                name="description"
                placeholder="Description"
                required
                className="p-3 rounded border-none outline-none w-[90%] shadow"
              ></textarea>

              <input
                onChange={handleChange}
                value={formData.address}
                type="text"
                name="address"
                placeholder="Address"
                required
                className="p-3 rounded border-none outline-none w-[90%] shadow"
              />
              <div className="w-[90%] flex gap-4 flex-wrap">
                <div className="flex gap-2">
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.name })
                    }
                    checked={formData.type === "sale"}
                    type="checkbox"
                    name="sale"
                    className="w-5"
                  />{" "}
                  <label htmlFor="sale">Sale</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setFormData({ ...formData, type: e.target.name });
                    }}
                    checked={formData.type === "rent"}
                    name="rent"
                    className="w-5"
                  />{" "}
                  <label htmlFor="rent">Rent</label>
                </div>
                <div className="flex gap-2">
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: !formData[e.target.name],
                      })
                    }
                    type="checkbox"
                    name="parking"
                    className="w-5"
                  />{" "}
                  <label htmlFor="parking">Parking Spot</label>
                </div>
                <div className="flex gap-2">
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: !formData[e.target.name],
                      })
                    }
                    type="checkbox"
                    name="furnished"
                    className="w-5"
                  />{" "}
                  <label htmlFor="furnish">Furnished</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.name]: !formData[e.target.name],
                      });
                    }}
                    name="offer"
                    className="w-5"
                  />{" "}
                  <label htmlFor="offer">Offer</label>
                </div>
              </div>
              <div className="w-[90%]">
                <input
                  onChange={handleChange}
                  defaultValue={formData.bedrooms}
                  min="1"
                  max="10"
                  type="number"
                  name="bedrooms"
                  className="w-[70px] mr-3 shadow rounded p-3 border-none outline-none"
                />
                <label htmlFor="bedrooms"> Beds</label>
                <input
                  onChange={handleChange}
                  defaultValue={formData.bathrooms}
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
                  onChange={handleChange}
                  type="number"
                  name="regularPrice"
                  defaultValue={formData.regularPrice}
                  className="w-[100px] mr-3 shadow rounded p-3 border-none outline-none"
                />
                <label htmlFor="regularPrice">
                  <span className="">Regular Price</span>
                  {formData.type === "rent" && (
                    <span className="text-[var(--text2)] block text-[15px] text-center">
                      ($ / Month)
                    </span>
                  )}
                </label>
              </div>
              {formData.offer && (
                <div className="w-[90%] flex items-center">
                  <input
                    onChange={handleChange}
                    type="number"
                    name="discountPrice"
                    defaultValue={formData.discountPrice}
                    className="w-[100px] mr-3 shadow rounded p-3 border-none outline-none"
                  />
                  <label htmlFor="discountPrice">
                    <span className="">Discounted Price</span>
                    {formData.type === "rent" && (
                      <span className="text-[var(--text2)] block text-[15px] text-center">
                        ($ / Month)
                      </span>
                    )}
                  </label>
                </div>
              )}
            </div>
            <div className="md:w-[50%] flex flex-col gap-5 items-center">
              <ImageUpload formData={formData} setFormData={setFormData} />
              <button
                disabled={loading}
                className="w-[90%] p-3 rounded bg-[var(--text1)] hover:opacity-90 disabled:opacity-80 text-white"
              >
                {loading ? "EDITING" : "EDIT LISTING"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditList;
