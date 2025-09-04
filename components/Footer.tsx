
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-800 text-white">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} JBC – Javeed Bricks Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
