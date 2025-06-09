import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlayButton } from "./PlayButton";

describe("PlayButton", () => {
  it("renders with icon and default styling", () => {
    const mockIcon = <span data-testid="play-icon">▶</span>;
    const mockOnClick = vi.fn();

    render(<PlayButton icon={mockIcon} onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    const icon = screen.getByTestId("play-icon");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(button).toHaveClass("bg-gray-400", "rounded-full", "w-8", "h-8");
  });

  it("calls onClick when clicked", () => {
    const mockIcon = <span>▶</span>;
    const mockOnClick = vi.fn();

    render(<PlayButton icon={mockIcon} onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const mockIcon = <span>▶</span>;
    const mockOnClick = vi.fn();

    render(
      <PlayButton
        icon={mockIcon}
        onClick={mockOnClick}
        className="custom-class"
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("passes through additional props", () => {
    const mockIcon = <span>▶</span>;
    const mockOnClick = vi.fn();

    render(
      <PlayButton
        icon={mockIcon}
        onClick={mockOnClick}
        data-testid="play-button"
        disabled={true}
      />
    );

    const button = screen.getByTestId("play-button");
    expect(button).toHaveAttribute("data-testid", "play-button");
    expect(button).toBeDisabled();
  });

  it("has correct hover styling", () => {
    const mockIcon = <span>▶</span>;
    const mockOnClick = vi.fn();

    render(<PlayButton icon={mockIcon} onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-gray-500");
  });

  it("has correct transition classes", () => {
    const mockIcon = <span>▶</span>;
    const mockOnClick = vi.fn();

    render(<PlayButton icon={mockIcon} onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("transition-all", "duration-300");
  });

  it("renders different icons correctly", () => {
    const pauseIcon = <span data-testid="pause-icon">⏸</span>;
    const mockOnClick = vi.fn();

    render(<PlayButton icon={pauseIcon} onClick={mockOnClick} />);

    const icon = screen.getByTestId("pause-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent("⏸");
  });
});
