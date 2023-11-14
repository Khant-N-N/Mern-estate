import { useSelector } from "react-redux";

const Account = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="m-auto w-[90%] max-w-[500px] h-[80vh] py-7">
      <form className="flex justify-center items-center flex-col gap-4 text-[16px]">
        <h4 className="text-center font-bold text-[22px]">Profile</h4>
        <div>
          <img
            src={currentUser?.avatar}
            alt="profile photo"
            className="w-20 h-20 rounded-full"
          />
        </div>
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
