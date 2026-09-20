"use client";

import HeroSection from "@/components/global/pages/HeroSection";
import BasicCard from "@/components/global/pages/BasicCard";
import LibraryCards from "@/components/dashboard/library/LibraryCards";
import LibraryFilters from "@/components/dashboard/library/LibraryFilters";
import { useAuth } from "@/context/AuthContext";
import { getLibraryItems, type LibraryItem, type LibraryType } from "@/lib/library";
import { useEffect, useMemo, useState } from "react";

export default function AllLibraryPage() {
  const { user, loading } = useAuth();
  const [selectedType, setSelectedType] = useState<LibraryType>("all");
  const [search, setSearch] = useState("");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [items, setItems] = useState<LibraryItem[]>([]);

  useEffect(() => {
    if (loading) return;
    refreshLibrary();
  }, [loading, user, selectedType]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesFavorite = !favoriteOnly || item.favorite;
      return matchesSearch && matchesFavorite;
    });
  }, [items, search, favoriteOnly]);

  async function refreshLibrary() {
    if (!user) {
      setItems([]);
      return;
    }
    setItems(await getLibraryItems(user.id, selectedType));
  }

  return (
    <div className="parent_div">
      <HeroSection
        indicator="Bibliothèque"
        title="Votre bibliothèque"
        subtitle="Filtrez, retrouvez et nettoyez les éléments utilisés dans vos devis."
      />

      <BasicCard title="Filtres avancés">
        <div className="quote-filters-style">
          <div className="stack">
            <label className="label">Recherche</label>
            <input
              className="input"
              value={search}
              placeholder="Nom du client ou du produit"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="stack">
            <label className="label">Type</label>
            <LibraryFilters selected={selectedType} onSelect={setSelectedType} />
          </div>
          <label className="label-with-help" style={{ alignSelf: "end" }}>
            <input
              type="checkbox"
              checked={favoriteOnly}
              onChange={(e) => setFavoriteOnly(e.target.checked)}
            />
            Favoris uniquement
          </label>
        </div>
      </BasicCard>

      <BasicCard title="Résultats">
        {filteredItems.length > 0 ? (
          <LibraryCards items={filteredItems} onRefresh={refreshLibrary} />
        ) : (
          <div className="frame_div">
            <strong>Aucun résultat</strong>
            <p>Essayez un autre filtre ou ajoutez des éléments via vos devis.</p>
          </div>
        )}
      </BasicCard>
    </div>
  );
}
