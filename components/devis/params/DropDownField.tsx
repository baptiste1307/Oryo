"use client";

import { useQuote } from "@/context/QuoteContext";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { canAddLibraryItem, saveClientToLibrary } from "@/lib/library";
import FieldList from "../../global/pages/FieldList";
import LogoPart from "./LogoPart";
import {
  DropDownType,
  dropdownTitles,
  getQuoteInputConfigs,
} from "./dropdown/quoteDropdownConfig";
import QuoteProductsSection from "./dropdown/QuoteProductsSection";
import QuoteTermsSection from "./dropdown/QuoteTermsSection";
import {
  ClientLibraryPickerButton,
  SaveClientToLibraryAction,
} from "./dropdown/ClientLibraryActions";

type Props = {
  type: DropDownType;
};

export default function DropDownField({ type }: Props) {
  const [open, setOpen] = useState(false);
  const [showClientPicker, setShowClientPicker] = useState(false);
  const [libraryMessage, setLibraryMessage] = useState("");
  const { quote, setQuote, updateField, addProduct, updateConditions } = useQuote();
  const { user } = useAuth();
  const inputConfigs = getQuoteInputConfigs(
    quote,
    updateField,
    updateQuoteSetting,
  );
  const hasFields =
    type === "seller_infos" || type === "client_infos" || type === "quote_infos";

  function updateQuoteSetting(
    key: "currency" | "decimalPlaces",
    value: string,
  ) {
    setQuote((prev) => ({
      ...prev,
      [key]:
        key === "decimalPlaces"
          ? Math.min(8, Math.max(0, Number(value) || 0))
          : value,
    }));
  }

  async function saveCurrentClientToLibrary() {
    if (!user || !quote.client.name.trim()) return;

    const libraryAccess = await canAddLibraryItem(user.id);
    if (!libraryAccess.allowed) {
      setLibraryMessage("Bibliothèque pleine pour le plan gratuit.");
      return;
    }

    await saveClientToLibrary(user.id, {
      name: quote.client.name,
      email: quote.client.email,
      phone: quote.client.phone,
      address: quote.client.address,
      city: quote.client.city,
    });
    setLibraryMessage("Client ajouté à la bibliothèque.");
  }

  return (
    <div className="quote-param-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong style={{ color: open ? "var(--primary)" : "var(--text)" }}>
          {dropdownTitles[type]}
        </strong>

        <button
          type="button"
          className="nav-link"
          onClick={() => setOpen(!open)}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          {open ? "Réduire" : "Voir le détail"}
        </button>
      </div>

      {open && hasFields && (
        <div
          style={{
            display: "grid",
            gap: "8px",
            paddingTop: "12px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {type === "seller_infos" && <LogoPart />}
          {type === "client_infos" && (
            <ClientLibraryPickerButton
              showClientPicker={showClientPicker}
              onTogglePicker={() => setShowClientPicker((prev) => !prev)}
              onSelectClient={(client) => {
                updateField("client", "name", client.name ?? "");
                updateField("client", "phone", client.phone ?? "");
                updateField("client", "email", client.email ?? "");
                updateField("client", "address", client.address ?? "");
                updateField("client", "city", client.city ?? "");
              }}
            />
          )}
          <FieldList fields={inputConfigs[type]} />
          {type === "client_infos" && quote.client.name.trim() && (
            <SaveClientToLibraryAction
              libraryMessage={libraryMessage}
              onSaveClient={saveCurrentClientToLibrary}
            />
          )}
        </div>
      )}

      {open && type === "products_infos" && (
        <QuoteProductsSection addProduct={addProduct} />
      )}

      {open && type === "terms_and_conditions" && (
        <QuoteTermsSection
          conditions={quote.conditions}
          updateConditions={updateConditions}
        />
      )}
    </div>
  );
}
