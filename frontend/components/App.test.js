import React from 'react'
import AppClass from './AppClass'
import { render, fireEvent, screen, getAllByRole } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})


test("Renders without Errors", () => {
  render(<AppClass />)
})

test("KeyPad Renders and has 5 children", () => {
  render(<AppClass />)

  const keypad = document.querySelector("#keypad")
  const keyPad2 = getAllByRole(keypad, "button")

  expect(keyPad2).toHaveLength(5)
})

test("Email Input Renders", () => {
  render(<AppClass />)

  const emailInput = screen.getByPlaceholderText(/type email/i);

  expect(emailInput).toBeInTheDocument();
})

test("Coordinates Text Renders", () => {
  render(<AppClass />)

  const coordsText = screen.queryByText(/Coordinates/i)

  expect(coordsText).toBeInTheDocument();
})

test("Typing in emailInput works", () => {
  render(<AppClass />)

  const emailInput = screen.getByPlaceholderText(/type email/i);
  expect(emailInput.value).toBe("")
  fireEvent.change(emailInput, {target: {value: "foo@gmail.com"}})
  expect(emailInput.value).toBe("foo@gmail.com")
})

