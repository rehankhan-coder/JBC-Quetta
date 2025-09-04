
import React, { useState, useEffect } from 'react';
import { generateBrickImages } from '../services/geminiService';

const ImageSkeleton: React.FC = () => (
    <div className="bg-gray-200 rounded-lg animate-pulse w-full h-64"></div>
);

const Products: React.FC = () => {
  const [images, setImages] = useState<{ firstClassImg: string | null; secondClassImg: string | null }>({
    firstClassImg: null,
    secondClassImg: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const generatedImages = await generateBrickImages();
        setImages(generatedImages);
      } catch (error) {
        console.error("Failed to load brick images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Bricks</h2>
        <p className="text-center text-gray-500 mb-12">Built to last, priced to build.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            {loading ? <ImageSkeleton /> : <img src={images.firstClassImg || ''} alt="1st Class Bricks" className="w-full h-64 object-cover"/>}
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-800">1st Class Bricks – Premium Quality</h3>
              <p className="mt-2 text-gray-600">The highest standard for strength and durability. Perfect for projects where quality cannot be compromised.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            {loading ? <ImageSkeleton /> : <img src={images.secondClassImg || ''} alt="2nd Class Bricks" className="w-full h-64 object-cover"/>}
            <div className="p-6">
              <h3 className="text-xl font-bold text-orange-600">2nd Class Bricks – Budget Friendly</h3>
              <p className="mt-2 text-gray-600">A reliable and cost-effective solution for a wide range of construction needs without sacrificing core integrity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
