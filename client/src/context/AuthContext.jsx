import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login, logout } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, role: decoded.role, department: decoded.department });
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    const response = await login(email, password);
    localStorage.setItem('token', response.token);
    setUser({ id: response.user.id, role: response.user.role, department: response.user.department });
  };

  const signOut = async () => {
    await logout();
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};