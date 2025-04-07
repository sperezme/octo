import { render, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { MockedProvider } from '@apollo/client/testing';
import Product from "../pages/product";
import { GET_PRODUCTS } from "../queries";

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

test("should be trigger and triggers error message", async () => {
  const { getByText } = render(<MockedProvider mocks={errorMocks} addTypename={false}><Product /></MockedProvider>);

  await waitForElementToBeRemoved(() => getByText('Loading...'));
  expect(getByText("Error: Something went wrong")).toBeInTheDocument();
});

test("should be able to increase and decrease product quantity", async () => {
  const { getByText, getByTitle } = render(<MockedProvider mocks={mocks} addTypename={false}><Product /></MockedProvider>);

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
  const { getByText, getByTitle } = render(<MockedProvider mocks={mocks} addTypename={false}><Product /></MockedProvider>);

  await waitForElementToBeRemoved(() => getByText('Loading...'));
  const increaseQuantity = getByText("+");

  const currentQuantity = getByTitle("Current quantity");

  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);

  expect(currentQuantity).toHaveTextContent("4");

  const addToBasketElement = getByText("Add to cart");
  fireEvent.click(addToBasketElement);

  const basketItems = getByTitle("Basket items");
  expect(basketItems).toHaveTextContent("4");
});
