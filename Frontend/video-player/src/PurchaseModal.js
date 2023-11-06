import React, { useState } from 'react';
import './PurchaseModal.css';

const PurchaseModal = ({ videoId, onPurchase }) => {
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPurchase(pin);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>
          Enter PIN:
          <input type="password" value={pin} onChange={e => setPin(e.target.value)} />
        </label>
        <button type="submit">Confirm Purchase</button>
      </form>
    </div>
  );
};

export default PurchaseModal;