import { TagFrequency } from '@/types/Record';
import { cn } from '@/lib/utils';

interface TagCloudProps {
  tagFrequencies: TagFrequency[];
  onTagClick: (tag: string) => void;
}

export const TagCloud = ({ tagFrequencies, onTagClick }: TagCloudProps) => {
  const maxCount = Math.max(...tagFrequencies.map(t => t.count));
  
  const getTagSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio >= 0.8) return 'text-lg font-bold';
    if (ratio >= 0.6) return 'text-base font-semibold';
    if (ratio >= 0.4) return 'text-sm font-medium';
    if (ratio >= 0.2) return 'text-sm';
    return 'text-xs';
  };

  if (tagFrequencies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-muted-foreground text-lg">No records found</div>
        <div className="text-muted-foreground text-sm mt-2">Press Enter to create</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {tagFrequencies.slice(0, 50).map((item) => (
          <button
            key={item.tag}
            className={cn(
              "tag-cloud-item text-center",
              getTagSize(item.count)
            )}
            onClick={() => onTagClick(item.tag)}
          >
            {item.tag}
          </button>
        ))}
      </div>
    </div>
  );
};