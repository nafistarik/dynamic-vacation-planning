import React, { useState } from "react";

function DestinationSelection({ formData, updateFormData }) {
  const [additionalDestinations, setAdditionalDestinations] = useState([]);

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    updateFormData("selectedDestination", value);

    if (value !== "Multi-Destination") {
      setAdditionalDestinations([]);
      updateFormData("multiDestination", false);
    }
  };

  const handleAddDestination = () => {
    setAdditionalDestinations([
      ...additionalDestinations,
      { destination: "", startDate: "", endDate: "" },
    ]);
    updateFormData("multiDestination", true);
  };

  const handleAdditionalDestinationChange = (index, key, value) => {
    const updatedDestinations = additionalDestinations.map((destination, i) =>
      i === index ? { ...destination, [key]: value } : destination
    );
    setAdditionalDestinations(updatedDestinations);
    updateFormData("additionalDestinations", updatedDestinations);
  };

  return (
    <div className="personal-info">
      <h2>Select Your Destination</h2>

      <div className="form-group">
        <label>Destination:</label>
        <select
          value={formData.selectedDestination}
          onChange={handleDestinationChange}
          className="form-control"
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
          <button
            type="button"
            onClick={handleAddDestination}
            className="btn-add-destination"
          >
            Add Destination
          </button>

          {additionalDestinations.map((destination, index) => (
            <div key={index} className="destination-details">
              <h3>Destination {index + 1}</h3>

              <div className="form-group">
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
                  className="form-control"
                />
              </div>

              <div className="form-group">
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
                  className="form-control"
                />
              </div>

              <div className="form-group">
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
                  className="form-control"
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
