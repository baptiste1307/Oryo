import ResultRow from "@/components/devis/pdf/table/ResultRow";

type ResultItem = {
  label: string;
  value: string;
  bg_color: string;
  text_color?: string;
};

type Props = {
  alignment: "left" | "right";
  borderRadius: string;
  dragProps: {
    className?: string;
    onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
    style?: React.CSSProperties;
  };
  fontSize: string;
  padding: string;
  results: ResultItem[];
};

export default function QuoteTotalsTable({
  alignment,
  borderRadius,
  dragProps,
  fontSize,
  padding,
  results,
}: Props) {
  return (
    <div
      {...dragProps}
      style={{
        width: "fit-content",
        marginLeft: alignment === "right" ? "auto" : 0,
        marginRight: alignment === "left" ? "auto" : 0,
        ...dragProps.style,
      }}
    >
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: 0,
          border: "0.2cqw solid var(--border)",
          borderRadius,
          minWidth: "31cqw",
          width: "fit-content",
          fontSize,
          marginTop: "2cqw",
        }}
      >
        <tbody>
          {results.map((item, index) => (
            <ResultRow key={index} item={item} padding={padding} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
