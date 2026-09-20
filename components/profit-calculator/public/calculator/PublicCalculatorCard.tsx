type PublicCalculatorCardProps = {
  title: string;
  value: string | number;
  unit?: string;
  color?: string;
};

export default function PublicCalculatorCard({
  title,
  value,
  unit,
  color,
}: PublicCalculatorCardProps) {
  return (
    <div className="card">
      <p style={{ marginBottom: "8px" }}>{title}</p>
      <h3 style={{ color }}>{value} {unit}</h3>
    </div>
  );
}
