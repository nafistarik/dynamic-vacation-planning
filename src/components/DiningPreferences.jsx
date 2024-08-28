import React, { useEffect, useState } from "react";

function DiningPreferences({ formData, updateFormData }) {
  // Local state for available dining options
  const [availableDiningOptions, setAvailableDiningOptions] = useState([]);

  // Meal plans and dietary restrictions
  const mealPlans = ["None", "Breakfast Only", "Half Board", "Full Board"];
  const dietaryRestrictionsOptions = ["Vegetarian", "Vegan", "Gluten-Free"];

  // Handle meal plan change
  const handleMealPlanChange = (e) => {
    const value = e.target.value;
    updateFormData("mealPlan", value);

    // Adjust total cost based on meal plan (example logic)
    let costAdjustment = 0;
    switch (value) {
      case "Breakfast Only":
        costAdjustment = 100; // Example: add $100 for Breakfast Only
        break;
      case "Half Board":
        costAdjustment = 200; // Example: add $200 for Half Board
        break;
      case "Full Board":
        costAdjustment = 300; // Example: add $300 for Full Board
        break;
      default:
        costAdjustment = 0;
    }
    updateFormData("mealPlanCost", costAdjustment);
  };

  // Handle dietary restriction changes
  const handleDietaryRestrictionChange = (restriction, isChecked) => {
    let updatedRestrictions = [...formData.dietaryRestrictions];
    if (isChecked) {
      updatedRestrictions.push(restriction);
    } else {
      updatedRestrictions = updatedRestrictions.filter(
        (r) => r !== restriction
      );
    }
    updateFormData("dietaryRestrictions", updatedRestrictions);
  };

  // Adjust dining options based on dietary restrictions
  useEffect(() => {
    const getDiningOptions = () => {
      // Example logic: filter dining options based on restrictions
      if (formData.dietaryRestrictions.includes("Vegetarian")) {
        return ["Vegetarian Restaurant 1", "Vegetarian Restaurant 2"];
      }
      if (formData.dietaryRestrictions.includes("Vegan")) {
        return ["Vegan Restaurant 1", "Vegan Restaurant 2"];
      }
      if (formData.dietaryRestrictions.includes("Gluten-Free")) {
        return ["Gluten-Free Restaurant 1", "Gluten-Free Restaurant 2"];
      }
      return ["Standard Restaurant 1", "Standard Restaurant 2"];
    };

    setAvailableDiningOptions(getDiningOptions());
  }, [formData.dietaryRestrictions]);

  return (
    <div>
      <h2>Dining Preferences</h2>

      <div>
        <label>Meal Plan:</label>
        <select value={formData.mealPlan} onChange={handleMealPlanChange}>
          {mealPlans.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Dietary Restrictions:</label>
        {dietaryRestrictionsOptions.map((restriction) => (
          <div key={restriction}>
            <label>
              <input
                type="checkbox"
                checked={formData.dietaryRestrictions.includes(restriction)}
                onChange={(e) =>
                  handleDietaryRestrictionChange(restriction, e.target.checked)
                }
              />
              {restriction}
            </label>
          </div>
        ))}
      </div>

      {availableDiningOptions.length > 0 && (
        <div>
          <h3>Available Dining Options:</h3>
          <ul>
            {availableDiningOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DiningPreferences;
