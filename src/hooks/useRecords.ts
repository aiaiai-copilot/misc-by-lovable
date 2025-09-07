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

  // Filter records based on search query
  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return records;
    
    const searchTags = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return records.filter(record =>
      searchTags.every(searchTag =>
        record.tags.some(tag => tag.toLowerCase().includes(searchTag))
      )
    );
  }, [records, searchQuery]);

  // Get tag frequencies for tag cloud
  const tagFrequencies = useMemo(() => {
    const frequencies = new Map<string, number>();
    
    filteredRecords.forEach(record => {
      record.tags.forEach(tag => {
        frequencies.set(tag, (frequencies.get(tag) || 0) + 1);
      });
    });

    return Array.from(frequencies.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredRecords]);

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
  };
};