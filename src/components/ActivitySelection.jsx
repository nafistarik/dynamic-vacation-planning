import React, { useEffect, useState } from "react";

function ActivitySelection({ formData, updateFormData }) {
  // State for selected activities and activity levels
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [activityLevels, setActivityLevels] = useState({});

  // Available activities based on the destination
  const getAvailableActivities = () => {
    switch (formData.selectedDestination) {
      case "Bali":
        return [
          "Sightseeing",
          "Scuba Diving",
          "Hiking",
          "Adventure Activities",
        ];
      case "Paris":
        return [
          "Museum Tours",
          "Sightseeing",
          "Wine Tasting",
          "Adventure Activities",
        ];
      case "New York":
        return [
          "Museum Tours",
          "Sightseeing",
          "Broadway Shows",
          "Adventure Activities",
        ];
      default:
        return [];
    }
  };

  // Handle activity selection
  const handleActivityChange = (activity, isChecked) => {
    if (isChecked) {
      setSelectedActivities([...selectedActivities, activity]);
    } else {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    }
  };

  // Handle activity level selection
  const handleActivityLevelChange = (activity, level) => {
    setActivityLevels({ ...activityLevels, [activity]: level });
  };

  // Update form data whenever selectedActivities or activityLevels change
  useEffect(() => {
    updateFormData("selectedActivities", selectedActivities);
    updateFormData("activityLevels", activityLevels);
  }, [selectedActivities, activityLevels]);

  return (
    <div>
      <h2>Select Activities</h2>

      {getAvailableActivities().map((activity) => (
        <div key={activity}>
          <label>
            <input
              type="checkbox"
              checked={selectedActivities.includes(activity)}
              onChange={(e) => handleActivityChange(activity, e.target.checked)}
            />
            {activity}
          </label>

          {activity === "Adventure Activities" &&
            selectedActivities.includes(activity) && (
              <div>
                <label>Difficulty Level:</label>
                <select
                  value={activityLevels[activity] || ""}
                  onChange={(e) =>
                    handleActivityLevelChange(activity, e.target.value)
                  }
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            )}
        </div>
      ))}

      {/* Additional dynamic inputs based on activity selection */}
      {selectedActivities.map((activity) => (
        <div key={activity}>
          <label>
            Preferred time of day for {activity}:
            <input
              type="text"
              placeholder="e.g., Morning, Afternoon"
              onChange={(e) =>
                updateFormData(`${activity}_timePreference`, e.target.value)
              }
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default ActivitySelection;
