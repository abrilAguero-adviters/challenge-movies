import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CustomLoader from "./CustomLoader";

describe("CustomLoader", () => {
  it("renders three skeleton elements", () => {
    render(<CustomLoader />);

    const skeletonElements = screen
      .getAllByRole("generic")
      .filter((el) => el.className.includes("animate-pulse"));
    expect(skeletonElements).toHaveLength(3);
  });

  it("skeleton elements have correct styling", () => {
    render(<CustomLoader />);

    const skeletonElements = screen
      .getAllByRole("generic")
      .filter((el) => el.className.includes("animate-pulse"));

    skeletonElements.forEach((element) => {
      expect(element).toHaveClass("h-8");
      expect(element).toHaveClass("bg-gray-700");
      expect(element).toHaveClass("rounded-full");
      expect(element).toHaveClass("animate-pulse");
    });
  });

  it("renders consistently on multiple renders", () => {
    const { rerender } = render(<CustomLoader />);

    let firstRender = screen
      .getAllByRole("generic")
      .filter((el) => el.className.includes("animate-pulse"));
    expect(firstRender).toHaveLength(3);

    rerender(<CustomLoader />);

    let secondRender = screen
      .getAllByRole("generic")
      .filter((el) => el.className.includes("animate-pulse"));
    expect(secondRender).toHaveLength(3);
  });

  it("skeleton elements are properly structured", () => {
    render(<CustomLoader />);

    const skeletonElements = screen
      .getAllByRole("generic")
      .filter((el) => el.className.includes("animate-pulse"));

    // Verificar que todos los elementos tienen la estructura correcta
    skeletonElements.forEach((element) => {
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass(
        "h-8",
        "bg-gray-700",
        "rounded-full",
        "animate-pulse"
      );
    });
  });

  it("has correct number of skeleton elements", () => {
    const { container } = render(<CustomLoader />);

    // Verificar que se renderizan exactamente 3 elementos skeleton
    const skeletonElements = container.querySelectorAll(
      'div[class*="animate-pulse"]'
    );
    expect(skeletonElements).toHaveLength(3);
  });
});
