
import React, { useState, useMemo } from 'react';
import { BrickType } from '../types';
import { BRICK_PRICES, WHATSAPP_NUMBER } from '../constants';

const OrderForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [brickType, setBrickType] = useState<BrickType>(BrickType.FIRST_CLASS);
  const [quantity, setQuantity] = useState<number>(1000);
  const [location, setLocation] = useState('');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'fetching' | 'success' | 'error' | 'denied'>('idle');

  const totalPrice = useMemo(() => {
    return (quantity || 0) * BRICK_PRICES[brickType].price;
  }, [quantity, brickType]);

  const handleLocationDetect = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }
    setLocationStatus('fetching');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        setLocationStatus('success');
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationStatus(error.code === error.PERMISSION_DENIED ? 'denied' : 'error');
      }
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `
*New Brick Order from JBC Website*

*Name:* ${name}
*Phone:* ${phone}
*Brick Type:* ${brickType}
*Quantity:* ${quantity}
*Total Price:* PKR ${totalPrice.toLocaleString()}
*Location:* ${location || 'Not provided'}
    `;
    
    const encodedMessage = encodeURIComponent(message.trim());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="order" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Place Your Order</h2>
        <p className="text-center text-gray-500 mb-10">Fill out the form below and we'll get back to you via WhatsApp.</p>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="font-semibold text-gray-700 mb-2 block">Full Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-input" placeholder="Javeed Khan" required />
            </div>
            <div>
              <label htmlFor="phone" className="font-semibold text-gray-700 mb-2 block">Phone Number</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" placeholder="03001234567" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brickType" className="font-semibold text-gray-700 mb-2 block">Brick Type</label>
              <select id="brickType" value={brickType} onChange={(e) => setBrickType(e.target.value as BrickType)} className="form-input" required>
                <option value={BrickType.FIRST_CLASS}>1st Class Bricks</option>
                <option value={BrickType.SECOND_CLASS}>2nd Class Bricks</option>
              </select>
            </div>
            <div>
              <label htmlFor="order-quantity" className="font-semibold text-gray-700 mb-2 block">Quantity</label>
              <input type="number" id="order-quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" className="form-input" placeholder="1000" required />
            </div>
          </div>
          
          <div>
            <label htmlFor="location" className="font-semibold text-gray-700 mb-2 block">Delivery Location</label>
            <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="form-input flex-grow" placeholder="Enter address or detect automatically" />
                <button type="button" onClick={handleLocationDetect} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    <span>{locationStatus === 'fetching' ? 'Detecting...' : 'Detect Location'}</span>
                </button>
            </div>
            {locationStatus === 'denied' && <p className="text-red-500 text-sm mt-2">Location access denied. Please enter your address manually.</p>}
            {locationStatus === 'error' && <p className="text-red-500 text-sm mt-2">Could not get location. Please enter your address manually.</p>}
          </div>

          <div className="text-center bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-lg text-gray-600">Total Price</p>
            <p className="text-3xl font-bold text-blue-800">PKR {totalPrice.toLocaleString()}</p>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            <span>Send Order via WhatsApp</span>
          </button>
        </form>
      </div>
      <style>{`
          .form-input {
              width: 100%;
              padding: 0.75rem 1rem;
              border: 1px solid #D1D5DB;
              border-radius: 0.5rem;
              transition: ring 0.2s, border-color 0.2s;
          }
          .form-input:focus {
              outline: none;
              --tw-ring-color: #3B82F6;
              --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
              --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
              box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
              border-color: #3B82F6;
          }
      `}</style>
    </section>
  );
};

export default OrderForm;
