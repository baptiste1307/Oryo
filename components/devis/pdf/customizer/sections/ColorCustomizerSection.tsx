import { colorSwatches } from "../customizerConfig";

type Props = {
  color: string;
  colorInputRef: React.RefObject<HTMLInputElement | null>;
  recentColors: string[];
  onColorChange: (color: string) => void;
};

export default function ColorCustomizerSection({
  color,
  colorInputRef,
  recentColors,
  onColorChange,
}: Props) {
  return (
    <section className="quote-customizer-section">
      <strong>Couleur principale</strong>
      <div className="quote-color-picker-row">
        <label
          className="quote-color-wheel"
          aria-label="Ouvrir le sélecteur de couleur"
        >
          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={(event) => onColorChange(event.target.value)}
            aria-label="Choisir une couleur"
          />
        </label>
        <input
          className="input"
          value={color}
          onChange={(event) => onColorChange(event.target.value)}
          placeholder="#0f766e"
        />
      </div>

      {recentColors.length > 0 && (
        <>
          <small>Récents</small>
          <ColorPalette colors={recentColors} selectedColor={color} onColorChange={onColorChange} />
        </>
      )}

      <small>Couleurs par défaut</small>
      <ColorPalette colors={colorSwatches} selectedColor={color} onColorChange={onColorChange} />
    </section>
  );
}

function ColorPalette({
  colors,
  selectedColor,
  onColorChange,
}: {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}) {
  return (
    <div className="quote-color-palette">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          aria-label={`Couleur ${color}`}
          className="quote-color-swatch"
          style={{
            background: color,
            outline: selectedColor === color ? "3px solid var(--text)" : "none",
          }}
          onClick={() => onColorChange(color)}
        />
      ))}
    </div>
  );
}
