import React, { useState, useEffect } from 'react';
import { generateBrickImages, BrickImages } from '../services/geminiService';

const Products: React.FC = () => {
  const [images, setImages] = useState<BrickImages | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const placeholderImages = {
        firstClassImg: { imageUrl: "https://picsum.photos/seed/premium_bricks/1280/720", isPlaceholder: true },
        secondClassImg: { imageUrl: "https://picsum.photos/seed/standard_bricks/1280/720", isPlaceholder: true }
      };

      if (!process.env.API_KEY) {
        console.warn("API_KEY not found, using placeholder images.");
        setImages(placeholderImages);
        setLoading(false);
        return;
      }

      try {
        const generatedImages = await generateBrickImages();
        setImages(generatedImages);
      } catch (error) {
        console.error("Failed to generate brick images, using placeholders:", error);
        setImages(placeholderImages);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);
  
  const ImageContainer: React.FC<{ loading: boolean; src?: string, alt: string }> = ({ loading, src, alt }) => (
    <div className="relative w-full h-64 bg-gray-200">
      {loading || !src ? (
        <div className="w-full h-full animate-pulse bg-gray-300"></div>
      ) : (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      )}
    </div>
  );

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800 inline-block relative">
                Our Bricks
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-center text-gray-500 mt-4">Built to last, priced to build.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <ImageContainer loading={loading} src={images?.firstClassImg.imageUrl} alt="1st Class Bricks" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-800">1st Class Bricks – Premium Quality</h3>
              <p className="mt-2 text-gray-600">The highest standard for strength and durability. Perfect for projects where quality cannot be compromised.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <ImageContainer loading={loading} src={images?.secondClassImg.imageUrl} alt="2nd Class Bricks" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-orange-600">2nd Class Bricks – Budget Friendly</h3>
              <p className="mt-2 text-gray-600">A reliable and cost-effective solution for a wide range of construction needs without sacrificing core integrity.</p>
            </div>
          </div>
        </div>
        {images?.firstClassImg.isPlaceholder && process.env.API_KEY && !loading && (
           <p className="text-center text-sm text-gray-500 mt-8">
             Note: AI-generated images failed to load, so we're showing placeholders. The AI-generated images are cached for faster subsequent loads.
           </p>
        )}
        {!process.env.API_KEY && !loading && (
          <div className="mt-8 text-center bg-yellow-50 border border-yellow-200 rounded-lg p-4">
             <p className="text-sm text-yellow-700">
               <strong>Note:</strong> The API key for image generation is not configured. Displaying placeholder images.
             </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;