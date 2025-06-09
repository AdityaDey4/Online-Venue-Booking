import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import VenueFeed from "./VenueFeed";

const VenueList = () => {
  // need to add css

  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const getVenues = async () => {
        try {
          const response = await axios.get("/venue");
          setVenues(response.data);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      };

      getVenues();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  useEffect(() => {
    const filteredResults = venues.filter(
      (venue) =>
        venue.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        venue.address.toLowerCase().includes(search.toLocaleLowerCase())
    );

    setSearchResults(filteredResults/*.reverse()*/); // to see old searched results first
  }, [venues, search]);

  return (
    <div className="venue-list">
      <h1>Venues List</h1>
      {isLoading ? (
        <div className="loading">
          <p>Loading....</p>
        </div>
      ) : (
        <div className="venue-ul-list">
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search venue</label>
            <input
              id="search"
              type="text"
              placeHolder="search venue"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {searchResults?.length ? (
            <ul key={searchResults._id}>
              {searchResults.map((venue) => (
                <li>{<VenueFeed venue={venue} />}</li>
              ))}
            </ul>
          ) : (
            <p>There is no venue to display</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VenueList;
