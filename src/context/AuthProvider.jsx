import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);// custom hook for easy access to auth context. 

export function AuthProvider({ children }) { 
  const [user, setUser] = useState(null);

  // On mount, check if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); // you could also store more user info here
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token); //save token to localStorage
    setUser({ token }); //update user state
  }; 

// First login → backend gives token → you call login(token).
// Later refresh → useEffect grabs token from localStorage and restores user.

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isLoggedIn = !!user; // Check if user is logged in for components

  return ( // will provide user object and login/logout functions to the rest of the app
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
}
