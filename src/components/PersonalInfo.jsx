import React, { useEffect, useState } from "react";

function PersonalInfo({ formData, updateFormData }) {
  const [ages, setAges] = useState(Array(formData.numTravelers).fill(""));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);

    if (name === "numTravelers") {
      const numTravelers = parseInt(value) || 1;
      setAges(Array(numTravelers).fill(""));
    }
  };

  const handleAgeChange = (index, value) => {
    const newAges = [...ages];
    newAges[index] = value;
    setAges(newAges);

    const hasChildUnder12 = newAges.some((age) => age && parseInt(age) < 12);
    if (hasChildUnder12) {
      updateFormData("hasChildUnder12", true);
    } else {
      updateFormData("hasChildUnder12", false);
    }
  };

  useEffect(() => {
    updateFormData("ages", ages);
  }, [ages]);

  return (
    <div className="personal-info">
      <h2>Personal Information</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="numTravelers">Number of Travelers:</label>
        <input
          id="numTravelers"
          type="number"
          name="numTravelers"
          value={formData.numTravelers}
          onChange={handleInputChange}
          min="1"
        />
      </div>

      {Array.from({ length: formData.numTravelers }).map((_, index) => (
        <div className="form-group" key={index}>
          <label htmlFor={`age-${index}`}>Traveler {index + 1} Age:</label>
          <input
            id={`age-${index}`}
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
