import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    setIsAnimating(true);
  }, []);

  return (
    <Layout>
      <div className="pnf flex flex-col items-center justify-center min-h-screen text-center px-4 py-16 bg-gradient-to-b from-white to-gray-100">
        {/* 404 Number with animation */}
        <div className={`transition-all duration-1000 transform ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">404</h1>
        </div>
        
        {/* Error message */}
        <div className={`mt-4 transition-all duration-1000 delay-300 transform ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl font-bold text-gray-800">Oops! Page Not Found</h2>
          <p className="pnf-text mt-4 text-gray-600 max-w-md mx-auto">
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
          <Link to='/' className='pnf-btn'>Go Back</Link>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;