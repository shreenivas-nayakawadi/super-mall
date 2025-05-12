import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthRedirect = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      // Redirect to the appropriate dashboard based on user role
      navigate(`/${currentUser.role}/dashboard`, { replace: true });
    }
  }, [currentUser, navigate]);

  // If there's no current user, render the children (login form)
  return !currentUser ? children : null;
};

export default AuthRedirect; 