import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (emailOrRollNumber, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      emailOrRollNumber,
      password,
    });
    setUser(response.data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  };

  const register = async (fullName, rollNumber, email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      fullName,
      rollNumber,
      email,
      password,
    });
    setUser(response.data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};