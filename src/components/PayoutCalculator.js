import React, { useState, useEffect } from 'react';

const PayoutCalculator = ({ articles }) => {
  const [rate, setRate] = useState(() => {
    // Retrieve the rate from local storage or default to 50
    return Number(localStorage.getItem('payoutRate')) || 50;
  });
  const [totalPayout, setTotalPayout] = useState(0);

  useEffect(() => {
    // Store the rate in local storage whenever it changes
    localStorage.setItem('payoutRate', rate);
  }, [rate]);

  const calculatePayout = () => {
    const calculatedTotal = rate * articles.length;
    setTotalPayout(calculatedTotal);
  };

  return (
    <div className="stat p-4 bg-white shadow-inner rounded ">
      <h2 className="text-lg font-semibold">Payout Calculator</h2>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={rate}
          onChange={e => setRate(Number(e.target.value))}
          className=" stat border-blue-500 w-200 max-w-xs"
          style={{ padding: '8px' }}
        />
        <button
          onClick={calculatePayout}
          className={`mx-1 px-2 py-1 rounded text-white bg-blue-500 hover:bg-blue-700`}
          disabled={articles.length === 0}
        >
          Calculate
        </button>
      </div>
      <p className="mt-2 font-bold">Total Payout: <span className="text-lg">${totalPayout}</span></p>
    </div>
  );
};

export default PayoutCalculator;
