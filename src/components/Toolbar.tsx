import { ReactNode } from 'react';

interface ToolbarProps {
  children: ReactNode;
}

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <div className="flex justify-end items-center h-10 mb-2 px-1">
      <div className="flex gap-1">
        {children}
      </div>
    </div>
  );
};