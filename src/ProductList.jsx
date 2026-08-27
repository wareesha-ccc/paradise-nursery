import React, { useState } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import { Link } from 'react-router-dom';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { name: 'Snake Plant', image: '/images/snake-plant.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
        { name: 'Spider Plant', image: '/images/spider-plant.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
        { name: 'Peace Lily', image: '/images/peace-lily.jpg', description: 'Removes mold spores and purifies the air.', cost: '$18' },
        { name: 'Boston Fern', image: '/images/boston-fern.jpg', description: 'Adds humidity and removes air pollutants.', cost: '$14' },
        { name: 'Rubber Plant', image: '/images/rubber-plant.jpg', description: 'Easy to care for and great at cleaning air.', cost: '$20' },
        { name: 'Areca Palm', image: '/images/areca-palm.jpg', description: 'A natural humidifier and air purifier.', cost: '$25' },
      ],
    },
    {
      category: 'Aromatic Plants',
      plants: [
        { name: 'Lavender', image: '/images/lavender.jpg', description: 'Calming fragrance that aids sleep.', cost: '$10' },
        { name: 'Rosemary', image: '/images/rosemary.jpg', description: 'Invigorating scent, also used in cooking.', cost: '$8' },
        { name: 'Mint', image: '/images/mint.jpg', description: 'Refreshing aroma, great for teas.', cost: '$6' },
        { name: 'Jasmine', image: '/images/jasmine.jpg', description: 'Sweet fragrance that lifts the mood.', cost: '$15' },
        { name: 'Basil', image: '/images/basil.jpg', description: 'Aromatic herb perfect for the kitchen.', cost: '$5' },
        { name: 'Lemon Balm', image: '/images/lemon-balm.jpg', description: 'Citrusy scent that relieves stress.', cost: '$7' },
      ],
    },
    {
      category: 'Medicinal Plants',
      plants: [
        { name: 'Aloe Vera', image: '/images/aloe-vera.jpg', description: 'Soothes burns and skin irritations.', cost: '$12' },
        { name: 'Chamomile', image: '/images/chamomile.jpg', description: 'Used in teas to promote relaxation.', cost: '$9' },
        { name: 'Peppermint', image: '/images/peppermint.jpg', description: 'Helps digestion and relieves headaches.', cost: '$7' },
        { name: 'Holy Basil (Tulsi)', image: '/images/tulsi.jpg', description: 'An adaptogen that reduces stress.', cost: '$8' },
        { name: 'Echinacea', image: '/images/echinacea.jpg', description: 'Boosts the immune system.', cost: '$11' },
        { name: 'Ginger', image: '/images/ginger.jpg', description: 'Aids digestion and reduces nausea.', cost: '$13' },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn-icons-png.flaticon.com/512/628/628283.png" alt="logo" width="40" />
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </Link>
          </div>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Plants</Link>
          <Link to="/cart" className="nav-link">
            <span className="cart-icon">
              🛒
              <span className="cart-count">{totalItems}</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Product listing */}
      <div className="product-grid">
        {plantsArray.map((categoryObj, index) => (
          <div key={index}>
            <h2 className="category-title">{categoryObj.category}</h2>
            <div className="product-list">
              {categoryObj.plants.map((plant, plantIndex) => (
                <div className="product-card" key={plantIndex}>
                  <img className="product-image" src={plant.image} alt={plant.name} />
                  <h3 className="product-title">{plant.name}</h3>
                  <p>{plant.description}</p>
                  <p className="product-price">{plant.cost}</p>
                  <button
                    className="product-button"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;