import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { MockedProvider } from '@apollo/client/testing';
import Product from "../pages/product";
import { GET_PRODUCTS } from "../queries";
import { vi } from "vitest";
import Layout from "../components/layout";

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

const handleUpdate = vi.fn((quantity) => {
  const currentCart = parseInt(localStorage.getItem('cartItems') || '0', 10);
  const updatedCart = currentCart + quantity;
  localStorage.setItem('cartItems', updatedCart.toString());
});

test("displays an error message when the query fails", async () => {
  const { getByText } = render(<MockedProvider mocks={errorMocks} addTypename={false}>
    <Product updateCart={handleUpdate} cartItems={0} />
  </MockedProvider>);

  await waitForElementToBeRemoved(() => getByText('Loading...'));
  expect(getByText("Error: Something went wrong")).toBeInTheDocument();
});

test("should be able to increase and decrease product quantity", async () => {
  const { getByText, getByTitle } = render(<MockedProvider mocks={mocks} addTypename={false}>
    <Product updateCart={handleUpdate} cartItems={0} />
  </MockedProvider>);

  await waitForElementToBeRemoved(() => getByText('Loading...'));
  const increaseQuantity = getByText("+");

  const currentQuantity = getByTitle("Current quantity");
  expect(currentQuantity).toHaveTextContent("1");

  fireEvent.click(increaseQuantity);
  expect(currentQuantity).toHaveTextContent("2");

  const decreaseQuantity = getByText("-");

  fireEvent.click(decreaseQuantity);
  expect(currentQuantity).toHaveTextContent("1");
});

test("should be able to add items to the basket", async () => {
  localStorage.setItem('cartItems', '0'); // Assume cart starts with 0 items
  let localStorageItem = Number(localStorage.getItem('cartItems'));
  const { getByText, getByTitle, rerender } = render(<MockedProvider mocks={mocks} addTypename={false}>
    <Layout cartItems={localStorageItem} clearCart={() => {}}>
      <Product updateCart={handleUpdate} cartItems={localStorageItem} />
    </Layout>
  </MockedProvider>);

  await waitForElementToBeRemoved(() => getByText('Loading...'));
  const increaseQuantity = getByText("+");
  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);

  const currentQuantity = getByTitle("Current quantity");
  expect(currentQuantity).toHaveTextContent("4");

  const addToBasketElement = getByText("Add to cart");
  fireEvent.click(addToBasketElement);

  rerender(<MockedProvider mocks={mocks} addTypename={false}>
    <Layout cartItems={Number(localStorage.getItem('cartItems'))} clearCart={() => {}}>
      <Product updateCart={() => handleUpdate(currentQuantity)} cartItems={Number(localStorage.getItem('cartItems'))} />
    </Layout>
  </MockedProvider>);

  const basketItems = getByTitle("Basket items");
  expect(basketItems).toHaveTextContent("4");
});
