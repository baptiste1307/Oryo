"use client";

import { Star, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeletionPopUp from "../DeletionPopUp";
import { deleteQuoteDraft, toggleQuoteFavorite } from "@/lib/quoteDrafts";
import { formatFrameDate, Frame } from "./frameTypes";

export default function QuoteFrames({ frames }: { frames: Frame[] }) {
  const router = useRouter();
  const [frameToDelete, setFrameToDelete] = useState<Frame | null>(null);

  return (
    <>
      {frames.map((frame, index) => (
        <div
          className="clickable-frame"
          onClick={() => frame.id && router.push(`/dashboard/build_quote?draftId=${frame.id}`)}
          key={frame.id ?? index}
        >
          <div className="title_and_trash_header_line">
            <strong>{frame.title}</strong>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                type="button"
                className="favorite-link"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!frame.id) return;
                  await toggleQuoteFavorite(frame.id, !frame.favorite);
                  frame.onToggleFavorite?.();
                }}
                style={{ color: frame.favorite ? "var(--primary)" : undefined }}
              >
                <Star size={16} fill={frame.favorite ? "currentColor" : "none"} />
              </button>
              <button
                type="button"
                className="trash-link"
                onClick={(e) => {
                  e.stopPropagation();
                  setFrameToDelete(frame);
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <span style={{ color: "var(--text)" }}>{frame.subtitle}</span>
          <span style={{ color: "var(--primary)", fontWeight: 700 }}>
            {frame.totalPrice} € HT · {frame.status == "draft" ? "Brouillon" : "Terminé"}
          </span>
          <p>Modifié le {formatFrameDate(frame.lastUpdated)}</p>
        </div>
      ))}

      <DeletionPopUp
        title="Voulez-vous vraiment supprimer ce devis ?"
        isOpen={frameToDelete !== null}
        onCancel={() => setFrameToDelete(null)}
        onConfirm={async () => {
          if (!frameToDelete?.id) return;
          await deleteQuoteDraft(frameToDelete.id);
          frameToDelete.onDelete?.();
          setFrameToDelete(null);
        }}
      />
    </>
  );
}
