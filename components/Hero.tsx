import React, { useState, useEffect } from 'react';
import { generateHeroImage } from '../services/geminiService';

const Hero: React.FC = () => {
  const [heroImageUrl, setHeroImageUrl] = useState('https://picsum.photos/seed/construction/1920/1080');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroImage = async () => {
      if (!process.env.API_KEY) {
        console.warn("API_KEY not found, using placeholder hero image.");
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const result = await generateHeroImage();
        if (result && !result.error) {
            setHeroImageUrl(result.imageUrl);
        }
      } catch (error) {
        console.error("Failed to generate hero image, using placeholder:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImage();
  }, []);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(0, 20, 80, 0.8) 0%, rgba(0, 20, 80, 0.2) 100%), url('${heroImageUrl}')`,
  };
  
  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative bg-cover bg-center text-white py-32 md:py-48 px-6 transition-all duration-1000"
      style={backgroundStyle}
    >
      {loading && (
        <div className="absolute inset-0 bg-black/30 animate-pulse"></div>
      )}
      <div className="container mx-auto text-left relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg max-w-2xl">
          The Foundation of Quality Construction
        </h1>
        <p className="mt-4 text-lg md:text-xl font-light drop-shadow-md max-w-2xl">
          Supplying top-grade bricks across Quetta and beyond.
        </p>
         <button 
            onClick={() => scrollTo('#calculator')}
            className="mt-8 bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Get Price Estimate
        </button>
      </div>
    </section>
  );
};

export default Hero;