import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Footer from "../Footer";
import Popup from "reactjs-popup";
import AllOwnersSub from "./AllOwnersSub";

const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

const AllOwners = () => {

    const axiosPrivate = useAxiosPrivate();
    const [owners, setOwners] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const effectRan = useRef(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (effectRan.current === false || process.env.NODE_ENV !== "development") {
          const getOwners = async () => {
            try {
              const response = await axiosPrivate.get("/venueOwner");
              setOwners(response.data);
            } catch (err) {
              console.error(err);
            }
          };
    
          getOwners();
          setIsLoading(false);
        }
    
        return () => {
          effectRan.current = true;
        };
    }, []);

    useEffect(() => {
        const filteredResults = owners.filter(
        (owner) =>
            owner.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            owner.email.toLowerCase().includes(search.toLocaleLowerCase()) 
        );

        setSearchResults(filteredResults/*.reverse()*/); // to see old searched results first
    }, [owners, search]);

  return isLoading ? (
    <div className="loading">
      <p>Loading....</p>
    </div>
  ) : (
    <div className="all-doctor-list dashboard">
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((bumba) => (
                    <tr key={bumba._id}>
                      <td>{bumba.name}</td>
                      <td>{bumba.email}</td>
                      <td>{bumba.mobile}</td>
                      <td>{bumba.address}</td>
                      <td>
                        <Popup trigger={<button>Venues</button>} 
                          {...{  overlayStyle }}
                          position="bottom center" modal>
                            {(close) => (
                              <div className="scroll-component">
                                <a className="close cross" onClick={close}>
                                  &times;
                                </a>
                                <AllOwnersSub owner={bumba} />
                              </div>
                            )}
                        </Popup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      <div style={{ marginTop: "5rem" }}>
        <Footer />
      </div>
    </div>
  );
}

export default AllOwners