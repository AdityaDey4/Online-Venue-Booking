import React from "react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AllFeedbacks = () => {
  const [feedback, setFeedback] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response = await axios.get("/feedback");
        setFeedback(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getFeedback();
  }, []);
  useEffect(() => {
    const filteredResults = feedback.filter(
      (venue) =>
        venue.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        venue.feedback.toLowerCase().includes(search.toLocaleLowerCase()) ||
        venue.email.toLowerCase().includes(search.toLocaleLowerCase())
    );

    setSearchResults(filteredResults.reverse()); // to see old searched results first
  }, [feedback, search]);

  return (
    <div className="dashboard">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Post</label>
        <input
          id="search"
          type="text"
          placeHolder="search feedback"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {!isLoading && searchResults ? (
        <div>
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>feedback</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((bumba) => (
                  <tr key={bumba._id}>
                    <td>{bumba.name}</td>
                    <td>{bumba.email}</td>
                    <td>{bumba.feedback}</td>
                    <td>
                      {bumba?.date && bumba?.time
                        ? bumba.date + " " + bumba.time
                        : "NA"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="loading">
          <p>Loading....</p>
        </div>
      )}
    </div>
  );
};

export default AllFeedbacks;
