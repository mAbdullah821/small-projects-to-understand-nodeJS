export const orderTotal = async (fetch, cart) => {
  const orders = cart.orders;

  let vat = null;
  if (cart.countryCode) {
    const jsonInfo = await fetch(
      'https://jsonplaceholder.typicode.com/todos/' + cart.countryCode
    );
    const info = await jsonInfo.json();
    vat = info.id;
  }

  const notShippingOrders = orders.filter((order) => !order.shipping);
  const ordersCost = notShippingOrders.reduce(
    (acc, cur) => acc + cur.price * (cur.quantity || 1),
    0
  );

  const shippingCost = orders.find((order) => order.shipping)?.shipping ?? 0;

  let totalCost = ordersCost + shippingCost;

  if (vat) totalCost = Math.round(totalCost * (1 + vat / 100));

  return totalCost;
};
