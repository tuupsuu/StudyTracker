import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from './AuthContext';

export default function PrivateRoute({ children }) {
    const { isLoggedIn } = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();

    if (!isLoggedIn) {
        navigate("/", { replace: true, state: { from: location } });
        return null;
    }

    return children;
}
