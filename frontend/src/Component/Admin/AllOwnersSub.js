import React from 'react'
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AllOwnersSub = ({owner}) => {
    const axiosPrivate = useAxiosPrivate(); 
  const [venues, setVenues] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await axiosPrivate.get(`/venueOwnerVenues/${owner.email}`);

        setVenues(response.data);
        setIsLoading(false);
      } catch (err) {}
    };

    getVenues();
  }, []);
  return (
    <div>
      { isLoading
        ?<div className="loading">
            <p>Loading....</p>
        </div>
        : venues.length != 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Pic</th>
                <th>Name</th>
                <th>Address</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((bumba) => (
                <tr key={bumba._id}>
                  <td>
                    <img
                        className="imgs"
                        src={"http://localhost:3500/v_img/" + bumba.image}
                    />
                    </td>
                  <td>{bumba.name}</td>
                  <td>{bumba.address}</td>
                  <td>{bumba.price}/- per person</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{}}>Owner has not added any venue yet.</p>
        )
      }
    </div>
  )
}

export default AllOwnersSub