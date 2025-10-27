import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onUpdatePlant }) {
  if (!plants.length) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-gray-600">No plants available</h2>
      </div>
    );
  }

  return (
    <ul className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} onUpdatePlant={onUpdatePlant} />
      ))}
    </ul>
  );
}

export default PlantList;
