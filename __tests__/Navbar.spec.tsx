import "@testing-library/jest-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import { render, screen } from "@testing-library/react";

import Navbar from "../components/shared/navbar";

describe("Navbar", () => {
  it("renders a signup button", () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    render(<Navbar />, { wrapper });

    const signupBtn = screen.getByTestId("get-started");
    expect(signupBtn).toBeInTheDocument();
  });
});
