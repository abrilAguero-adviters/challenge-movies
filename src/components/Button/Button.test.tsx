import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button label="Test Button" />);

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-dark-secondary");
    expect(button).toHaveClass("text-base");
  });

  it("renders as primary button", () => {
    render(<Button label="Primary Button" primary={true} />);

    const button = screen.getByRole("button", { name: "Primary Button" });
    expect(button).toHaveClass("bg-accent-primary");
    expect(button).toHaveClass("text-white");
  });

  it("applies different sizes correctly", () => {
    const { rerender } = render(<Button label="Small Button" size="small" />);

    let button = screen.getByRole("button", { name: "Small Button" });
    expect(button.className).toContain("text-xs");
    expect(button.className).toContain("px-2");
    expect(button.className).toContain("py-1");

    rerender(<Button label="Large Button" size="large" />);
    button = screen.getByRole("button", { name: "Large Button" });
    expect(button.className).toContain("text-lg");
    expect(button.className).toContain("px-6");
    expect(button.className).toContain("py-3");
  });

  it("calls onClick when clicked", () => {
    const mockOnClick = vi.fn();
    render(<Button label="Clickable Button" onClick={mockOnClick} />);

    const button = screen.getByRole("button", { name: "Clickable Button" });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Button label="Custom Button" className="custom-class" />);

    const button = screen.getByRole("button", { name: "Custom Button" });
    expect(button).toHaveClass("custom-class");
  });

  it("applies custom backgroundColor", () => {
    render(<Button label="Colored Button" backgroundColor="bg-red-500" />);

    const button = screen.getByRole("button", { name: "Colored Button" });
    expect(button).toHaveClass("bg-red-500");
  });

  it("has correct button type", () => {
    render(<Button label="Type Button" />);

    const button = screen.getByRole("button", { name: "Type Button" });
    expect(button).toHaveAttribute("type", "button");
  });
});
