import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { removeUser } from "../../utils/storage";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeUser();
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
            <Link className="navbar-brand fw-bold" to="/">PharmaCare</Link>

            <div className="ms-auto d-flex align-items-center gap-2">
                {user ? (
                    <>
                        <span className="text-white small">{user.email}</span>
                        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-light btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-outline-light btn-sm">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;