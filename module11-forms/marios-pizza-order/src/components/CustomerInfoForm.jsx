const CustomerInfoForm = ({
  customerInfo,
  handleCustomerInfoChange,
  formState,
  resetErrors,
  checkValidation,
}) => {
  return (
    <section className="customer-info">
      <h3>Customer Information</h3>
      <div className="form-group">
        <label htmlFor="customer-name">Full Name</label>
        <input
          type="text"
          id="customer-name"
          name="name"
          value={customerInfo.name}
          onChange={(e) => {
            handleCustomerInfoChange("name", e.target.value);
            if (formState.currentErrors.name) {
              resetErrors("name");
            }
          }}
          onBlur={checkValidation}
          className={formState.currentErrors.name ? "error" : ""}
          placeholder="Enter your full name"
        />
        {formState.currentErrors.name && (
          <span className="error-message">{formState.currentErrors.name}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="customer-phone">Phone Number</label>
        <input
          type="tel"
          id="customer-phone"
          name="phone"
          value={customerInfo.phone}
          onChange={(e) => {
            handleCustomerInfoChange("phone", e.target.value);
            if (formState.currentErrors.phone) {
              resetErrors("phone");
            }
          }}
          onBlur={checkValidation}
          className={formState.currentErrors.phone ? "error" : ""}
          placeholder="(+91) 123-45678"
        />
        {formState.currentErrors.phone && (
          <span className="error-message">{formState.currentErrors.phone}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="customer-email">Email Address</label>
        <input
          type="email"
          id="customer-email"
          name="email"
          value={customerInfo.email}
          onChange={(e) => {
            handleCustomerInfoChange("email", e.target.value);
            if (formState.currentErrors.email) {
              resetErrors("email");
            }
          }}
          onBlur={checkValidation}
          className={formState.currentErrors.email ? "error" : ""}
          placeholder="your.email@example.com"
        />
        {formState.currentErrors.email && (
          <span className="error-message">{formState.currentErrors.email}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="customer-address">Delivery Address</label>
        <textarea
          type="text"
          id="customer-address"
          name="address"
          value={customerInfo.address}
          onChange={(e) => {
            handleCustomerInfoChange("address", e.target.value);
            if (formState.currentErrors.address) {
              resetErrors("address");
            }
          }}
          onBlur={checkValidation}
          className={formState.currentErrors.address ? "error" : ""}
          placeholder="123 Main St, Brooklyn, NY 10001"
          rows="3"
        />
        {formState.currentErrors.address && (
          <span className="error-message">
            {formState.currentErrors.address}
          </span>
        )}
      </div>
      <div className="form-group">
        <fieldset>
          <legend>Order Type</legend>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="orderType"
                value="delivery"
                checked={customerInfo.isDelivery}
                onChange={() => handleCustomerInfoChange("isDelivery", true)}
              />
              Delivery (45-60 minutes)
            </label>
            <label>
              <input
                type="radio"
                name="orderType"
                value="pickup"
                checked={!customerInfo.isDelivery}
                onChange={() =>
                  handleCustomerInfoChange((prev) => ({
                    ...prev,
                    isDelivery: false,
                  }))
                }
              />
              Pickup (20-30 minutes)
            </label>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default CustomerInfoForm;
