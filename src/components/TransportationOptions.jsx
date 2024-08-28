import React, { useState } from "react";

function TransportationOptions({ formData, updateFormData }) {
  // Local state for flight and car rental details
  const [flightDetails, setFlightDetails] = useState({
    departureCity: "",
    classPreference: "",
  });
  const [carRentalDetails, setCarRentalDetails] = useState({
    carType: "",
    rentalDuration: "",
  });

  // Handle transportation option changes
  const handleOptionChange = (option, isChecked) => {
    updateFormData(option, isChecked);

    // Reset details if options are unchecked
    if (!isChecked) {
      if (option === "flightBooking")
        setFlightDetails({ departureCity: "", classPreference: "" });
      if (option === "carRental")
        setCarRentalDetails({ carType: "", rentalDuration: "" });
    }
  };

  // Handle flight detail changes
  const handleFlightDetailsChange = (key, value) => {
    const updatedDetails = { ...flightDetails, [key]: value };
    setFlightDetails(updatedDetails);
    updateFormData("flightDetails", updatedDetails);
  };

  // Handle car rental detail changes
  const handleCarRentalDetailsChange = (key, value) => {
    const updatedDetails = { ...carRentalDetails, [key]: value };
    setCarRentalDetails(updatedDetails);
    updateFormData("carRentalDetails", updatedDetails);
  };

  // Adjust public transport options based on destination
  const getPublicTransportOptions = () => {
    switch (formData.selectedDestination) {
      case "Paris":
        return "Metro Pass";
      case "New York":
        return "Subway Pass";
      case "Bali":
        return "Local Bus Pass";
      default:
        return "Standard Public Transport Pass";
    }
  };

  return (
    <div className="transportation-options">
      <h2>Transportation Options</h2>

      <div className="option-group">
        <label className="option-label">
          <input
            type="checkbox"
            checked={formData.flightBooking}
            onChange={(e) =>
              handleOptionChange("flightBooking", e.target.checked)
            }
          />
          Flight Booking
        </label>

        {formData.flightBooking && (
          <div className="flight-details">
            <div className="form-group">
              <label>Departure City:</label>
              <input
                type="text"
                value={flightDetails.departureCity}
                onChange={(e) =>
                  handleFlightDetailsChange("departureCity", e.target.value)
                }
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Class Preference:</label>
              <select
                value={flightDetails.classPreference}
                onChange={(e) =>
                  handleFlightDetailsChange("classPreference", e.target.value)
                }
                className="form-select"
              >
                <option value="">Select Class</option>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="option-group">
        <label className="option-label">
          <input
            type="checkbox"
            checked={formData.carRental}
            onChange={(e) => handleOptionChange("carRental", e.target.checked)}
          />
          Car Rental
        </label>

        {formData.carRental && (
          <div className="car-rental-details">
            <div className="form-group">
              <label>Car Type:</label>
              <select
                value={carRentalDetails.carType}
                onChange={(e) =>
                  handleCarRentalDetailsChange("carType", e.target.value)
                }
                className="form-select"
              >
                <option value="">Select Car Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>

            <div className="form-group">
              <label>Rental Duration (days):</label>
              <input
                type="number"
                value={carRentalDetails.rentalDuration}
                onChange={(e) =>
                  handleCarRentalDetailsChange("rentalDuration", e.target.value)
                }
                min="1"
                className="form-input"
              />
            </div>
          </div>
        )}
      </div>

      <div className="option-group">
        <label className="option-label">
          <input
            type="checkbox"
            checked={formData.publicTransport}
            onChange={(e) =>
              handleOptionChange("publicTransport", e.target.checked)
            }
          />
          Public Transportation Pass
        </label>

        {formData.publicTransport && (
          <div className="public-transport-details">
            <label>Public Transport Option:</label>
            <input
              type="text"
              value={getPublicTransportOptions()}
              readOnly
              className="form-input"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TransportationOptions;
