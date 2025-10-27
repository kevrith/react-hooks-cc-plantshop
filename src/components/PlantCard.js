import React from "react";

function PlantCard({ plant, onUpdatePlant }) {
  const { name, price, image, id, inStock } = plant;

  const handleToggle = () => {
    onUpdatePlant(id, { inStock: !inStock });
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image || "https://via.placeholder.com/400"} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleToggle}>In Stock</button>
      ) : (
        <button onClick={handleToggle}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
