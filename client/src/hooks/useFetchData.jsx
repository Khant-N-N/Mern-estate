import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url);
        const data = await response.json();
        setLoading(false);
        if (data.success === false) return setError(data.message);
        setListing(data);
      } catch (err) {
        setLoading(false);
        setError(err.message);
        console.log(err);
      }
    };
    fetchData();
  }, [url]);

  return { listing, loading, error };
};

export default useFetchData;
