import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react";

const UserBasicInfo = () => {

  const {auth} = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  
  useEffect(()=> {
    
    const getUser = async ()=> {
      
      try {
        const response = await axiosPrivate.get(
          `/user/${auth.email}`
        );
        setUser(response.data);
        setIsLoading(false);
      }catch(err) {
        console.error(err);
      }
    }

    getUser();
  }, [])

  return (
    isLoading
      ? <div className="loading">
          <p>Loading....</p>
      </div>
      : (
        !user
          ? <p>Unable to fetch, Your aree requested to log in again !!</p>
          : <div className='patient-info-feed'>
              <text>{`Name : ${user.name}`}</text> <br></br>
              <text>{`Email : ${user.email}`}</text> <br></br>
              <text>{`Mobile : ${user.mobile}`}</text> <br></br>
              <text>{`Address : ${user.address}`}</text> <br></br>
            </div>
      )
  )
}

export default UserBasicInfo