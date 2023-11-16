import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  deleteUserSuccess,
} from "../features/user";
import ShowListing from "../components/ShowListing";

const Account = () => {
  const fileRef = useRef();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePercent, setfilePercent] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [showList, setShowList] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePercent(Math.round(progress));
      },
      (error) => {
        setUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    const response = await fetch(`api/user/update/${currentUser?._id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success === false) {
      dispatch(signInFailure(data.message));
    } else {
      dispatch(signInSuccess(data));
      navigate("/");
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "delete",
      });
      const data = await response.json();
      if (data.success === false) return dispatch(signInFailure(data.message));
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  const signoutUser = async () => {
    try {
      const response = await fetch("/api/auth/signout");
      const data = await response.json();
      if (data.success === false) return dispatch(signInFailure(data.message));
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto w-[90%] max-w-[500px] h-[80vh] py-7">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col gap-4 text-[16px]"
      >
        <h4 className="text-center font-bold text-[22px]">Profile</h4>
        <p className="text-red-700">{error && error}</p>
        <div>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser?.avatar}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover cursor-pointer self-center"
          />
        </div>
        <p className="text-red-700">{uploadError && "Failed to upload"}</p>
        <p>
          {filePercent < 100 && filePercent > 0
            ? `Uploading ${filePercent}%`
            : filePercent === 100
            ? "Upload Completed"
            : ""}
        </p>
        <input
          onChange={handleChange}
          className="w-[90%] p-3 rounded"
          type="text"
          name="username"
          defaultValue={currentUser.username}
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          className="w-[90%] p-3 rounded"
          type="email"
          name="email"
          defaultValue={currentUser.email}
          placeholder="email"
        />
        <input
          onChange={handleChange}
          className="w-[90%] p-3 rounded"
          type="password"
          name="password"
          placeholder="password"
        />
        <button
          disabled={loading}
          type="submit"
          className="w-[90%] p-3 rounded bg-[#324054] hover:bg-[#324054]/90 uppercase text-white"
        >
          {loading ? "loading..." : "UPDATE"}
        </button>
        <Link
          to="/createlist"
          className="w-[90%] p-3 rounded text-center bg-[#116831] hover:bg-[#116831]/90 uppercase text-white"
        >
          Create Listing
        </Link>
        <p className="flex justify-between items-center w-[90%]">
          <span
            onClick={deleteUser}
            className="text-red-500 text-[15px] cursor-pointer"
          >
            Delete Account
          </span>{" "}
          <span
            onClick={signoutUser}
            className="text-red-500 text-[15px] cursor-pointer"
          >
            Sign out
          </span>
        </p>
      </form>
      <p
        onClick={() => setShowList(!showList)}
        className="text-green-500 text-center my-3 cursor-pointer hover:opacity-70 text-[16px]"
      >
        Show Listings
      </p>

      {showList && <ShowListing />}
    </div>
  );
};

export default Account;
