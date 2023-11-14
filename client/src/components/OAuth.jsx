import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../features/user";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await response.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("error in oauth", error);
    }
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-[90%] p-3 rounded-md bg-[#b81b1b] hover:bg-[#b81b1b]/90 uppercase text-white"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
