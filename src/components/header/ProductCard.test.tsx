import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import "@testing-library/jest-dom";

describe("ProductCard", () => {
  const mockProps = {
    name: "Test Product",
    price: 9.99,
    image: "/test-image.png",
  };

  it("renders product information correctly", () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    
    const image = screen.getByRole("img", { name: /Test Product/i });
    expect(image).toBeInTheDocument();
    // Next/Image modifies src, so we check if the attr contains the image name
    expect(image).toHaveAttribute("src"); 
  });
});
