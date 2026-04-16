import type { Tag } from "@/lib/tasks";

type Props = {
  tag: Tag;
  onRemove?: () => void;
};

export default function TagBadge({ tag, onRemove }: Props) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: `${tag.color}15`,
        color: tag.color,
        border: `1px solid ${tag.color}25`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: tag.color }}
      />
      {tag.name}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 hover:opacity-60 transition-opacity leading-none"
          aria-label={`Remove ${tag.name} tag`}
        >
          ×
        </button>
      )}
    </span>
  );
}
