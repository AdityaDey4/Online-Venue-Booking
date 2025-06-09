import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Popup from "reactjs-popup";
import useAuth from "../../hooks/useAuth";

import AddVenue from "../Admin/AddVenue";
import VenueBookingDetails from "../Admin/VenueBookingDetails";

const overlayStyle = { background: "rgba(0,0,0,0.5)" };
const arrowStyle = { color: "#000" }; // style for an svg element

const OwnerVenues = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const effectRan = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (effectRan.current === false || process.env.NODE_ENV !== "development") {
      const getVenues = async () => {
        try {
          const response = await axiosPrivate.get(`/venueOwnerVenues/${auth.email}`); //use auth email
          setVenues(response.data);
        } catch (err) {
          console.error(err);
        }
      };

      getVenues();
      setIsLoading(false);
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

    setSearchResults(filteredResults /*.reverse()*/); // to see old searched results first
  }, [venues, search]);

  return isLoading ? (
    <div className="loading">
      <p>Loading....</p>
    </div>
  ) : (
    <div className="all-doctor-list dashboard">
      <div className="doctor-header">
        <Popup
          trigger={<button>Add New Venue</button>}
          {...{ overlayStyle, arrowStyle }}
          position="bottom center"
          modal
        >
          {(close) => (
            <div className="scroll-component">
              <a className="close cross" onClick={close}>
                &times;
              </a>
              <AddVenue />
            </div>
          )}
        </Popup>
      </div>
      <div>
        <div className="all-doctor-ul-list">
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
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Pic</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults && searchResults.length != 0 ? (
                    searchResults.map((bumba) => (
                      <tr key={bumba._id}>
                        <td>
                          <img
                            className="imgs"
                            src={"http://localhost:3500/v_img/" + bumba.image}
                          />
                        </td>
                        <td>{bumba.name}</td>
                        <td>{bumba.address}</td>
                        <td>
                          <Popup
                            trigger={<button>Booking Details</button>}
                            {...{ overlayStyle }}
                            position="bottom center"
                            modal
                          >
                            {(close) => (
                              <div className="scroll-component">
                                <a className="close cross" onClick={close}>
                                  &times;
                                </a>
                                <VenueBookingDetails venue={bumba} />
                              </div>
                            )}
                          </Popup>
                        </td>
                        <td>
                          <Popup
                            trigger={<button>Other Details</button>}
                            {...{ overlayStyle }}
                            position="bottom center"
                            modal
                          >
                            {(close) => (
                              <div className="scroll-component">
                                <a className="close cross" onClick={close}>
                                  &times;
                                </a>
                                <AddVenue venue={bumba} />
                              </div>
                            )}
                          </Popup>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>You Haven't added any venues yet.</p>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div style={{ marginTop: "5rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default OwnerVenues;
