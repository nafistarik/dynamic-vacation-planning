import React, { useEffect, useState } from "react";

function SpecialRequests({ formData, updateFormData }) {
  // Local state for special request handling
  const [showRomanticOptions, setShowRomanticOptions] = useState(false);
  const [showAccessibleOptions, setShowAccessibleOptions] = useState(false);

  // Handle special requests input
  const handleSpecialRequestsChange = (e) => {
    const value = e.target.value;
    updateFormData("specialRequests", value);

    // Check for keywords to toggle relevant options
    setShowRomanticOptions(value.toLowerCase().includes("honeymoon"));
    setShowAccessibleOptions(value.toLowerCase().includes("accessible room"));
  };

  // Effect to update accommodations if accessible room is requested
  useEffect(() => {
    if (showAccessibleOptions) {
      // Example logic: adjust accommodations to only show accessible options
      updateFormData("accessibleAccommodationsOnly", true);
    } else {
      updateFormData("accessibleAccommodationsOnly", false);
    }
  }, [showAccessibleOptions]);

  return (
    <div className="special-requests">
      <h2>Special Requests</h2>

      <div className="special-requests-input">
        <label className="form-label">Special Requests:</label>
        <textarea
          value={formData.specialRequests}
          onChange={handleSpecialRequestsChange}
          placeholder="e.g., Honeymoon Package, Accessible Room, etc."
          className="form-textarea"
        />
      </div>

      {showRomanticOptions && (
        <div className="romantic-options">
          <h3>Romantic Activities and Accommodations</h3>
          <label>
            <input
              type="checkbox"
              checked={formData.romanticDinner}
              onChange={(e) =>
                updateFormData("romanticDinner", e.target.checked)
              }
              className="form-checkbox"
            />
            Romantic Dinner
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={formData.couplesSpa}
              onChange={(e) => updateFormData("couplesSpa", e.target.checked)}
              className="form-checkbox"
            />
            Couples Spa Package
          </label>
        </div>
      )}

      {showAccessibleOptions && (
        <div className="accessible-options">
          <h3>Accessible Accommodations</h3>
          <p>
            We will adjust the list of accommodations to show only accessible
            options.
          </p>
        </div>
      )}
    </div>
  );
}

export default SpecialRequests;
