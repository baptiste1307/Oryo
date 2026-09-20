type Props = {
  item: {
    label: string;
    value: string;
    bg_color: string;
    text_color?: string;
  };
  padding: string;
};

export default function ResultRow({ item, padding }: Props) {
  return (
    <tr
      style={{
        padding: padding,
        background: item.bg_color,
      }}
    >
      <th
        style={{
          padding: padding,
          textAlign: "start",
        }}
      >
        {item.label}
      </th>

      <th
        className="table_numeric_value"
        style={{
          padding: padding,
          textAlign: "end",
          color: item.text_color ? item.text_color : "black",
        }}
      >
        {item.value}
      </th>
    </tr>
  );
}
