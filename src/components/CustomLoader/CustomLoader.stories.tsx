import type { Meta, StoryObj } from "@storybook/react";
import CustomLoader from "./CustomLoader";

const meta: Meta<typeof CustomLoader> = {
  title: "Componentes/CustomLoader",
  component: CustomLoader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "El componente CustomLoader muestra un indicador de carga animado que consiste en tres barras pulsantes. Se utiliza para indicar estados de carga en la aplicación.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomLoader>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4 p-4 bg-dark-primary">
      <CustomLoader />
    </div>
  ),
};

export const WithCustomContainer: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg">
      <h3 className="text-white mb-4">Cargando contenido...</h3>
      <CustomLoader />
    </div>
  ),
};

export const InGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-4 bg-dark-primary">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="p-4 bg-gray-800 rounded-lg">
          <CustomLoader />
        </div>
      ))}
    </div>
  ),
};
