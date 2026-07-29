import { calculateTotalPrice, getItemPrice } from "../utils/functions";

const OrderSummary = ({ pizzaOrder, customerInfo }) => {
  return (
    <section className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-item">
        <span className="item-name">
          {pizzaOrder.size.charAt(0).toUpperCase() + pizzaOrder.size.slice(1)}{" "}
          Pizza ({pizzaOrder.crust} Crust)
        </span>
        <span className="item-price">${getItemPrice(pizzaOrder)}</span>
        {pizzaOrder.toppings.length > 0 && (
          <div className="summary-item">
            <span className="item-name">
              Toppings: {pizzaOrder.toppings.join(", ")}
            </span>
            <span className="item-price">
              ${(pizzaOrder.toppings.length * 1.5).toFixed(2)}
            </span>
          </div>
        )}
        {pizzaOrder.sides.length > 0 && (
          <div className="summary-item">
            <span className="item-name">
              Sides: {pizzaOrder.sides.join(", ")}
            </span>
            <span className="item-price">
              ${(pizzaOrder.sides.length * 2.5).toFixed(2)}
            </span>
          </div>
        )}
      </div>
      {customerInfo.isDelivery && (
        <div className="summary-item">
          <span className="item-name">Delivery Fee</span>
          <span className="item-price">$2.99</span>
        </div>
      )}
      <div className="summary-total">
        <span className="total-label">Total:</span>
        <span className="total-price">
          ${calculateTotalPrice(pizzaOrder, customerInfo)}
        </span>
      </div>
      {customerInfo.name && (
        <div className="customer-detailed">
          <p>
            <strong>Customer: </strong>
            {customerInfo.name}
          </p>
          {customerInfo.phone && (
            <p>
              <strong>Phone: </strong>
              {customerInfo.phone}
            </p>
          )}
          {customerInfo.isDelivery ? (
            <p>
              <strong>Deliver to: </strong>
              {customerInfo.address || "Address needed"}
            </p>
          ) : (
            <p>
              <strong>Pickup</strong> at Mario's Pizza (Est. 20-30 minites)
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default OrderSummary;
