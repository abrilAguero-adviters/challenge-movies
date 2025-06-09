import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Image } from "./Image";

describe("Image", () => {
  it("renders image with correct props", () => {
    render(<Image src="/test-image.jpg" alt="Test Image" />);

    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveClass("w-full", "h-full", "object-cover");
  });

  it("applies custom className", () => {
    render(
      <Image src="/test-image.jpg" alt="Test Image" className="custom-class" />
    );

    const image = screen.getByAltText("Test Image");
    expect(image).toHaveClass("custom-class");
  });

  it("handles image error and shows fallback", () => {
    render(
      <Image
        src="/invalid-image.jpg"
        alt="Test Image"
        fallbackSrc="/fallback.jpg"
      />
    );

    const image = screen.getByAltText("Test Image");

    // Simular error de carga
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/fallback.jpg");
    expect(image).toHaveClass("opacity-70", "grayscale-30");
  });

  it("uses default fallback when not provided", () => {
    render(<Image src="/invalid-image.jpg" alt="Test Image" />);

    const image = screen.getByAltText("Test Image");

    // Simular error de carga
    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/placeholder-movie.svg");
  });

  it("handles successful image load", () => {
    render(<Image src="/test-image.jpg" alt="Test Image" />);

    const image = screen.getByAltText("Test Image");

    // Simular carga exitosa
    fireEvent.load(image);

    expect(image).not.toHaveClass("opacity-70", "grayscale-30");
  });

  it("prevents infinite error loop", () => {
    render(
      <Image
        src="/invalid-image.jpg"
        alt="Test Image"
        fallbackSrc="/also-invalid.jpg"
      />
    );

    const image = screen.getByAltText("Test Image");

    // Simular error múltiples veces
    fireEvent.error(image);
    fireEvent.error(image);
    fireEvent.error(image);

    // Solo debería cambiar una vez al fallback
    expect(image).toHaveAttribute("src", "/also-invalid.jpg");
  });

  it("passes through additional props", () => {
    render(
      <Image
        src="/test-image.jpg"
        alt="Test Image"
        data-testid="test-image"
        width={300}
        height={200}
      />
    );

    const image = screen.getByTestId("test-image");
    expect(image).toHaveAttribute("data-testid", "test-image");
    expect(image).toHaveAttribute("width", "300");
    expect(image).toHaveAttribute("height", "200");
  });

  it("maintains transition classes", () => {
    render(<Image src="/test-image.jpg" alt="Test Image" />);

    const image = screen.getByAltText("Test Image");
    expect(image).toHaveClass("transition-opacity", "duration-300");
  });
});
