// src/stories/InputField.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "This is a helper text",
  },
};

export const Invalid: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    invalid: true,
    errorMessage: "Invalid email address",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
  },
};

export const Clearable: Story = {
  args: {
    label: "Search",
    placeholder: "Type something...",
    clearable: true,
  },
};
