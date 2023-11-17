import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

const ImageUpload = ({ formData, setFormData }) => {
  const [uploadError, setUploadError] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imgFile, setImgFile] = useState([]);
  const handleRemoveImg = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleUploadImg = () => {
    if (imgFile.length > 0 && imgFile.length + formData.imageUrls.length < 7) {
      setUploadLoading(true);
      setUploadError(false);
      const promise = [];
      for (let i = 0; i < imgFile.length; i++) {
        promise.push(storeImg(imgFile[i]));
      }
      Promise.all(promise)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploadError(false);
          setUploadLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setUploadError(
            "failed to upload images/ Image size should be less than 3MB per one."
          );
          setUploadLoading(false);
        });
    } else {
      setUploadError("You can only upload max 6 images per listing");
      setUploadLoading(false);
    }
  };
  const storeImg = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => reject(error),
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl)
          )
      );
    });
  };
  return (
    <div>
      <label htmlFor="images" className="w-[90%]">
        Images:{" "}
        <span className="text-[var(--text2)]">
          The first image will be the cover (max 6)
        </span>
      </label>
      {uploadError && <p className="text-[16px] text-red-500">{uploadError}</p>}
      <div className="w-[90%] flex">
        <input
          onChange={(e) => setImgFile(e.target.files)}
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="border border-slate-500 p-2 mr-2 rounded w-auto"
        />
        <button
          disabled={uploadLoading}
          type="button"
          onClick={handleUploadImg}
          className="p-3 border text-green-600 hover:bg-green-600 hover:text-white border-green-600 rounded"
        >
          {uploadLoading ? "UPLOADING..." : "UPLOAD"}
        </button>
      </div>
      <div className="w-[90%]">
        {formData.imageUrls &&
          formData.imageUrls.map((url, key) => (
            <div
              key={key}
              className="flex justify-between mb-2 border shadow rounded p-3"
            >
              <img
                src={url}
                alt="house"
                className="w-[90px] object-cover rounded"
              />
              <button
                onClick={() => handleRemoveImg(key)}
                type="button"
                className="text-red-500 hover:opacity-80"
              >
                DELETE
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageUpload;
