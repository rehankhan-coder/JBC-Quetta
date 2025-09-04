
import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  const navLinks = [
    { name: 'Our Bricks', href: '#products' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'Order', href: '#order' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
          <span className="text-xl font-bold text-blue-800 hidden sm:block">JBC</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              {link.name}
            </button>
          ))}
        </nav>
        <button onClick={() => scrollTo('#order')} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-full hover:bg-blue-700 transition-transform duration-300 ease-in-out hover:scale-105">
          Order Now
        </button>
      </div>
    </header>
  );
};

export default Header;
