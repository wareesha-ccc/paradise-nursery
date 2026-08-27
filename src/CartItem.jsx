import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import { Link } from "react-router-dom";
import "./CartItem.css";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const getPrice = (cost) => {
    if (typeof cost === "number") return cost;
    return parseFloat(String(cost).replace("$", ""));
  };

  // Total amount of the complete shopping cart
  const totalCartAmount = cartItems.reduce(
    (total, item) => total + getPrice(item.cost) * item.quantity,
    0
  );

  // Total number of items shown in cart icon
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert("Coming Soon");
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Paradise Nursery
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/products" className="nav-link">
            Plants
          </Link>

          <Link to="/cart" className="nav-link">
            🛒 Cart ({totalItems})
          </Link>
        </div>
      </nav>

      <main className="cart-container">
        <h1>Shopping Cart</h1>

        <h2>Total Cart Amount: ${totalCartAmount.toFixed(2)}</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => {
            const itemTotal = getPrice(item.cost) * item.quantity;

            return (
              <div className="cart-item" key={item.name}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>

                  <p>Unit Price: ${getPrice(item.cost).toFixed(2)}</p>

                  <p>
                    Total Cost: ${itemTotal.toFixed(2)}
                  </p>

                  <div className="cart-item-quantity">
                    <button
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}

        <div className="cart-actions">
          <Link to="/products">
            <button>Continue Shopping</button>
          </Link>

          <button onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;