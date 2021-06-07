import React from "react";
import Counter from "./Counter";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

var getByTestId;

beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

test("header renders with correct text", () => {
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("My Counter");
});

test("counter initially start with text of 0", () => {
  const counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
});

test("imput contains initial value of 1", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");
});

test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn");
  expect(addBtn.textContent).toBe("+");
});

test("subtract button renders with -", () => {
  const SubtractBtn = getByTestId("subtract-btn");
  expect(SubtractBtn.textContent).toBe("-");
});

test("change value of input works correctly", () => {
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, { target: { value: "5" } });
  expect(inputEl.value).toBe("5");
});

test("click on plus btn adds 1 to counter", () => {
  const btnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
  fireEvent.click(btnEl);
  expect(counterEl.textContent).toBe("1");
});

test("click on subtract btn subtracts 1 to counter", () => {
  const subtractBtnEl = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
  fireEvent.click(subtractBtnEl);
  expect(counterEl.textContent).toBe("-1");
});

test("changing de input value then clicking on add btn works correctly", () => {
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, { target: { value: "5" } });
  fireEvent.click(addBtnEl);
  expect(counterEl.textContent).toBe("5");
});

test("changing de input value then clicking on subtract btn works correctly", () => {
  const subtractBtnEl = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, { target: { value: "5" } });
  fireEvent.click(subtractBtnEl);
  expect(counterEl.textContent).toBe("-5");
});

test("adding and then subtracting leads to the correct counter number", () => {
  const addBtnEl = getByTestId("add-btn");
  const subtractBtnEl = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  fireEvent.change(inputEl, { target: { value: "10" } });
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  expect(counterEl.textContent).toBe("20");

  fireEvent.change(inputEl, { target: { value: "5" } });
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(addBtnEl);
  expect(counterEl.textContent).toBe("15");
});

test("couter contains correct className", () => {
  const addBtnEl = getByTestId("add-btn");
  const subtractBtn = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  expect(counterEl.className).toBe("");

  fireEvent.change(inputEl, { target: { value: "100" } });
  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("green");

  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("green");

  fireEvent.click(subtractBtn);
  fireEvent.click(subtractBtn);
  expect(counterEl.className).toBe("");

  fireEvent.click(subtractBtn);
  expect(counterEl.className).toBe("red");

  fireEvent.click(subtractBtn);
  expect(counterEl.className).toBe("red");
});
