"use client";

import DeletionPopUp from "@/components/global/pages/DeletionPopUp";
import { deleteLibraryItem, toggleLibraryFavorite, type LibraryItem } from "@/lib/library";
import { formatFrameDate } from "@/components/global/pages/frame-list/frameTypes";
import { Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type LibraryCardsProps = {
  items: LibraryItem[];
  onRefresh: () => void;
};

export default function LibraryCards({ items, onRefresh }: LibraryCardsProps) {
  const [itemToDelete, setItemToDelete] = useState<LibraryItem | null>(null);
  const router = useRouter();

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {items.map((item) => (
          <div
            className="clickable-frame"
            key={`${item.kind}-${item.id}`}
            onClick={() => {
              if (item.kind === "product") {
                router.push(`/dashboard/build_calculation?productId=${item.id}`);
              } else {
                router.push(`/dashboard/client/${item.id}`);
              }
            }}
          >
            <div className="title_and_trash_header_line">
              <strong>{item.title}</strong>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  className="favorite-link"
                  onClick={async (event) => {
                    event.stopPropagation();
                    await toggleLibraryFavorite(item);
                    onRefresh();
                  }}
                  style={{ color: item.favorite ? "var(--primary)" : undefined }}
                >
                  <Star size={16} fill={item.favorite ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  className="trash-link"
                  onClick={(event) => {
                    event.stopPropagation();
                    setItemToDelete(item);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <span style={{ color: "var(--primary)", fontWeight: 700 }}>
              {item.kind === "client" ? "Client" : "Produit"}
            </span>
            <p style={{ color: "var(--text)" }}>{item.subtitle}</p>
            <p>Créé le {formatFrameDate(item.createdAt)}</p>
          </div>
        ))}
      </div>

      <DeletionPopUp
        title="Voulez-vous vraiment supprimer cet élément ?"
        isOpen={itemToDelete !== null}
        onCancel={() => setItemToDelete(null)}
        onConfirm={async () => {
          if (!itemToDelete) return;
          await deleteLibraryItem(itemToDelete);
          setItemToDelete(null);
          onRefresh();
        }}
      />
    </>
  );
}
