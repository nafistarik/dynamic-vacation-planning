import React, { useEffect, useState } from "react";

function TravelDates({ formData, updateFormData }) {
  // Local state for date validation error messages
  const [dateError, setDateError] = useState("");

  // Handle start date change
  const handleStartDateChange = (e) => {
    const value = e.target.value;
    updateFormData("startDate", value);
    validateDates(value, formData.endDate);
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    const value = e.target.value;
    updateFormData("endDate", value);
    validateDates(formData.startDate, value);
  };

  // Date validation function
  const validateDates = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const maxDuration = 30; // Example: maximum trip duration of 30 days

      if (endDate < startDate) {
        setDateError("End date cannot be before start date.");
      } else if ((endDate - startDate) / (1000 * 60 * 60 * 24) > maxDuration) {
        setDateError(`The trip cannot exceed ${maxDuration} days.`);
      } else {
        setDateError("");
      }
    }
  };

  // Effect to check availability based on dates (placeholder for availability logic)
  useEffect(() => {
    if (!dateError && formData.startDate && formData.endDate) {
      // Placeholder for checking availability based on dates
      // Example: fetch or calculate availability here
      console.log(
        "Checking availability for dates:",
        formData.startDate,
        formData.endDate
      );
    }
  }, [formData.startDate, formData.endDate, dateError]);

  return (
    <div>
      <h2>Select Your Travel Dates</h2>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={handleStartDateChange}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={handleEndDateChange}
        />
      </div>

      {dateError && <div style={{ color: "red" }}>{dateError}</div>}
    </div>
  );
}

export default TravelDates;
