import {useState,useEffect, createContext, useContext} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({
        user: null,
        token: "",
    });

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
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

 const useAuth = () => useContext(AuthContext);

    export {useAuth, AuthProvider};

