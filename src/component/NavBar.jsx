import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { valueConText } from '../rootlayout/RootLayout';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, handleLogOut } = useContext(valueConText);

    const [isMainDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const toggleProfileDropdown = () => setProfileDropdownOpen(prev => !prev);

    const handleLogOutAndRedirect = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogOut();
                navigate('/');
                Swal.fire('Logged out!', 'You have been logged out.', 'success');
            }
        });
    };

    const navLinkClasses = ({ isActive }) =>
        `text-lg font-medium ${isActive
            ? 'text-purple-500 underline'
            : 'text-foreground dark:text-foreground-dark'
        }`;

    const navItems = (
        <>
            <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
            <li><NavLink to="/upcominevents" className={navLinkClasses}>Upcoming Events</NavLink></li>
        </>
    );

    const toggleTheme = () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="navbar max-w-screen-2xl mx-auto pr-8 pl-4 md:px-12 lg:px-16 xl:px-24 
            sticky top-0 z-50 bg-base-700 bg-background dark:bg-background-dark backdrop-blur-md">
            <div className="navbar-start flex items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <NavLink to="/" className="flex items-center gap-1 ml-2 lg:ml-0">
                    <div className="md:hidden w-10 h-10 flex justify-center">
                        <img
                            src="https://i.ibb.co/tMcDGTQd/Gemini-Generated-Image-rzpnrgrzpnrgrzpn-removebg-preview.png"
                            alt="Serve Circle"
                            className="w-48 h-auto"
                        />
                    </div>
                    <h1 className="hidden md:block text-center text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug drop-shadow-xl">
                        <span className="bg-gradient-to-r from-green-600 via-lime-400 to-emerald-500 text-transparent bg-clip-text">
                            Serve
                        </span>
                        <span className="text-black dark:text-white">
                            Circle
                        </span>
                    </h1>
                </NavLink>
            </div>

            <div className="hidden lg:flex navbar-center">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            <div className="navbar-end flex items-center gap-4 relative">
                {isMainDropdownOpen && (
                    <div className="absolute top-14 left-4 bg-background rounded shadow-lg w-52 p-3 z-30 dark:bg-background-dark">
                        <ul className="flex flex-col gap-2">{navItems}</ul>
                    </div>
                )}

                {/* Theme Toggle */}
                <label className="swap swap-rotate">
                    <input type="checkbox" onChange={toggleTheme} />
                    <svg className="swap-on fill-current w-7 h-7 text-foreground dark:text-foreground-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M5.64 17.66l-1.41 1.41 1.06 1.06 1.41-1.41-1.06-1.06zm12.02-12.02l1.41-1.41-1.06-1.06-1.41 1.41 1.06 1.06zM12 4V1h-1v3h1zm0 19v-3h-1v3h1zm8.66-11h3v-1h-3v1zm-19 0v-1h-3v1h3zm15.36 7.66l1.41 1.41 1.06-1.06-1.41-1.41-1.06 1.06zM4.34 6.34L2.93 4.93 1.87 6l1.41 1.41 1.06-1.06zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                    </svg>
                    <svg className="swap-off fill-current w-7 h-7 text-foreground dark:text-foreground-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.64 13.36A9 9 0 1110.64 2.36a7 7 0 1011 11z" />
                    </svg>
                </label>

                {user ? (
                    <div className="flex">
                        <button onClick={handleLogOutAndRedirect} className="hidden mr-2 md:inline-flex cursor-pointer relative items-center justify-start px-4 py-1 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Logout</span>
                        </button>

                        <div className="relative">
                            <button onClick={toggleProfileDropdown} className="focus:outline-none" aria-label="Toggle profile menu">
                                <img
                                    className={`w-10 h-10 cursor-pointer object-cover rounded-full border-2 transition-all duration-300 ${location.pathname === '/profile'
                                        ? 'border-purple-500 ring-2 ring-purple-300'
                                        : 'border-border dark:border-border-dark'
                                        }`}
                                    src={user.photoURL}
                                    alt="Profile"
                                />
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl z-40 p-4 bg-gradient-to-br from-black via-green-700 to-green-300 bg-opacity-40 backdrop-blur-md border border-white/10">
                                    <ul className="text-white font-semibold space-y-2 text-center">
                                        <li className="hover:bg-white/10 hover:rounded-lg transition duration-200">
                                            <Link to="/createvents" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2">Create Event</Link>
                                        </li>
                                        <li className="hover:bg-white/10 hover:rounded-lg transition duration-200">
                                            <Link to="/manageevents" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2">Manage Events</Link>
                                        </li>
                                        <li className="hover:bg-white/10 hover:rounded-lg transition duration-200">
                                            <Link to="/joinedevents" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2">Joined Events</Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setProfileDropdownOpen(false);
                                                    handleLogOutAndRedirect();
                                                }}
                                                className="lg:hidden mr-3 cursor-pointer relative inline-flex items-center justify-start px-4 py-1 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                                            >
                                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                                </span>
                                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="gap-3 flex">
                        <Link to="/login" className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                            <span className="absolute bottom-0 right-0 w-64 h-64 mb-32 mr-4 transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 transition duration-500 group-hover:rotate-90"></span>
                            <span className="relative">Login</span>
                        </Link>
                        <Link to="/registration" className="hidden sm:inline-flex relative items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                            <span className="absolute bottom-0 right-0 w-64 h-64 mb-32 mr-4 transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 transition duration-500 group-hover:rotate-90"></span>
                            <span className="relative">Registration</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
