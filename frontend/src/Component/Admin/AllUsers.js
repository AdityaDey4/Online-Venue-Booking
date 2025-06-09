import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Footer from "../Footer";
import Popup from "reactjs-popup";
import AllUserSub from "./AllUserSub";

const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

const AllUsers = () => {
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const effectRan = useRef(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (effectRan.current === false || process.env.NODE_ENV !== "development") {
          const getUsers = async () => {
            try {
              const response = await axiosPrivate.get("/user");
              setUsers(response.data);
            } catch (err) {
              console.error(err);
            }
          };
    
          getUsers();
          setIsLoading(false);
        }
    
        return () => {
          effectRan.current = true;
        };
    }, []);

    useEffect(() => {
        const filteredResults = users.filter(
        (owner) =>
            owner.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            owner.email.toLowerCase().includes(search.toLocaleLowerCase()) 
        );

        setSearchResults(filteredResults/*.reverse()*/); // to see old searched results first
    }, [users, search]);
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
                        <Popup trigger={<button>Booking Details</button>} 
                          {...{  overlayStyle }}
                          position="bottom center" modal>
                            {(close) => (
                              <div className="scroll-component">
                                <a className="close cross" onClick={close}>
                                  &times;
                                </a>
                                <AllUserSub user={bumba} />
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

export default AllUsers