// src/pages/Subscriptions.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import list from '../data/data';
import SubscriptionItem from '../components/SubscriptionItem'; // Import the new component
// Remove localSocialImg import as it's now in SubscriptionItem

function Subscriptions() {
  const { addToCart } = useContext(CartContext);

  // getImageSrc is no longer needed here if moved to SubscriptionItem
  // const getImageSrc = (img) => { ... };

  return (
    <div style={{ padding: 20 }}>
      <h2>Subscription Details</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {list.map((item) => (
          <SubscriptionItem // Use the new component here
            key={item.id} // Keep the key prop
            item={item} // Pass the item data
            onAddToCart={addToCart} // Pass the addToCart function
          />
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
