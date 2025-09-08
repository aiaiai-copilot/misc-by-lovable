import { useRef, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface MiscInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (tags: string[]) => void;
  onEscape: () => void;
  placeholder?: string;
  allTags: string[];
  className?: string;
}

export const MiscInput = ({
  value,
  onChange,
  onSubmit,
  onEscape,
  placeholder = "Enter tags separated by spaces...",
  allTags,
  className
}: MiscInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tags = value.trim().split(/\s+/).filter(Boolean);
      if (tags.length > 0) {
        onSubmit(tags);
      }
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      onEscape();
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="calculator-input w-full text-center"
        autoFocus
      />
    </div>
  );
};