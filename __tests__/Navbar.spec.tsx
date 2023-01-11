import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Navbar from "../components/shared/navbar";

describe("Navbar", () => {
  it("renders a signup button", () => {
    render(<Navbar />);
    const signupBtn = screen.getByTestId("get-started");
    expect(signupBtn).toBeInTheDocument();
  });
});
