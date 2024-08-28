import React, { useEffect, useState } from "react";

function AccommodationPreferences({ formData, updateFormData }) {
  // Local state for special requests
  const [specialRequests, setSpecialRequests] = useState({
    seaView: false,
    breakfastIncluded: false,
  });

  // Handle accommodation type change
  const handleAccommodationTypeChange = (e) => {
    const value = e.target.value;
    updateFormData("accommodationType", value);

    // Reset special requests if accommodation type changes
    setSpecialRequests({
      seaView: false,
      breakfastIncluded: false,
    });
  };

  // Handle star rating change
  const handleStarRatingChange = (e) => {
    updateFormData("starRating", e.target.value);
  };

  // Handle room type change
  const handleRoomTypeChange = (e) => {
    updateFormData("roomType", e.target.value);
  };

  // Handle special requests change
  const handleSpecialRequestChange = (e) => {
    const { name, checked } = e.target;
    setSpecialRequests((prevRequests) => ({
      ...prevRequests,
      [name]: checked,
    }));
    updateFormData(name, checked);
  };

  // Adjust room types based on the number of travelers
  const getRoomOptions = () => {
    const numTravelers = formData.numTravelers || 1;
    if (numTravelers > 2) {
      return ["Family Room", "Suite"];
    } else {
      return ["Single", "Double", "Suite"];
    }
  };

  // Fetch available accommodations based on destination and type
  useEffect(() => {
    if (
      formData.accommodationType === "Hotel" &&
      formData.selectedDestination
    ) {
      // Placeholder for fetching available hotels in the selected destination
      console.log(`Fetching hotels in ${formData.selectedDestination}`);
    }
  }, [formData.accommodationType, formData.selectedDestination]);

  return (
    <div className="accommodation-preferences">
      <h2>Accommodation Preferences</h2>

      <div className="form-group">
        <label>Accommodation Type:</label>
        <select
          className="form-select"
          value={formData.accommodationType}
          onChange={handleAccommodationTypeChange}
        >
          <option value="">Select an accommodation type</option>
          <option value="Hotel">Hotel</option>
          <option value="Airbnb">Airbnb</option>
          <option value="Hostel">Hostel</option>
          <option value="Resort">Resort</option>
        </select>
      </div>

      {formData.accommodationType && (
        <>
          <div className="form-group">
            <label>Star Rating:</label>
            <select
              className="form-select"
              value={formData.starRating}
              onChange={handleStarRatingChange}
            >
              <option value="">Select a star rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>

          <div className="form-group">
            <label>Room Type:</label>
            <select
              className="form-select"
              value={formData.roomType}
              onChange={handleRoomTypeChange}
            >
              {getRoomOptions().map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {formData.accommodationType === "Hotel" && (
            <>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="seaView"
                    checked={specialRequests.seaView}
                    onChange={handleSpecialRequestChange}
                  />
                  Sea View
                </label>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="breakfastIncluded"
                    checked={specialRequests.breakfastIncluded}
                    onChange={handleSpecialRequestChange}
                  />
                  Breakfast Included
                </label>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AccommodationPreferences;
