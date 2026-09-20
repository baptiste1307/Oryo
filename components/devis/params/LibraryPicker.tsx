"use client";

import { useAuth } from "@/context/AuthContext";
import {
  getLibraryClients,
  getLibraryProducts,
  type LibraryClient,
  type LibraryProduct,
} from "@/lib/library";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type LibraryPickerProps =
  | {
      type: "clients";
      onSelect: (item: LibraryClient) => void;
      onClose: () => void;
    }
  | {
      type: "products";
      onSelect: (item: LibraryProduct) => void;
      onClose: () => void;
    };

export default function LibraryPicker(props: LibraryPickerProps) {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<(LibraryClient | LibraryProduct)[]>([]);

  useEffect(() => {
    if (!user) return;

    async function loadItems() {
      if (!user) return;
      const nextItems =
        props.type === "clients"
          ? await getLibraryClients(user.id, search)
          : await getLibraryProducts(user.id, search);
      setItems(nextItems);
    }

    loadItems();
  }, [user, search, props.type]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2200,
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "rgba(248, 246, 241, 0.62)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="card" style={{ width: "min(100%, 520px)", display: "grid", gap: "12px" }}>
        <div className="title_and_trash_header_line">
          <strong>Choisir depuis la bibliothèque</strong>
          <button type="button" className="edit-link" onClick={props.onClose}>
            <X size={16} />
          </button>
        </div>
        <input
          className="input"
          value={search}
          placeholder="Rechercher par nom"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ display: "grid", gap: "8px", maxHeight: "320px", overflowY: "auto" }}>
          {items.map((item) => (
            <button
              type="button"
              className="clickable-frame"
              key={item.id}
              onClick={() => {
                if (props.type === "clients") props.onSelect(item as LibraryClient);
                else props.onSelect(item as LibraryProduct);
                props.onClose();
              }}
              style={{ textAlign: "left" }}
            >
              <strong>{item.name || "Sans nom"}</strong>
              <p>{getItemSubtitle(item)}</p>
            </button>
          ))}
          {items.length === 0 && <p>Aucun résultat.</p>}
        </div>
      </div>
    </div>
  );
}

function getItemSubtitle(item: LibraryClient | LibraryProduct) {
  if ("price_ht" in item) {
    return `${Number(item.price_ht ?? 0).toFixed(2)} € HT · ${item.unit || "unité"}`;
  }
  return item.email || item.phone || item.city || "Informations à compléter";
}
