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
      
      // Clear last tag or partial tag
      const trimmedValue = value.trim();
      if (!trimmedValue) {
        // No content, call original escape behavior
        onEscape();
        return;
      }
      
      const lastSpaceIndex = value.lastIndexOf(' ');
      if (lastSpaceIndex >= 0) {
        // Remove everything after the last space (partial or complete tag)
        onChange(value.substring(0, lastSpaceIndex + 1));
      } else {
        // No spaces, clear entire input
        onChange('');
      }
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