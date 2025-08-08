import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (

        <div className="mt-16 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent mb-6">
                To browse this private zone, please log in first.
            </h2>
            <button
                onClick={handleLoginRedirect}
                className="relative cursor-pointer px-6 py-3 overflow-hidden font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow group"
            >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-700 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-700 group-hover:w-full ease"></span>
                <span className="absolute inset-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-700 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                    Log In
                </span>
            </button>
        </div>

    );
};

export default LogInPage;
