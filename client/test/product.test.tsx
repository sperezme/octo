import { render, fireEvent, waitForElementToBeRemoved, act } from "@testing-library/react";
import React from "react";
import { MockedProvider } from '@apollo/client/testing';
import Product from "../pages/product";
import { GET_PRODUCTS } from "../queries";
import Layout from "../components/layout";
import { renderHook } from "@testing-library/react-hooks";
import { useCart } from "../hooks";

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: { id: '1' },
    },
    result: {
      data: {
        Product: {
          id: "1",
          name: "Energy saving light bulb",
          power: "25W",
          description: "Available in 7 watts, 9 watts, 11 watts Spiral Light bulb in B22, bulb switches on instantly, no wait around warm start and flicker free features make for a great all purpose bulb",
          price: 12.99,
          quantity: 4,
          brand: "Philips",
          weight: 77,
          height: 12.6,
          width: 6.2,
          length: 6.2,
          model_code: "E27 ES",
          colour: "Cool daylight",
          img_url: "https://i.ibb.co/2nzwxnQ/bulb.png"
        }
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: { id: '1' },
    },
    error: new Error('Something went wrong'),
  },
];

test("displays an error message when the query fails", async () => {
  const { result } = renderHook(() => useCart());
  const { getByText } = render(<MockedProvider mocks={errorMocks} addTypename={false}>
    <Product updateCart={result.current.updateCart} cartItems={0} />
  </MockedProvider>);

  await waitForElementToBeRemoved(() => getByText('Loading...'));
  expect(getByText("Error: Something went wrong")).toBeInTheDocument();
});

test("should be able to increase and decrease product quantity", async () => {
  const { getByText, getByTitle } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Product updateCart={() => { }} cartItems={0} />
    </MockedProvider>
  );

  await waitForElementToBeRemoved(() => getByText('Loading...'));

  const currentQuantity = getByTitle("Current quantity");
  expect(currentQuantity).toHaveTextContent("1");

  fireEvent.click(getByText("+"));
  expect(currentQuantity).toHaveTextContent("2");

  fireEvent.click(getByText("-"));
  expect(currentQuantity).toHaveTextContent("1");
});


test("should be able to add and delete items to the basket", async () => {
  localStorage.setItem('cartItems', '0');

  const { result } = renderHook(() => useCart());

  const CartWrapper = () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <Layout cartItems={result.current.cartItems} clearCart={result.current.clearCart}>
        <Product updateCart={result.current.updateCart} cartItems={result.current.cartItems} />
      </Layout>
    </MockedProvider>
  );

  const { getByText, getByTitle, rerender } = render(<CartWrapper />);

  await waitForElementToBeRemoved(() => getByText('Loading...'));

  const currentQuantity = getByTitle("Current quantity");

  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("+"));

  expect(currentQuantity).toHaveTextContent("4");

  // User clicks "Add to cart" (internally calls updateCart(4))
  fireEvent.click(getByText("Add to cart"));

  rerender(<CartWrapper />);

  const basketItems = getByTitle("Basket items");
  expect(basketItems).toHaveTextContent("4");

  act(() => {
    result.current.clearCart();
  });

  rerender(<CartWrapper />);
  expect(basketItems).toHaveTextContent("0");
});
