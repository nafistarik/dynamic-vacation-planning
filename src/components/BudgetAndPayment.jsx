import React, { useEffect, useState } from "react";

const BudgetAndPayment = ({ formData, updateFormData }) => {
  const [budget, setBudget] = useState(formData.budget);
  const [paymentPlan, setPaymentPlan] = useState(formData.paymentPlan);
  const [paymentMethod, setPaymentMethod] = useState(formData.paymentMethod);
  const [paymentBreakdown, setPaymentBreakdown] = useState(null);

  useEffect(() => {
    // Update the formData with current state values
    updateFormData("budget", budget);
    updateFormData("paymentPlan", paymentPlan);
    updateFormData("paymentMethod", paymentMethod);

    // Calculate the payment breakdown if installments are selected
    if (paymentPlan === "Installments") {
      const totalCost = calculateTotalCost(); // Replace with actual cost calculation logic
      const numberOfInstallments = 3; // Example value, replace with user input or logic
      setPaymentBreakdown({
        totalCost,
        installmentAmount: totalCost / numberOfInstallments,
        dueDates: Array.from({ length: numberOfInstallments }, (_, i) =>
          new Date(
            new Date().setMonth(new Date().getMonth() + i + 1)
          ).toLocaleDateString()
        ),
      });
    } else {
      setPaymentBreakdown(null);
    }
  }, [budget, paymentPlan, paymentMethod]);

  const calculateTotalCost = () => {
    // Replace with actual total cost calculation based on formData
    return 1000; // Example total cost
  };

  return (
    <div className="budget-payment">
      <h2 className="section-title">Budget and Payment Options</h2>
      <div className="budget-range">
        <label className="form-label">Budget Range:</label>
        <input
          type="range"
          min="100"
          max="5000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="budget-range-input"
        />
        <span className="budget-value">${budget}</span>
      </div>
      <div className="payment-plan">
        <label className="form-label">Payment Plan:</label>
        <select
          value={paymentPlan}
          onChange={(e) => setPaymentPlan(e.target.value)}
          className="payment-plan-select"
        >
          <option value="Full Payment">Full Payment</option>
          <option value="Installments">Installments</option>
        </select>
      </div>
      {paymentPlan === "Installments" && paymentBreakdown && (
        <div className="payment-breakdown">
          <h3 className="breakdown-title">Payment Breakdown:</h3>
          <p>Total Cost: ${paymentBreakdown.totalCost}</p>
          <p>Amount per Installment: ${paymentBreakdown.installmentAmount}</p>
          <ul className="due-dates-list">
            {paymentBreakdown.dueDates.map((date, index) => (
              <li key={index}>
                Installment {index + 1}: Due on {date}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="payment-method">
        <label className="form-label">Preferred Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="payment-method-select"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>
    </div>
  );
};

export default BudgetAndPayment;
