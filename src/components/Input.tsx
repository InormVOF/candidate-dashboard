import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border-gray-500 border rounded-md"
      {...props}
    />
  );
};
