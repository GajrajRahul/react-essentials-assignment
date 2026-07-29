export const getItemPrice = (pizzaOrder) => {
  const sizePrices = {
    small: 12.99,
    medium: 15.99,
    large: 18.99,
    xlarge: 21.99,
  };
  const crustPrices = {
    regular: 0,
    thin: 1.0,
    thick: 2.0,
    stuffed: 3.0,
  };
  return (sizePrices[pizzaOrder.size] + crustPrices[pizzaOrder.crust]).toFixed(
    2,
  );
};

export const calculateTotalPrice = (pizzaOrder, customerInfo) => {
  let total = 0;
  const sizePrices = {
    small: 12.99,
    medium: 15.99,
    large: 18.99,
    xlarge: 21.99,
  };

  total += sizePrices[pizzaOrder.size];

  const crustPrize = {
    regular: 0,
    thin: 1.0,
    thick: 2.0,
    stuffed: 3.0,
  };

  total += crustPrize[pizzaOrder.crust];
  total += pizzaOrder.toppings.length * 1.5;
  total += pizzaOrder.sides.length * 2.5;

  if (customerInfo.isDelivery) {
    total += 2.99;
  }

  return total.toFixed(2);
};
