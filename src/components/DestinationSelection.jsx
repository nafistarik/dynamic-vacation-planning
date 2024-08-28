import React, { useState } from "react";

function DestinationSelection({ formData, updateFormData }) {
  // Local state to manage multi-destination logic
  const [additionalDestinations, setAdditionalDestinations] = useState([]);

  // Handle change in the main destination dropdown
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    updateFormData("selectedDestination", value);

    // Reset additional destinations if multi-destination is not selected
    if (value !== "Multi-Destination") {
      setAdditionalDestinations([]);
      updateFormData("multiDestination", false);
    }
  };

  // Handle multi-destination toggle
  const handleAddDestination = () => {
    setAdditionalDestinations([
      ...additionalDestinations,
      { destination: "", startDate: "", endDate: "" },
    ]);
    updateFormData("multiDestination", true);
  };

  // Handle changes in additional destinations
  const handleAdditionalDestinationChange = (index, key, value) => {
    const updatedDestinations = additionalDestinations.map((destination, i) =>
      i === index ? { ...destination, [key]: value } : destination
    );
    setAdditionalDestinations(updatedDestinations);
    updateFormData("additionalDestinations", updatedDestinations);
  };

  return (
    <div>
      <h2>Select Your Destination</h2>

      <div>
        <label>Destination:</label>
        <select
          value={formData.selectedDestination}
          onChange={handleDestinationChange}
        >
          <option value="">Select a destination</option>
          <option value="Paris">Paris</option>
          <option value="Bali">Bali</option>
          <option value="New York">New York</option>
          <option value="Multi-Destination">Multi-Destination</option>
        </select>
      </div>

      {formData.selectedDestination === "Multi-Destination" && (
        <>
          <button type="button" onClick={handleAddDestination}>
            Add Destination
          </button>

          {additionalDestinations.map((destination, index) => (
            <div key={index}>
              <h3>Destination {index + 1}</h3>

              <div>
                <label>Destination:</label>
                <input
                  type="text"
                  value={destination.destination}
                  onChange={(e) =>
                    handleAdditionalDestinationChange(
                      index,
                      "destination",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label>Start Date:</label>
                <input
                  type="date"
                  value={destination.startDate}
                  onChange={(e) =>
                    handleAdditionalDestinationChange(
                      index,
                      "startDate",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label>End Date:</label>
                <input
                  type="date"
                  value={destination.endDate}
                  onChange={(e) =>
                    handleAdditionalDestinationChange(
                      index,
                      "endDate",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default DestinationSelection;
