function HelpTip({ text }: { text: string }) {
  return (
    <span className="help-tip" title={text} aria-label={text}>
      ?
    </span>
  );
}

export default function FieldLabel({
  children,
  help,
}: {
  children: string;
  help: string;
}) {
  return (
    <label className="label label-with-help">
      {children}
      <HelpTip text={help} />
    </label>
  );
}
