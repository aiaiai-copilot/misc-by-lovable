import { useState } from 'react';
import { Record } from '@/types/Record';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordsListProps {
  records: Record[];
  onEdit: (record: Record) => void;
  onDelete: (id: string) => void;
  searchQuery?: string;
}

export const RecordsList = ({ records, onEdit, onDelete, searchQuery = '' }: RecordsListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const highlightTags = (tags: string[], searchTerms: string[]) => {
    if (!searchQuery.trim()) return tags.join(' ');
    
    const searchLower = searchTerms.map(term => term.toLowerCase());
    return tags.map((tag, index) => {
      const isHighlighted = searchLower.some(searchTerm => tag.toLowerCase().includes(searchTerm));
      return (
        <span
          key={index}
          className={cn(
            isHighlighted && "bg-background/20 px-1 rounded"
          )}
        >
          {tag}{index < tags.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  const searchTerms = searchQuery.trim().split(/\s+/).filter(Boolean);

  const handleRecordClick = (record: Record) => {
    if (editingId !== record.id) {
      setEditingId(record.id);
      onEdit(record);
    }
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-muted-foreground text-lg">No records found</div>
        <div className="text-muted-foreground text-sm mt-2">Press Enter to create</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-2">
      {records.slice(0, 12).map((record) => (
        <div
          key={record.id}
          className={cn(
            "record-item px-4 py-3 cursor-pointer group relative border rounded",
            editingId === record.id && "bg-muted"
          )}
          onClick={() => handleRecordClick(record)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-foreground text-sm">
                {highlightTags(record.tags, searchTerms)}
              </div>
            </div>
            
            <button
              className="delete-button text-destructive hover:text-destructive/80 p-1 ml-4"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(record.id);
              }}
              aria-label="Delete record"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};