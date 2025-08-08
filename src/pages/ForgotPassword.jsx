import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(`A password reset link has been sent to ${email}`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);

    window.open('https://mail.google.com/', '_blank');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 transition-all duration-300 relative">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-sm">Forgot Password?</h1>
          <p className="mt-2 text-sm text-white/80">Enter your email address to reset your password.</p>
        </div>

        {showToast && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-white">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-4 py-3 text-sm rounded-lg bg-white/90 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full py-3 font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
