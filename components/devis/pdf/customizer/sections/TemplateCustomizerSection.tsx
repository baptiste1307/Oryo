import { QUOTE_TEMPLATES } from "@/lib/quoteTemplates";

type Props = {
  currentTemplate: string;
  isPremium: boolean;
  onTemplateChange: (template: string) => void;
};

export default function TemplateCustomizerSection({
  currentTemplate,
  isPremium,
  onTemplateChange,
}: Props) {
  return (
    <section className="quote-customizer-section">
      <div className="locked-section-header">
        <strong>Template du devis</strong>
      </div>
      <div className="quote-template-options">
        {QUOTE_TEMPLATES.map((template) => (
          <button
            type="button"
            key={template.value}
            disabled={!isPremium}
            className={
              currentTemplate === template.value
                ? "quote-template-option active"
                : "quote-template-option"
            }
            onClick={() => onTemplateChange(template.value)}
          >
            {template.label}
          </button>
        ))}
      </div>
    </section>
  );
}
