import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store decoded user info
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Decode JWT whenever token changes
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
       // debugger;
        setUser({
          username: decoded?.unique_name || decoded?.name,
          email: decoded?.email,
          role: decoded?.role,
          userId: decoded?.userId,
        });
      } catch (err) {
        console.error("Invalid JWT:", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
