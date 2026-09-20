export default function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="calculation-section">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
