import React, { useState } from 'react';
import AccommodationPreferences from './components/AccommodationPreferences';
import ActivitySelection from './components/ActivitySelection';
import BudgetAndPayment from './components/BudgetAndPayment';
import DestinationSelection from './components/DestinationSelection';
import DiningPreferences from './components/DiningPreferences';
import PersonalInfo from './components/PersonalInfo';
import ReviewAndConfirm from './components/ReviewAndConfirm'; // Import the new component
import SpecialRequests from './components/SpecialRequests';
import TransportationOptions from './components/TransportationOptions';
import TravelDates from './components/TravelDates';
// import other components

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    numTravelers: 1,
    ages: [],
    selectedDestination: '',
    multiDestination: false,
    additionalDestinations: [],
    startDate: '',
    endDate: '',
    accommodationType: '',
    starRating: '',
    roomType: '',
    seaView: false,
    breakfastIncluded: false,
    selectedActivities: [],
    activityLevels: {},
    flightBooking: false,
    carRental: false,
    publicTransport: false,
    flightDetails: { departureCity: '', classPreference: '' },
    carRentalDetails: { carType: '', rentalDuration: '' },
    mealPlan: 'None',
    mealPlanCost: 0,
    dietaryRestrictions: [],
    specialRequests: '',
    romanticDinner: false,
    couplesSpa: false,
    accessibleAccommodationsOnly: false,
    hasChildUnder12: false,
    budget: 1000, // Default value
    paymentPlan: 'Full Payment', // Default value
    paymentMethod: 'Credit Card', // Default value
    //...all other form fields
  });

  const [step, setStep] = useState(0); // Step to manage form progression

  const updateFormData = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    alert('Form submitted successfully!');
    // You might want to clear the form or redirect the user here
  };

  return (
    <div className="App">
      {step === 0 && <PersonalInfo formData={formData} updateFormData={updateFormData} />}
      {step === 1 && <DestinationSelection formData={formData} updateFormData={updateFormData} />}
      {step === 2 && <TravelDates formData={formData} updateFormData={updateFormData} />}
      {step === 3 && <AccommodationPreferences formData={formData} updateFormData={updateFormData} />}
      {step === 4 && <ActivitySelection formData={formData} updateFormData={updateFormData} />}
      {step === 5 && <TransportationOptions formData={formData} updateFormData={updateFormData} />}
      {step === 6 && <DiningPreferences formData={formData} updateFormData={updateFormData} />}
      {step === 7 && <SpecialRequests formData={formData} updateFormData={updateFormData} />}
      {step === 8 && <BudgetAndPayment formData={formData} updateFormData={updateFormData} />}
      {step === 9 && <ReviewAndConfirm formData={formData} updateFormData={updateFormData} />}
      
      <div>
        {step > 0 && <button onClick={handleBack}>Back</button>}
        {step < 9 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default App;
