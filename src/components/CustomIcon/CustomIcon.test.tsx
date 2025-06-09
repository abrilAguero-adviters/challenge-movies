import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CustomIcon from "./CustomIcon";

describe("CustomIcon", () => {
  it("renders icon with correct props", () => {
    render(<CustomIcon src="/test-icon.png" size={24} alt="Test Icon" />);

    const icon = screen.getByAltText("Test Icon icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/test-icon.png");
    expect(icon).toHaveClass("w-[24px]");
    expect(icon).toHaveClass("h-[24px]");
  });

  it("renders empty div when no src provided", () => {
    render(<CustomIcon src="" size={32} alt="Empty Icon" />);

    const emptyDivs = screen.getAllByRole("generic");
    const targetDiv = emptyDivs.find(
      (div) => div.style.width === "32px" && div.style.height === "32px"
    );
    expect(targetDiv).toBeInTheDocument();
    expect(targetDiv).toHaveStyle({ width: "32px", height: "32px" });
  });

  it("applies custom imgClassName", () => {
    render(
      <CustomIcon
        src="/test-icon.png"
        size={16}
        alt="Custom Icon"
        imgClassName="custom-icon-class"
      />
    );

    const icon = screen.getByAltText("Custom Icon icon");
    expect(icon).toHaveClass("custom-icon-class");
  });

  it("handles different sizes correctly", () => {
    const { rerender } = render(
      <CustomIcon src="/test-icon.png" size={16} alt="Small Icon" />
    );

    let icon = screen.getByAltText("Small Icon icon");
    expect(icon).toHaveClass("w-[16px]");
    expect(icon).toHaveClass("h-[16px]");

    rerender(<CustomIcon src="/test-icon.png" size={48} alt="Large Icon" />);
    icon = screen.getByAltText("Large Icon icon");
    expect(icon).toHaveClass("w-[48px]");
    expect(icon).toHaveClass("h-[48px]");
  });

  it("generates correct alt text", () => {
    render(<CustomIcon src="/test-icon.png" size={24} alt="Play" />);

    const icon = screen.getByAltText("Play icon");
    expect(icon).toBeInTheDocument();
  });

  it("handles undefined alt text", () => {
    render(<CustomIcon src="/test-icon.png" size={24} />);

    const icon = screen.getByAltText("undefined icon");
    expect(icon).toBeInTheDocument();
  });
});
