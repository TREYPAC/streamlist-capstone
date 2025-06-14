// src/components/SubscriptionItem.js
import React, { useState, useEffect } from 'react';
import localSocialImg from '../assets/social-subscription.png'; // Adjust path as needed

// Helper function to get image source
const getImageSrc = (img) => {
  if (img === 'local_social') {
    return localSocialImg;
  }
  return img;
};

function SubscriptionItem({ item, onAddToCart }) {
  const [feedback, setFeedback] = useState('Add to Cart');
  const [isAdding, setIsAdding] = useState(false);

  // Warn once if onAddToCart is missing or invalid
  useEffect(() => {
    if (typeof onAddToCart !== 'function') {
      console.warn('⚠️ onAddToCart prop is missing or not a function:', onAddToCart);
    }
  }, [onAddToCart]);

  // Reset feedback after a short delay
  useEffect(() => {
    if (feedback === 'Added!') {
      const timer = setTimeout(() => {
        setFeedback('Add to Cart');
        setIsAdding(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleAddToCart = () => {
    if (!isAdding) {
      setIsAdding(true);
      if (typeof onAddToCart === 'function') {
        onAddToCart({ ...item, quantity: 1 });
        setFeedback('Added!');
      } else {
        console.error('❌ onAddToCart is not a function.');
        setFeedback('Error');
        setIsAdding(false);
      }
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, width: 200 }}>
      <img
        src={getImageSrc(item.img)}
        alt={item.service}
        width="100%"
        height="150"
        style={{ objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
        }}
      />
      <h3>{item.service}</h3>
      <p>{item.serviceInfo}</p>
      <p><strong>${item.price.toFixed(2)}</strong></p>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        style={{
          backgroundColor: feedback === 'Added!' ? '#4CAF50' : '',
          color: feedback === 'Added!' ? 'white' : '',
          cursor: isAdding ? 'not-allowed' : 'pointer',
          transition: '0.3s',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {feedback}
      </button>
    </div>
  );
}

export default SubscriptionItem;
