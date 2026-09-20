type SavedCalculationCardProps = {
  label: string;
  value: string | number;
  color?: string;
};

export default function SavedCalculationCard({
  label,
  value,
  color,
}: SavedCalculationCardProps) {
  return (
    <div className="card" style={{ padding: "20px", background: "#fcfcfb" }}>
      <p style={{ marginBottom: "8px" }}>{label}</p>
      <h3 style={{ color }}>{value}</h3>
    </div>
  );
}
