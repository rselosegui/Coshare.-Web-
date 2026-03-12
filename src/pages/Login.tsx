import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    await login();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-[#0b1b34] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
        <h2 className="mt-6 text-center text-4xl font-display font-bold text-[#0b1b34]">
          Sign in to <span dir="ltr">coshare.</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your premium fractional assets
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-4 shadow-sm sm:rounded-3xl sm:px-10 border border-gray-100"
        >
          <div className="space-y-6">
            <div>
              <button
                onClick={handleLogin}
                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b1b34] transition-colors"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
