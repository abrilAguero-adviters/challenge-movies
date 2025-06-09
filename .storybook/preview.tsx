import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import React from "react";
import "../src/index.css";

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#171719",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <div className="font-quicksand bg-dark-primary text-white min-h-screen">
        <Story />
      </div>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
