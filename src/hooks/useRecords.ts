import { useState, useEffect, useMemo } from 'react';
import { Record, TagFrequency } from '@/types/Record';

const STORAGE_KEY = 'misc-records';

export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load records from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const recordsWithDates = parsed.map((record: any) => ({
          ...record,
          createdAt: new Date(record.createdAt),
          updatedAt: new Date(record.updatedAt),
        }));
        setRecords(recordsWithDates);
      } catch (error) {
        console.error('Failed to parse stored records:', error);
      }
    }
  }, []);

  // Save records to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  // Filter records based on search query, sorted by most recent first
  const filteredRecords = useMemo(() => {
    const sorted = [...records].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    
    if (!searchQuery.trim()) return sorted;
    
    const searchTags = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return sorted.filter(record => {
      const recordTags = record.tags.map(tag => tag.toLowerCase());
      
      // All complete tags (all but the last) must be exact matches
      const completeTags = searchTags.slice(0, -1);
      const incompleteTag = searchTags[searchTags.length - 1];
      
      // Check complete tags first
      const completeTagsMatch = completeTags.every(searchTag =>
        recordTags.includes(searchTag)
      );
      
      if (!completeTagsMatch) return false;
      
      // Check incomplete tag with prefix matching
      const incompleteTagMatch = recordTags.some(recordTag =>
        recordTag.startsWith(incompleteTag)
      );
      
      return incompleteTagMatch;
    });
  }, [records, searchQuery]);

  // Get tag frequencies for tag cloud (based on all records, not filtered)
  const tagFrequencies = useMemo(() => {
    const frequencies = new Map<string, number>();
    
    records.forEach(record => {
      record.tags.forEach(tag => {
        frequencies.set(tag, (frequencies.get(tag) || 0) + 1);
      });
    });

    return Array.from(frequencies.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [records]);

  // Get all unique tags for autocomplete
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    records.forEach(record => {
      record.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [records]);

  const createRecord = (tags: string[]) => {
    if (tags.length === 0) return;
    
    // Check for duplicate
    const tagsString = tags.join(' ').toLowerCase();
    const exists = records.some(record =>
      record.tags.join(' ').toLowerCase() === tagsString
    );
    
    if (exists) return false;

    const newRecord: Record = {
      id: crypto.randomUUID(),
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setRecords(prev => [newRecord, ...prev]);
    return true;
  };

  const updateRecord = (id: string, tags: string[]) => {
    setRecords(prev =>
      prev.map(record =>
        record.id === id
          ? { ...record, tags, updatedAt: new Date() }
          : record
      )
    );
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const exportData = () => {
    return records;
  };

  const importData = (data: any[]): boolean => {
    try {
      const importedRecords = data.map((record: any) => ({
        ...record,
        id: record.id || crypto.randomUUID(),
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
      }));
      
      setRecords(importedRecords);
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  };

  return {
    records,
    filteredRecords,
    tagFrequencies,
    allTags,
    searchQuery,
    setSearchQuery,
    createRecord,
    updateRecord,
    deleteRecord,
    exportData,
    importData,
  };
};