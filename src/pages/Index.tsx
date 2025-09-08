import { useState, useEffect } from 'react';
import { useRecords } from '@/hooks/useRecords';
import { MiscInput } from '@/components/MiscInput';
import { RecordsList } from '@/components/RecordsList';
import { TagCloud } from '@/components/TagCloud';
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

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  // Determine what to show
  const hasData = filteredRecords.length > 0 || Object.keys(tagFrequencies).length > 0;

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
  };

  const handleEdit = (record: Record) => {
    setEditingRecord(record);
    setInputValue(record.tags.join(' '));
  };

  const handleEscape = () => {
    setEditingRecord(null);
    setInputValue('');
    setSearchQuery('');
  };

  const handleTagClick = (tag: string) => {
    const newValue = inputValue.trim() ? `${inputValue} ${tag}` : tag;
    setInputValue(newValue);
  };

  const handleDelete = (id: string) => {
    deleteRecord(id);
    toast({
      title: "Record deleted",
      description: "The record has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-foreground mb-2">MISC</h1>
          <p className="text-muted-foreground text-sm">Everything is tags</p>
        </div>

        {/* Input Field */}
        <div className="mb-12">
          <MiscInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            onEscape={handleEscape}
            allTags={allTags}
            placeholder={editingRecord ? "Edit tags..." : "Enter tags separated by spaces..."}
          />
          
          {editingRecord && (
            <div className="text-center mt-2">
              <span className="text-xs text-muted-foreground">
                Editing record • Press Escape to cancel
              </span>
            </div>
          )}
        </div>

        {/* Search Results */}
        {hasData ? (
          <div className="space-y-12">
            {/* Tag Cloud Section */}
            {Object.keys(tagFrequencies).length > 0 && (
              <div>
                <h2 className="text-xl font-light text-center mb-6">Search - Tag Cloud</h2>
                <div className="results-area">
                  <TagCloud
                    tagFrequencies={tagFrequencies}
                    onTagClick={handleTagClick}
                  />
                </div>
              </div>
            )}

            {/* Records List Section */}
            {filteredRecords.length > 0 && (
              <div>
                <h2 className="text-xl font-light text-center mb-6">Search - Records List</h2>
                <div className="results-area">
                  <RecordsList
                    records={filteredRecords}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          !inputValue.trim() && (
            <div className="text-center py-16">
              <div className="text-lg text-muted-foreground">No records yet</div>
              <div className="text-sm mt-2 text-muted-foreground/70">Start by typing some tags above</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Index;
