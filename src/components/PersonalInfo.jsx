import React, { useEffect, useState } from "react";

function PersonalInfo({ formData, updateFormData }) {
  // Local state for ages of travelers
  const [ages, setAges] = useState(Array(formData.numTravelers).fill(""));

  // Update formData when any field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);

    // If number of travelers changes, update the ages array
    if (name === "numTravelers") {
      const numTravelers = parseInt(value) || 1;
      setAges(Array(numTravelers).fill(""));
    }
  };

  // Handle age input change
  const handleAgeChange = (index, value) => {
    const newAges = [...ages];
    newAges[index] = value;
    setAges(newAges);

    // Check if any traveler is under 12
    const hasChildUnder12 = newAges.some((age) => age && parseInt(age) < 12);
    if (hasChildUnder12) {
      updateFormData("hasChildUnder12", true);
    } else {
      updateFormData("hasChildUnder12", false);
    }
  };

  // Sync ages with the parent formData
  useEffect(() => {
    updateFormData("ages", ages);
  }, [ages]);

  return (
    <div>
      <h2>Personal Information</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Number of Travelers:</label>
        <input
          type="number"
          name="numTravelers"
          value={formData.numTravelers}
          onChange={handleInputChange}
          min="1"
        />
      </div>

      {Array.from({ length: formData.numTravelers }).map((_, index) => (
        <div key={index}>
          <label>Traveler {index + 1} Age:</label>
          <input
            type="number"
            value={ages[index]}
            onChange={(e) => handleAgeChange(index, e.target.value)}
            min="0"
          />
        </div>
      ))}
    </div>
  );
}

export default PersonalInfo;
