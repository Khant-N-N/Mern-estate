import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SendMessage = ({ detail }) => {
  const [landlord, setLandlord] = useState(null);
  const messageRef = useRef();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${detail?.userRef}`);
        const data = await response.json();
        if (data.success === false) return console.log(data.message);
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [detail.userRef]);
  return (
    <div className="my-6 flex flex-col">
      <h2>
        Contact <span className="font-bold">{landlord?.username}</span> for{" "}
        <span className="font-bold">{detail?.name}</span>
      </h2>
      <textarea
        ref={messageRef}
        spellCheck={false}
        name="message"
        placeholder="Message"
        className="w-full border-none outline-none shadow p-3 my-6 h-24 rounded"
      ></textarea>
      <Link
        to={`mailto:${landlord?.email}?subject=Regarding ${detail.name}&body=${messageRef.current.value}`}
        className="p-3 bg-[var(--text2)] text-center rounded my-6 text-white hover:opacity-70 uppercase"
      >
        SEND MESSAGE
      </Link>
    </div>
  );
};

export default SendMessage;
