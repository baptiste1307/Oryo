import { PlusCircle } from "lucide-react";
import LibraryPicker from "../LibraryPicker";

type Props = {
  libraryMessage: string;
  showClientPicker: boolean;
  onSaveClient: () => void;
  onSelectClient: (client: {
    name: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    city: string | null;
  }) => void;
  onTogglePicker: () => void;
};

export function ClientLibraryPickerButton({
  showClientPicker,
  onSelectClient,
  onTogglePicker,
}: Pick<Props, "showClientPicker" | "onSelectClient" | "onTogglePicker">) {
  return (
    <>
      <button
        type="button"
        className="nav-link"
        onClick={onTogglePicker}
        style={pickerButtonStyle}
      >
        <PlusCircle size={16} />
        Choisir depuis la bibliothèque
      </button>
      {showClientPicker && (
        <LibraryPicker
          type="clients"
          onClose={onTogglePicker}
          onSelect={onSelectClient}
        />
      )}
    </>
  );
}

export function SaveClientToLibraryAction({
  libraryMessage,
  onSaveClient,
}: Pick<Props, "libraryMessage" | "onSaveClient">) {
  return (
    <div style={{ display: "grid", gap: "6px" }}>
      <button
        type="button"
        className="nav-link"
        onClick={onSaveClient}
        style={saveButtonStyle}
      >
        Ajouter à la bibliothèque ?
      </button>
      {libraryMessage && <p>{libraryMessage}</p>}
    </div>
  );
}

const pickerButtonStyle = {
  width: "fit-content",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: "var(--primary)",
  background: "transparent",
  padding: 0,
};

const saveButtonStyle = {
  width: "fit-content",
  color: "var(--primary)",
  background: "transparent",
  padding: 0,
};
