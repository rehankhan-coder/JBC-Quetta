
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center text-white py-32 md:py-48 px-6"
      style={{ backgroundImage: "linear-gradient(rgba(0, 20, 80, 0.6), rgba(0, 20, 80, 0.6)), url('https://picsum.photos/seed/construction/1920/1080')" }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          JBC – Javeed Bricks Company
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light drop-shadow-md">
          High Quality Bricks at Affordable Prices
        </p>
      </div>
    </section>
  );
};

export default Hero;
