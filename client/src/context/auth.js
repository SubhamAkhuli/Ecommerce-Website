import {useState,useEffect, createContext, useContext} from 'react';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({
        user: null,
        token: "",
    });

    // default axios headers
    axios.defaults.headers.common["Authorization"] = user?.token;


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setUser(
                {
                    user: userData.user,
                    token: userData.token,
                }
            );
        }
        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

 const useAuth = () => useContext(AuthContext);

    export {useAuth, AuthProvider};

