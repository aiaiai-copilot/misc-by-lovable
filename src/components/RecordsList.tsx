import { useState } from 'react';
import { Record } from '@/types/Record';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordsListProps {
  records: Record[];
  onEdit: (record: Record) => void;
  onDelete: (id: string) => void;
}

export const RecordsList = ({ records, onEdit, onDelete }: RecordsListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

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
    <div className="w-full max-w-2xl mx-auto space-y-0">
      {records.slice(0, 12).map((record) => (
        <div
          key={record.id}
          className={cn(
            "record-item px-6 py-4 cursor-pointer group relative",
            editingId === record.id && "bg-muted"
          )}
          onClick={() => handleRecordClick(record)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-foreground font-medium">
                {record.tags.join(' ')}
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