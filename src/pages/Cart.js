import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 2.0;
  const total = subtotal + tax;

  return (
    <div style={{ minHeight: "100vh", padding: "40px", backgroundColor: "#f5f5f5" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", padding: "30px", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "20px" }}>Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items in your cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <div>
                  <h4>{item.title || item.service}</h4>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <img
                  src={item.image || item.img}
                  alt={item.title || item.service}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                  }}
                />
              </div>
            ))}

            <hr />

            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
              <p><strong>Tax:</strong> ${tax.toFixed(2)}</p>
              <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              style={{
                marginTop: "20px",
                padding: "12px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Go to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
