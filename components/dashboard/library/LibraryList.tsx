"use client";

import { useAuth } from "@/context/AuthContext";
import { getLibraryItems, type LibraryItem, type LibraryType } from "@/lib/library";
import { useEffect, useState } from "react";
import LibraryCards from "./LibraryCards";
import LibraryFilters from "./LibraryFilters";

type LibraryListProps = {
  maxItems?: number;
  compact?: boolean;
};

export default function LibraryList({ maxItems, compact }: LibraryListProps) {
  const { user, loading } = useAuth();
  const [selectedType, setSelectedType] = useState<LibraryType>("clients");
  const [items, setItems] = useState<LibraryItem[]>([]);

  useEffect(() => {
    if (loading) return;
    refreshLibrary();
  }, [loading, user, selectedType]);

  async function refreshLibrary() {
    if (!user) {
      setItems([]);
      return;
    }

    const nextItems = await getLibraryItems(user.id, selectedType);
    setItems(maxItems ? nextItems.slice(0, maxItems) : nextItems);
  }

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <LibraryFilters
        selected={selectedType}
        onSelect={setSelectedType}
        compact={compact}
      />
      {items.length > 0 ? (
        <LibraryCards items={items} onRefresh={refreshLibrary} />
      ) : (
        <div className="frame_div">
          <strong>Aucun élément pour le moment</strong>
          <p>Votre bibliothèque se remplira avec vos clients et produits.</p>
        </div>
      )}
    </div>
  );
}
