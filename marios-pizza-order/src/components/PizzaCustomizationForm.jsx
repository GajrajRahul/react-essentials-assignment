import { SIDES, TOPPINGS } from "../utils/constants";

const PizzaCustomizationForm = ({
  pizzaOrder,
  setPizzaOrder,
  formState,
  checkValidation,
  setFormState,
}) => {
  return (
    <section className="pizza-customization">
      <h3>Build Your Pizza</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="form-group" style={{ width: "100%" }}>
          <label htmlFor="pizza-size">Pizza Size</label>
          <select
            name="size"
            id="pizza-size"
            value={pizzaOrder.size}
            onChange={(e) =>
              setPizzaOrder((prev) => ({ ...prev, size: e.target.value }))
            }
          >
            <option value="small">Small 10" - $12.99</option>
            <option value="mdeium">Medium 12" - $15.99</option>
            <option value="large">Large 14" - $18.99</option>
            <option value="xlarge">X-Large 16" - $21.99</option>
          </select>
        </div>
        <div className="form-group" style={{ width: "100%" }}>
          <label htmlFor="pizza-crust">Crust Type</label>
          <select
            name="crust"
            id="pizza-crust"
            value={pizzaOrder.crust}
            onChange={(e) =>
              setPizzaOrder((prev) => ({
                ...prev,
                crust: e.target.value,
              }))
            }
          >
            <option value="regular">Regular</option>
            <option value="thin">Thin (+$1.00)</option>
            <option value="thick">Thick (+$2.00)</option>
            <option value="stuffed">Stuffeed (+$3.00)</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <fieldset>
          <legend>Your Toppings ( Each +$1.50)</legend>
          <div
            className={`${formState.currentErrors.toppings ? "error" : ""} toppings-grid`}
            onBlur={checkValidation}
          >
            {TOPPINGS.map((topping) => (
              <label key={topping} className="topping-option">
                <input
                  type="checkbox"
                  name="toppings"
                  value={topping}
                  checked={pizzaOrder.toppings.includes(topping)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPizzaOrder((prev) => ({
                        ...prev,
                        toppings: [...prev.toppings, topping],
                      }));
                    } else {
                      setPizzaOrder((prev) => ({
                        ...prev,
                        toppings: prev.toppings.filter((t) => t !== topping),
                      }));
                    }
                    if (formState.currentErrors.toppings) {
                      setFormState((prev) => ({
                        ...prev,
                        currentErrors: {
                          ...prev.currentErrors,
                          toppings: "",
                        },
                      }));
                    }
                  }}
                />
                {topping.charAt(0).toUpperCase() + topping.slice(1)}
              </label>
            ))}
          </div>
          {formState.currentErrors.toppings && (
            <span className="error-message">
              {formState.currentErrors.toppings}
            </span>
          )}
        </fieldset>
      </div>
      <div className="form-group">
        <fieldset>
          <legend>Your Sides ( Each +$2.50)</legend>
          <div
            className={`${formState.currentErrors.sides ? "error" : ""} sides-grid`}
            onBlur={checkValidation}
          >
            {SIDES.map((side) => (
              <label key={side} className="side-option">
                <input
                  type="checkbox"
                  name="sides"
                  value={side}
                  checked={pizzaOrder.sides.includes(side)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPizzaOrder((prev) => ({
                        ...prev,
                        sides: [...prev.sides, side],
                      }));
                    } else {
                      setPizzaOrder((prev) => ({
                        ...prev,
                        sides: prev.sides.filter((t) => t !== side),
                      }));
                    }
                    if (formState.currentErrors.sides) {
                      setFormState((prev) => ({
                        ...prev,
                        currentErrors: {
                          ...prev.currentErrors,
                          sides: "",
                        },
                      }));
                    }
                  }}
                />
                {side.charAt(0).toUpperCase() + side.slice(1)}
              </label>
            ))}
          </div>
          {formState.currentErrors.sides && (
            <span className="error-message">
              {formState.currentErrors.sides}
            </span>
          )}
        </fieldset>
      </div>
      <div className="form-group">
        <label htmlFor="special-instruction">
          Special Insruction (Optional)
        </label>
        <textarea
          id="special-instructions"
          name="specialInstructions"
          value={pizzaOrder.specialInstructions}
          onChange={(e) =>
            setPizzaOrder((prev) => ({
              ...prev,
              specialInstructions: e.target.value,
            }))
          }
          placeholder="Any special request > (e.g. extra crispy, light sauce, well done)!"
          rows="3"
          maxLength="200"
        />
        <small className="character-count">
          {pizzaOrder.specialInstructions.length}/200 characters
        </small>
      </div>
    </section>
  );
};

export default PizzaCustomizationForm
