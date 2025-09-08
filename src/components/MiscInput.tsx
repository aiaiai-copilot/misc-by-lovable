import { useRef, KeyboardEvent, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface MiscInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (tags: string[]) => void;
  onEscape: () => void;
  onNavigateDown?: () => void;
  placeholder?: string;
  allTags: string[];
  className?: string;
}

export const MiscInput = forwardRef<HTMLInputElement, MiscInputProps>(({
  value,
  onChange,
  onSubmit,
  onEscape,
  onNavigateDown,
  placeholder = "Enter tags separated by spaces...",
  allTags,
  className
}, ref) => {

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tags = value.trim().split(/\s+/).filter(Boolean);
      if (tags.length > 0) {
        onSubmit(tags);
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (onNavigateDown) {
        onNavigateDown();
      }
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      
      // Serial deletion of last tags
      const trimmedValue = value.trim();
      if (!trimmedValue) {
        // No content, call original escape behavior
        onEscape();
        return;
      }
      
      // Find the last complete tag by splitting and removing the last one
      const tags = trimmedValue.split(/\s+/).filter(Boolean);
      if (tags.length > 1) {
        // Remove last complete tag, keep space after remaining tags
        const remainingTags = tags.slice(0, -1);
        onChange(remainingTags.join(' ') + ' ');
      } else {
        // Only one tag left, clear it completely
        onChange('');
      }
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="calculator-input w-full text-center pr-10"
        autoFocus
      />
      {value.trim() && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          type="button"
        >
          <X size={16} className="text-muted-foreground hover:text-foreground" />
        </button>
      )}
    </div>
  );
});