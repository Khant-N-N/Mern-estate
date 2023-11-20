import { Link } from "react-router-dom";
import ListCard from "./ListCard";

const RecentListings = ({ title, link, lists }) => {
  return (
    <div className="flex flex-col gap-4 mb-14">
      <h2 className="text-[24px] text-[var(--text1)] font-semibold">
        Recent {title}
      </h2>
      <Link
        to={link}
        onClick={() => window.scrollTo(0, 0)}
        className="text-[var(--text2)] text-[15px] hover:underline"
      >
        Show more {title}
      </Link>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {lists?.map((list) => (
          <ListCard key={list._id} data={list} />
        ))}
      </div>
    </div>
  );
};

export default RecentListings;
