import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import Index from "../pages/index";

describe("Main Page", () => {
  it("renders a heading", () => {
    render(<Index />, { wrapper: ChakraProvider });

    const heading = screen.getByText("The URL is too long? Make it short!");

    expect(heading).toBeInTheDocument();
  });
  it("renders the default state", () => {
    render(<Index />, { wrapper: ChakraProvider });
    const url = screen.getByPlaceholderText("url") as HTMLInputElement;
    const domain = screen.getByDisplayValue("yehez.tiny.us") as HTMLSelectElement;
    const alias = screen.getByPlaceholderText("alias (optional)") as HTMLInputElement;
    const submitButton = screen.getByText("Submit");
    expect(url.value).toBe("");
    expect(domain.value).toBe("yehez.tiny.us");
    expect(alias.value).toBe("");
    expect(submitButton).toBeDisabled();
  });
});
