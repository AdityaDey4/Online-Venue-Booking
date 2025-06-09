import axios from "../api/axios";
import useAuth from './useAuth'

const useRefreshToken = () => {

    const {auth, setAuth} = useAuth();
    const refresh = async ()=> {
        const response = await axios.get('/refresh', {
            withCredentials : true // allows us to send cookies with our request
        });

        setAuth(prev=> {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
 
            return {
                ...prev,
                email : response.data.email,
                role : response.data.role,
                accessToken : response.data.accessToken
            };
        });

        console.log(auth)
        return response.data.accessToken;
    }
  return refresh;
}

export default useRefreshToken