import { useState } from "react";
import "./App.css";

import CustomerInfoForm from "./components/CustomerInfoForm";
import PizzaCustomizationForm from "./components/PizzaCustomizationForm";
import OrderSummary from "./components/OrderSummary";

import { calculateTotalPrice } from "./utils/functions";
import { DEFAULT_CUSTOMER_INFO, DEFAULT_PIZZA_INFO } from "./utils/constants";

const App = () => {
  const [customerInfo, setCustomerInfo] = useState(DEFAULT_CUSTOMER_INFO);

  const [pizzaOrder, setPizzaOrder] = useState(DEFAULT_PIZZA_INFO);

  const [formState, setFormState] = useState({
    errors: {},
    isSubmiting: false,
    showOrderSummary: false,
    currentErrors: {},
  });

  const handleCustomerInfoChange = (key, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetErrors = (key) => {
    setFormState((prev) => ({
      ...prev,
      currentErrors: { ...prev.currentErrors, [key]: "" },
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!customerInfo.name.trim()) {
      errors.name = "Please enter your name";
    } else if (customerInfo.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    const phoneRegex = /^[\d\s\-+]{10,}$/;
    if (!customerInfo.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(customerInfo.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid phone number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerInfo.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(customerInfo.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (customerInfo.isDelivery && !customerInfo.address.trim()) {
      errors.address = "Delivery address is required";
    }

    if (pizzaOrder.toppings.length === 0) {
      errors.toppings = "Please select at least one topping";
    }

    if (pizzaOrder.sides.length === 0) {
      errors.sides = "Please select at least one side";
    }

    return errors;
  };

  const checkValidation = () => {
    const errors = validateForm();
    setFormState((prev) => ({ ...prev, currentErrors: errors }));

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = checkValidation();

    if (!isValid) {
      const firstError = document.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return;
    }

    setFormState((prev) => ({ ...prev, isSubmiting: true }));

    try {
      const orderData = {
        customer: customerInfo,
        pizza: pizzaOrder,
        total: calculateTotalPrice(),
        orderTime: new Date().toISOString(),
        estimateDelivery: customerInfo.isDelivery
          ? "45-60 minutes"
          : "20-30 minutes",
      };

      console.log("Submitting order: ", orderData);
      alert(`Order placed successfully!
        Order ${Math.floor(Math.random() * 10000)}
        Total: ${calculateTotalPrice()}
        ${customerInfo.isDelivery ? `Deliver to ${customerInfo.address}` : "Ready for pickup at Mario's Pizza"}
        Thank you, ${customerInfo.name}! Your delicious pizza is beign prepared.`);

      resetForm();
    } catch (error) {
      console.log("Order submission failed", error);
      alert(
        "Sorry, there was a problem placing your order. Please try again or call Mario's delivery at (555) PIZZA-NY.",
      );
    } finally {
      setFormState((prev) => ({ ...prev, isSubmiting: false }));
    }
  };

  const resetForm = () => {
    setCustomerInfo(DEFAULT_CUSTOMER_INFO);
    setPizzaOrder(DEFAULT_PIZZA_INFO);
  }

  return (
    <div className="app">
      <header>
        <h1>Mario's Pizza</h1>
        <p>Authentic Brooklyn Pizza Since 1952</p>
      </header>

      <main>
        <form className="pizza-order-form" onSubmit={handleSubmit}>
          <h2>Place your order</h2>
          <CustomerInfoForm
            customerInfo={customerInfo}
            handleCustomerInfoChange={handleCustomerInfoChange}
            formState={formState}
            resetErrors={resetErrors}
            checkValidation={checkValidation}
          />

          <PizzaCustomizationForm
            pizzaOrder={pizzaOrder}
            setPizzaOrder={setPizzaOrder}
            formState={formState}
            checkValidation={checkValidation}
            setFormState={setFormState}
          />

          <OrderSummary pizzaOrder={pizzaOrder} customerInfo={customerInfo} />

          <button
            type="submit"
            className="submit-btn"
            disabled={formState.isSubmiting}
          >
            {formState.isSubmiting ? (
              <>
                <span className="loading-spinner"></span>
                Placing Order...
              </>
            ) : (
              `Place Order - $${calculateTotalPrice(pizzaOrder, customerInfo)}`
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default App;
