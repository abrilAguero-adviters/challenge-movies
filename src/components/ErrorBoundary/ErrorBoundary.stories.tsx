import type { Meta, StoryObj } from "@storybook/react";
import { ErrorBoundary } from "./ErrorBoundary";

const meta: Meta<typeof ErrorBoundary> = {
  title: "Componentes/ErrorBoundary",
  component: ErrorBoundary,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "El componente ErrorBoundary es un límite de error de React que captura errores en cualquier parte del árbol de componentes hijo, registra esos errores y muestra una interfaz de fallback en lugar del árbol de componentes que falló.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

// Componente que lanza un error
const ThrowError = () => {
  throw new Error("Este es un error de ejemplo");
};

// Componente que no lanza error
const NormalComponent = () => (
  <div className="p-4 bg-gray-800 rounded-lg">
    <h3 className="text-white text-lg">Componente Normal</h3>
    <p className="text-gray-400">Este componente no lanza ningún error.</p>
  </div>
);

export const WithError: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  ),
};

export const WithoutError: Story = {
  render: () => (
    <ErrorBoundary>
      <NormalComponent />
    </ErrorBoundary>
  ),
};

export const NestedError: Story = {
  render: () => (
    <ErrorBoundary>
      <div className="space-y-4">
        <NormalComponent />
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-white text-lg">Componente Padre</h3>
          <ThrowError />
        </div>
      </div>
    </ErrorBoundary>
  ),
};
