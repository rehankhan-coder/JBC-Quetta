
import React, { useState, useMemo } from 'react';
import { BrickType } from '../types';
import { BRICK_PRICES } from '../constants';

const CalculatorAndPricing: React.FC = () => {
  const [brickType, setBrickType] = useState<BrickType>(BrickType.FIRST_CLASS);
  const [quantity, setQuantity] = useState<number>(1000);

  const pricePerBrick = BRICK_PRICES[brickType].price;
  const totalPrice = useMemo(() => {
    return (quantity || 0) * pricePerBrick;
  }, [quantity, pricePerBrick]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 0 : value);
  };
  
  const pricingData = [
    { type: BrickType.FIRST_CLASS, price: BRICK_PRICES[BrickType.FIRST_CLASS].price, quantities: [1000, 3000, 10000] },
    { type: BrickType.SECOND_CLASS, price: BRICK_PRICES[BrickType.SECOND_CLASS].price, quantities: [1000, 3000, 10000] },
  ];

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Calculator */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Brick Price Calculator</h2>
            <div className="space-y-6">
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">Brick Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setBrickType(BrickType.FIRST_CLASS)} className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${brickType === BrickType.FIRST_CLASS ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white hover:border-blue-400'}`}>
                    <span className="font-bold">1st Class</span>
                  </button>
                  <button onClick={() => setBrickType(BrickType.SECOND_CLASS)} className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${brickType === BrickType.SECOND_CLASS ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white hover:border-orange-400'}`}>
                    <span className="font-bold">2nd Class</span>
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="quantity" className="font-semibold text-gray-700 mb-2 block">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g., 5000"
                />
              </div>
              <div className="text-center bg-blue-50 p-6 rounded-lg border border-blue-200">
                <p className="text-lg text-gray-600">Total Estimated Price</p>
                <p className="text-4xl font-extrabold text-blue-800 tracking-tight">
                  PKR {totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="mt-8 lg:mt-0">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Pricing Table</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 font-semibold">Brick Type</th>
                    <th className="p-4 font-semibold text-right">Per Brick</th>
                    <th className="p-4 font-semibold text-right">1,000</th>
                    <th className="p-4 font-semibold text-right">3,000</th>
                    <th className="p-4 font-semibold text-right">10,000</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((row, index) => (
                    <tr key={row.type} className={`border-t ${index === 0 ? 'border-blue-200' : 'border-orange-200'}`}>
                      <td className={`p-4 font-bold ${index === 0 ? 'text-blue-800' : 'text-orange-600'}`}>{row.type}</td>
                      <td className="p-4 text-right font-medium">PKR {row.price}</td>
                      {row.quantities.map(q => (
                        <td key={q} className="p-4 text-right text-gray-600">{(q * row.price).toLocaleString()}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorAndPricing;
