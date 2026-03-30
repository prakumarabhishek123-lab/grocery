import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check login status using token (example: localStorage.getItem("token"))
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    // TODO: connect real API
    // POST /api/login
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem('store_users') || '[]');
        const existingUser = storedUsers.find(u => u.email === email && u.password === password);
        
        if (existingUser) {
          setIsAuthenticated(true);
          setUser({ email: existingUser.email, name: existingUser.name });
          // In a real app, you'd store a JWT token here
          localStorage.setItem('current_user', JSON.stringify({ email: existingUser.email, name: existingUser.name }));
          
          // TODO: After login, sync cart with backend API
          
          resolve();
        } else {
          reject('Invalid email or password.');
        }
      }, 500); // Simulate network latency
    });
  };

  const signup = async (name, email, password) => {
    // TODO: connect real API
    // POST /api/signup
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem('store_users') || '[]');
        const userExists = storedUsers.some(u => u.email === email);
        
        if (userExists) {
          reject('An account with this email already exists.');
        } else {
          const newUser = { name, email, password };
          storedUsers.push(newUser);
          localStorage.setItem('store_users', JSON.stringify(storedUsers));
          resolve();
        }
      }, 500);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('current_user');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      signup,
      logout,
      authModalOpen,
      setAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};
