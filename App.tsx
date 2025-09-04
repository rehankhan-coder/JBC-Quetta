import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import CalculatorAndPricing from './components/CalculatorAndPricing';
import OrderForm from './components/OrderForm';
import LocationAndContact from './components/LocationAndContact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Header />
      <main>
        <Hero />
        <Products />
        <CalculatorAndPricing />
        <OrderForm />
        <LocationAndContact />
      </main>
      <Footer />
    </div>
  );
};

export default App;