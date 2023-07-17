import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from './AuthContext';

export default function PrivateRoute({ children }) {
  const { isLoggedIn, setLoggedInStatus } = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // check if token is available and not expired
    const token = localStorage.getItem('jwtToken');
    const expirationTime = localStorage.getItem('jwtTokenExpiration');

    if (!token || !expirationTime || new Date().getTime() > expirationTime) {
      setLoggedInStatus(false);
      setIsChecking(false);
    } else {
      setLoggedInStatus(true);
      setIsChecking(false);
    }
  }, [setLoggedInStatus]);

  if (isChecking) {
    return null; // or render a loading spinner
  }

  if (!isLoggedIn) {
    navigate("/", { replace: true, state: { from: location } });
    return null;
  }

  return children;
}
