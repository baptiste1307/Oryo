import type { Quote } from "@/context/quote/quoteTypes";
import type { LayoutSection } from "../../pdfPreviewUtils";
import { alignmentBlocks } from "../customizerConfig";

type Props = {
  quote: Quote;
  isPremium: boolean;
  onAlignmentChange: (
    block: LayoutSection,
    alignment: "left" | "right",
  ) => void;
  onGridVisibilityChange: (hidden: boolean) => void;
};

export default function PositionCustomizerSection({
  quote,
  isPremium,
  onAlignmentChange,
  onGridVisibilityChange,
}: Props) {
  return (
    <section className="quote-customizer-section">
      <div className="locked-section-header">
        <strong>Position des blocs</strong>
      </div>
      <p>
        Déplacez directement les blocs sur le devis. Une grille d’alignement vous
        aide à positionner les éléments proprement.
      </p>
      <div className="quote-alignment-controls">
        {alignmentBlocks.map((block) => (
          <div className="quote-alignment-row" key={block.key}>
            <span>{block.label}</span>
            <div className="quote-alignment-buttons">
              {(["left", "right"] as const).map((alignment) => (
                <button
                  key={alignment}
                  type="button"
                  disabled={!isPremium}
                  className={
                    isTextAlignmentBlock(block.key) &&
                    quote.blockAlignments[block.key] === alignment
                      ? "quote-alignment-button active"
                      : "quote-alignment-button"
                  }
                  onClick={() => onAlignmentChange(block.key, alignment)}
                >
                  {alignment === "left" ? "Gauche" : "Droite"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={quote.hideCustomizerGrid}
          disabled={!isPremium}
          onChange={(event) => onGridVisibilityChange(event.target.checked)}
        />
        Masquer la grille
      </label>
    </section>
  );
}

function isTextAlignmentBlock(
  block: LayoutSection,
): block is keyof Quote["blockAlignments"] {
  return block === "seller" || block === "client" || block === "meta" || block === "totals";
}
