import { Link, NavLink, useNavigate } from "react-router-dom";
import siteLogo from "../../public/site logo/logo-color.png";
import useAuth from "../hooks/useAuth";
import { useState, useEffect, useRef } from "react";

const Nav = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeMobileNav = () => {
        setIsMobileNavOpen(false);
    };

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const navLinks = (
        <>
            <li>
                <NavLink to="/" onClick={closeMobileNav}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/allPackages" onClick={closeMobileNav}>Packages</NavLink>
            </li>
            <li>
                <NavLink to="/blogs" onClick={closeMobileNav}>Blogs</NavLink>
            </li>
            <li>
                <NavLink to="/aboutUs" onClick={closeMobileNav}>About Us</NavLink>
            </li>
            <li>
                <NavLink to="/contact" onClick={closeMobileNav}>Contact Us</NavLink>
            </li>
            {user ? (
                <li className="relative" ref={dropdownRef}>
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                        onClick={toggleDropdown}
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src={user.photoURL}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-slate-700 text-white ${isDropdownOpen ? "block" : "hidden"
                            } lg:absolute lg:right-0 lg:mt-0 lg:bg-black/50`}
                        style={{
                            position: isDropdownOpen && window.innerWidth < 1024 ? "fixed" : "absolute",
                            top: isDropdownOpen && window.innerWidth < 1024 ? "50%" : "auto",
                            left: isDropdownOpen && window.innerWidth < 1024 ? "50%" : "auto",
                            transform: isDropdownOpen && window.innerWidth < 1024 ? "translate(-50%, -50%)" : "none"
                        }}
                    >
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </li>
            ) : (
                <li>
                    <NavLink to="/login" onClick={closeMobileNav}>Login</NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar bg-slate-400 md:flex justify-between mb-2 md:mb-10" id="navbar">
            <div className="navbar-start w-full lg:w-auto flex-row-reverse justify-between">
                <div className="dropdown dropdown-left">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleMobileNav}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52 ${isMobileNavOpen ? "block" : "hidden"}`}
                    >
                        {navLinks}
                    </ul>
                </div>
                <div className="flex space-x-1">
                    <img src={siteLogo} alt="Logo" className="w-10 md:w-16 rounded-xl" />
                    <a href="/" className="md:text-xl font-bold text-white">
                        RT <br />
                        Products
                    </a>
                </div>
            </div>
            <div className="navbar-end hidden lg:flex md:w-auto">
                <ul className="menu menu-horizontal px-1 text-xl text-white font-semibold">
                    {navLinks}
                </ul>
            </div>
        </div>
    );
};

export default Nav;
