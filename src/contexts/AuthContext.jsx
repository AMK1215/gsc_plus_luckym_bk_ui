import { createContext, useEffect, useState, useMemo, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAfetch } from '../hooks/useAfetch';

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  updateProfile: () => {},
  login: async () => {},
  logout: async () => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const { request } = useAfetch();
  const navigate = useNavigate();
  const location = useLocation();

  // Check login on mount or when token changes
  useEffect(() => {
    if (token) {
      request('/dashboard/user', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then((response) => {
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch(() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (location.pathname !== '/login') {
            navigate('/login');
          }
        });
    } else {
      setUser(null);
      localStorage.removeItem('user');
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }
    // eslint-disable-next-line
  }, [token]);

  const updateProfile = (newProfile) => {
    setUser(newProfile);
    localStorage.setItem('user', JSON.stringify(newProfile));
  };

  const login = async (userName, password) => {
    try {
      const response = await request('/dashboardauth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: userName, password }),
      });
      if (response?.data?.user && response?.data?.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response;
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await request('/dashboardauth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      // Ignore error
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!token && !!user,
    updateProfile,
    login,
    logout,
  }), [token, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
