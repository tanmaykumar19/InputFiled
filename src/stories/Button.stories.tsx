import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: "Primary Button" } };
export const Secondary: Story = { args: { children: "Secondary Button", variant: "secondary" } };
export const Ghost: Story = { args: { children: "Ghost Button", variant: "ghost" } };
export const Loading: Story = { args: { children: "Loading", loading: true } };
export const Disabled: Story = { args: { children: "Disabled", disabled: true } };
