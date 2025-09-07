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

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

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
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-foreground font-medium mb-1">
                {record.tags.join(' ')}
              </div>
              <div className="text-secondary text-sm">
                {formatTimeAgo(record.updatedAt)}
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