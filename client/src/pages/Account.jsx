import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Account = () => {
  const fileRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePercent, setfilePercent] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  console.log(formData);
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

  return (
    <div className="m-auto w-[90%] max-w-[500px] h-[80vh] py-7">
      <form className="flex justify-center items-center flex-col gap-4 text-[16px]">
        <h4 className="text-center font-bold text-[22px]">Profile</h4>
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
          {filePercent > 0 && filePercent < 100
            ? `Uploading ${filePercent}%`
            : filePercent === 100
            ? "Upload Completed"
            : ""}
        </p>
        <input
          className="w-[90%] p-3 rounded"
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          className="w-[90%] p-3 rounded"
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className="w-[90%] p-3 rounded"
          type="password"
          name="password"
          placeholder="password"
        />
        <button className="w-[90%] p-3 rounded bg-[#324054] hover:bg-[#324054]/90 uppercase text-white">
          UPDATE
        </button>
        <button className="w-[90%] p-3 rounded bg-[#116831] hover:bg-[#116831]/90 uppercase text-white">
          Create Listing
        </button>
        <p className="flex justify-between items-center w-[90%]">
          <span className="text-red-500 text-[15px]">Delete Account</span>{" "}
          <span className="text-red-500 text-[15px]">Sign out</span>
        </p>
      </form>
    </div>
  );
};

export default Account;
