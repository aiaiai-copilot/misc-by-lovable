import { useState, useRef, useEffect, KeyboardEvent } from 'react';
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
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tags for autocomplete
  const autocompleteOptions = value.trim() 
    ? allTags
        .filter(tag => tag.toLowerCase().includes(value.toLowerCase().split(' ').pop()?.toLowerCase() || ''))
        .slice(0, 8)
    : [];

  const showDropdown = showAutocomplete && autocompleteOptions.length > 0;

  useEffect(() => {
    setSelectedIndex(0);
  }, [autocompleteOptions.length]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (showDropdown) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, autocompleteOptions.length - 1));
        return;
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        return;
      }
      
      if (e.key === 'Tab') {
        e.preventDefault();
        completeTag(autocompleteOptions[selectedIndex]);
        return;
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const tags = value.trim().split(/\s+/).filter(Boolean);
      if (tags.length > 0) {
        onSubmit(tags);
      }
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setShowAutocomplete(false);
      onEscape();
    }
  };

  const completeTag = (tag: string) => {
    const words = value.split(' ');
    words[words.length - 1] = tag;
    onChange(words.join(' ') + ' ');
    setShowAutocomplete(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setShowAutocomplete(true);
  };

  const handleBlur = () => {
    // Delay hiding to allow clicking on autocomplete options
    setTimeout(() => setShowAutocomplete(false), 150);
  };

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="underline-input w-full text-center"
        autoFocus
      />
      
      {showDropdown && (
        <div className="autocomplete-dropdown absolute top-full left-0 right-0 mt-2 py-2 rounded-md z-50">
          {autocompleteOptions.map((tag, index) => (
            <button
              key={tag}
              className={cn(
                "w-full px-4 py-2 text-left hover:bg-muted transition-colors",
                index === selectedIndex && "bg-muted"
              )}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => completeTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};