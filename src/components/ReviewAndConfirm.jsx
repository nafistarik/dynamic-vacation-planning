import React, { useEffect, useState } from "react";

const ReviewAndConfirm = ({ formData, updateFormData }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(true);

  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields = [
      formData.name,
      formData.email,
      formData.phoneNumber,
      formData.selectedDestination,
      formData.startDate,
      formData.endDate,
      formData.accommodationType,
      formData.paymentPlan,
      formData.paymentMethod,
    ];
    setIsFormComplete(
      requiredFields.every((field) => field && field.length > 0)
    );
  }, [formData]);

  const handleSubmit = () => {
    if (termsAccepted && isFormComplete) {
      // Handle form submission logic here
      alert("Form submitted successfully!");
      // Clear form data or redirect as needed
    }
  };

  return (
    <div className="review-confirm">
      <h2 className="section-title">Review and Confirm</h2>

      <div className="review-section">
        <h3 className="section-heading">Personal Information</h3>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Phone Number: {formData.phoneNumber}</p>
      </div>

      <div className="review-section">
        <h3 className="section-heading">Destination</h3>
        <p>Destination: {formData.selectedDestination}</p>
        <p>
          Additional Destinations: {formData.additionalDestinations.join(", ")}
        </p>
      </div>

      <div className="review-section">
        <h3 className="section-heading">Travel Dates</h3>
        <p>Start Date: {formData.startDate}</p>
        <p>End Date: {formData.endDate}</p>
      </div>

      <div className="review-section">
        <h3 className="section-heading">Accommodation Preferences</h3>
        <p>Accommodation Type: {formData.accommodationType}</p>
        <p>Star Rating: {formData.starRating}</p>
        <p>Room Type: {formData.roomType}</p>
        <p>Sea View: {formData.seaView ? "Yes" : "No"}</p>
        <p>Breakfast Included: {formData.breakfastIncluded ? "Yes" : "No"}</p>
      </div>

      <div className="review-section">
        <h3 className="section-heading">Activities</h3>
        <p>Selected Activities: {formData.selectedActivities.join(", ")}</p>
      </div>

      <div className="review-section">
        <h3 className="section-heading">Transportation Options</h3>
        <p>Flight Booking: {formData.flightBooking ? "Yes" : "No"}</p>
        <p>Car Rental: {formData.carRental ? "Yes" : "No"}</p>
        <p>Public Transport: {formData.publicTransport ? "Yes" : "No"}</p>
      </div>

      <div className="review-section">
        <h3 className="section-heading">Dining Preferences</h3>
        <p>Meal Plan: {formData.mealPlan}</p>
        <p>Dietary Restrictions: {formData.dietaryRestrictions.join(", ")}</p>
      </div>

      <div className="review-section">
        <h3 className="section-heading">Special Requests</h3>
        <p>Special Requests: {formData.specialRequests}</p>
      </div>

      <div className="review-section">
        <h3 className="section-heading">Budget and Payment</h3>
        <p>Budget: ${formData.budget}</p>
        <p>Payment Plan: {formData.paymentPlan}</p>
        <p>Payment Method: {formData.paymentMethod}</p>
      </div>

      <div className="terms-acceptance">
        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="terms-checkbox"
          />
          I accept the terms and conditions
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!termsAccepted || !isFormComplete}
        className="submit-button"
      >
        Submit
      </button>
    </div>
  );
};

export default ReviewAndConfirm;
