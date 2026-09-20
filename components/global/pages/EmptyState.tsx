import Link from "next/link";

type EmptyStateProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      {actionLabel && actionHref && (
        <Link className="button-secondary" href={actionHref}>
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button className="button-secondary" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
