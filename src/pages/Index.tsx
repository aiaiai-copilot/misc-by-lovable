import { useState, useEffect, useRef } from 'react';
import { useRecords } from '@/hooks/useRecords';
import { MiscInput } from '@/components/MiscInput';
import { RecordsList, type RecordsListRef } from '@/components/RecordsList';
import { TagCloud, type TagCloudRef } from '@/components/TagCloud';
import { Record } from '@/types/Record';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const {
    filteredRecords,
    tagFrequencies,
    allTags,
    searchQuery,
    setSearchQuery,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useRecords();

  const [inputValue, setInputValue] = useState('');
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const { toast } = useToast();
  
  // Refs for navigation
  const inputRef = useRef<HTMLInputElement>(null);
  const tagCloudRef = useRef<TagCloudRef>(null);
  const recordsListRef = useRef<RecordsListRef>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  // Determine display mode based on search state
  const showTagCloud = filteredRecords.length > 12;
  const showRecordsList = filteredRecords.length > 0 && filteredRecords.length <= 12;
  const showCreateState = inputValue.trim() && filteredRecords.length === 0;
  const showEmptyState = !inputValue.trim() && filteredRecords.length === 0;

  const handleSubmit = (tags: string[]) => {
    if (editingRecord) {
      // Update existing record
      updateRecord(editingRecord.id, tags);
      setEditingRecord(null);
      setInputValue('');
      toast({
        title: "Record updated",
        description: `Updated: ${tags.join(' ')}`,
      });
    } else {
      // Create new record
      const success = createRecord(tags);
      if (success) {
        setInputValue('');
        toast({
          title: "Record created",
          description: `Created: ${tags.join(' ')}`,
        });
      } else {
        toast({
          title: "Record already exists",
          description: "This combination of tags already exists.",
          variant: "destructive",
        });
      }
    }
    // Focus back to input after submit
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleEdit = (record: Record) => {
    setEditingRecord(record);
    setInputValue(record.tags.join(' '));
    // Focus input after setting edit mode
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleEscape = () => {
    setEditingRecord(null);
    setInputValue('');
    setSearchQuery('');
    // Focus input after escape/clear
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleTagClick = (tag: string) => {
    const newValue = inputValue.trim() ? `${inputValue} ${tag}` : tag;
    setInputValue(newValue);
    // Focus back to input after tag click
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleNavigateToResults = () => {
    if (showTagCloud) {
      tagCloudRef.current?.focusFirst();
    } else if (showRecordsList) {
      recordsListRef.current?.focusFirst();
    }
  };

  const handleNavigateToInput = () => {
    inputRef.current?.focus();
  };

  const handleDelete = (id: string) => {
    deleteRecord(id);
    toast({
      title: "Record deleted",
      description: "The record has been removed.",
    });
    // Focus input after delete
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Input Field */}
        <div className="mb-4 w-full max-w-6xl mx-auto">
          <MiscInput
            ref={inputRef}
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            onEscape={handleEscape}
            onNavigateDown={handleNavigateToResults}
            allTags={allTags}
            placeholder={editingRecord ? "Edit tags..." : "Enter tags separated by spaces..."}
            className="w-full"
          />
        </div>

        {/* Display based on state */}
        {showTagCloud && (
          <div className="results-area">
            <TagCloud
              ref={tagCloudRef}
              tagFrequencies={tagFrequencies}
              onTagClick={handleTagClick}
              onNavigateUp={handleNavigateToInput}
            />
          </div>
        )}

        {showRecordsList && (
          <div className="results-area">
            <RecordsList
              ref={recordsListRef}
              records={filteredRecords}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onNavigateUp={handleNavigateToInput}
              searchQuery={inputValue}
            />
          </div>
        )}

        {showCreateState && (
          <div className="results-area">
            <div className="text-center py-16">
              <div className="text-lg text-muted-foreground">No records found</div>
              <div className="text-sm mt-2 text-muted-foreground/70">Press Enter to create a new record</div>
            </div>
          </div>
        )}

        {showEmptyState && (
          <div className="text-center py-16">
            <div className="text-lg text-muted-foreground">No records yet</div>
            <div className="text-sm mt-2 text-muted-foreground/70">Start by typing some tags above</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
