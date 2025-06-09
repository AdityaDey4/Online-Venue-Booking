import React from "react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const UserFeedbacks = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [feedback, setFeedback] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response = await axiosPrivate.get(`/feedback/${auth.email}`);
        setFeedback(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getFeedback();
  }, []);

  useEffect(() => {
    const filteredResults = feedback.filter((venue) =>
      venue.feedback.toLowerCase().includes(search.toLocaleLowerCase())
    );

    setSearchResults(filteredResults.reverse()); // to see old searched results first
  }, [feedback, search]);

  return (
    <div className="dashboard">
      {!isLoading ? (
        <div>
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
          {searchResults && searchResults.length != 0 ? (
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Feedbacks</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((bumba) => (
                    <tr key={bumba._id}>
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
          ) : (
            <p>No Feedbacks Found.</p>
          )}
        </div>
      ) : (
        <div className="loading">
          <p>Loading....</p>
        </div>
      )}
    </div>
  );
};

export default UserFeedbacks;
