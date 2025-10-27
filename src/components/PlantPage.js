import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import useFetchPlants from "../hooks/useFetchPlants";

const API_URL = "http://localhost:6001/plants";

function PlantPage() {
  const { plants, loading, error, setPlants } = useFetchPlants(API_URL);
  const [searchTerm, setSearchTerm] = useState("");

  const addPlant = async (newPlant) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
      });
      const addedPlant = await response.json();
      setPlants((prevPlants) => [...prevPlants, addedPlant]);
    } catch (err) {
      console.error("Error adding plant:", err);
    }
  };

  const updatePlant = async (id, updatedPlant) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlant),
      });
      const updated = await response.json();
      setPlants((prevPlants) =>
        prevPlants.map((plant) => (plant.id === id ? updated : plant))
      );
    } catch (err) {
      console.error("Error updating plant:", err);
    }
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-gray-600">Loading plants...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-red-600">Error loading plants</h2>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onUpdatePlant={updatePlant} />
    </main>
  );
}

export default PlantPage;
