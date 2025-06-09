import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";

// Componente que lanza un error para testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>Normal content</div>;
};

// Mock de window.location.reload
const mockReload = vi.fn();
Object.defineProperty(window, "location", {
  value: { reload: mockReload },
  writable: true,
});

// Mock de console.error
const mockConsoleError = vi
  .spyOn(console, "error")
  .mockImplementation(() => {});

describe("ErrorBoundary", () => {
  beforeEach(() => {
    mockReload.mockClear();
    mockConsoleError.mockClear();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders error UI when there is an error", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("¡Oops! Algo salió mal")).toBeInTheDocument();
    expect(
      screen.getByText("Ha ocurrido un error inesperado en la aplicación.")
    ).toBeInTheDocument();
    expect(screen.getByText("Recargar página")).toBeInTheDocument();
  });

  it("shows error details when error is available", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Detalles del error")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("calls window.location.reload when reload button is clicked", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByText("Recargar página");
    fireEvent.click(reloadButton);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it("logs error to console when error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(mockConsoleError).toHaveBeenCalledWith(
      "ErrorBoundary caught an error:",
      expect.any(Error),
      expect.any(Object)
    );
  });

  it("handles multiple errors correctly", () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal content")).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("¡Oops! Algo salió mal")).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Buscar el contenedor principal que tiene las clases de pantalla completa
    const errorContainer = screen
      .getByText("¡Oops! Algo salió mal")
      .closest('div[class*="min-h-screen"]');
    expect(errorContainer).toHaveClass(
      "min-h-screen",
      "bg-dark-primary",
      "text-white"
    );

    // Buscar la tarjeta de error
    const errorCard = screen
      .getByText("¡Oops! Algo salió mal")
      .closest('div[class*="max-w-md"]');
    expect(errorCard).toHaveClass(
      "max-w-md",
      "p-8",
      "bg-gray-900",
      "rounded-lg"
    );
  });
});
